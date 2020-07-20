/**
 *  常用工具类
 */
import React from 'react';
import {ActionPopover, ActionSheet, Button, Label, Overlay, Theme} from "teaset";
import {XHttp} from "react-native-easy-app";
import {Api} from "../common/http/Api";
import {
    Modal,
} from '@ant-design/react-native';
import {View} from "react-native";
import {clearRowFromRealm, PYQListTalkTableName} from "../common/utils/RealmUtil";
import {Const} from "../common/storage/Const";

export function getPeople(count,successBlock) {
    XHttp().url(Api.Usercenter_getUserlist)
        .param({token: '123456',nums:count || 20})
        .post((success, json) => {
            if (success) {
                successBlock(json.data || [])
            }
        })
}
export function showActionSheet(array) {
    // let items = [
    //     {title: 'Say hello', onPress: () => alert('Hello')},
    //     {title: 'Do nothing'},
    //     {title: 'Disabled', disabled: true},
    // ];
    let items = array;
    let cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem,);
}
export function showModalOperation(array) {
    // [
    //     { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
    //     { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
    // ]
    Modal.operation(array);
}

export function showModalPrompt(title,msg,callBlock,placeholder) {
    Modal.prompt(
        title,
        msg,
         callBlock,
        'default',
        null,
        [placeholder]
    );
}
export function showOverlayPull(side, modal,view) {
    let overlayView = (
        <Overlay.PullView side={side} modal={modal}>
            <View style={{backgroundColor: Theme.defaultColor, minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
                {view}
            </View>
        </Overlay.PullView>
    );
    return Overlay.show(overlayView);
}
export function showOverlayPull1(side, modal,view) {
    let overlayView = (
        <Overlay.PullView side={side} modal={modal} containerStyle={{height:Const.screenWidth,bottom:INSETS.bottom,left:0,position:'absolute'}}>
            {view}
        </Overlay.PullView>
    );
    return Overlay.show(overlayView);
}
export function showOverlayModal(type, modal,view) {
    let overlayView = (
        <Overlay.PopView
            style={{alignItems: 'center', justifyContent: 'center'}}
            type={type}
            modal={modal}
            ref={v => this.overlayPopView = v}
        >
            <View style={{backgroundColor: Theme.defaultColor, minWidth: 260, minHeight: 180, borderRadius: 15}}>
                {view}
            </View>
        </Overlay.PopView>
    );
    return Overlay.show(overlayView);
}

export function showOperationItems(view,items) {
    view.measure((x, y, width, height, pageX, pageY) => {
        // let items = [
        //     {title: '删除', onPress: () => {
        //             clearRowFromRealm(this.opreation_talk_id,PYQListTalkTableName).then((res)=>{
        //                 this._requestData();
        //             })
        //         }},
        // ];
        ActionPopover.show({x: pageX, y: pageY, width, height}, items);
    });
}
