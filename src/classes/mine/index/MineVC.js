import React from 'react';
import {StatusBar, StyleSheet, Text, View,} from 'react-native';
import {Colors, Const} from "../../../common/storage/Const";
import {XImage, XView} from "react-native-easy-app";
import BaseVC from "../../index/zfb/Common/BaseVC";
import {showModalPrompt} from "../../../compoments/YHUtils";
import {isEmpty} from "../../../common/utils/Utils";
import {RNStorage} from "../../../common/storage/AppStorage";
import {writeToRealm, ZFBUserTableName} from "../../../common/utils/RealmUtil";
import {Notify} from "../../../common/events/Notify";

export default class MineVC extends BaseVC {
    constructor() {
        super();
        this.state = {
            isLogin: false,
            nickname: '',
            avatarUrl: '',
            openId: '',
        }
        this.arr = [
            {
                title: '邀请好友',
                img: require('../../resource/mine/index/me_btn1.png')
            },
            {
                title: '输入兑换码',
                img: require('../../resource/mine/index/me_btn2.png')
            },
            {
                title: '输入推广码',
                img: require('../../resource/mine/index/me_btn4.png')
            },
            {
                title: '设置',
                img: require('../../resource/mine/index/me_btn6.png')
            },
        ]
    }

    componentDidMount() {
        // super._setPlaceViewBackgroundColor('#00B1FF');
        this._setBarStyle(1);
        this._setTopSafeView(true);
    }

    _addSubView() {
        return (
            <View style={{backgroundColor:Colors.white,flex:1}}>
                <XImage resizeMode='stretch' style={{width: Const.screenWidth, height: 165, position: 'absolute'}}
                        icon={require('../../resource/mine/index/mei_bg.png')}/>

                <View
                    style={{
                        height: 44,
                        backgroundColor: '#00B1FF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: INSETS.top
                    }}>
                    <Text style={{fontSize: 17, color: Colors.white}}>我的</Text>
                </View>
                <View style={{width: Const.screenWidth - 22, height: 213, alignItems: 'center', marginLeft: 11}}>
                    <XImage resizeMode='stretch'
                            style={{width: Const.screenWidth - 22, height: 213, position: 'absolute'}}
                            icon={require('../../resource/mine/index/me_photo_bg.png')}/>
                    <XImage style={{marginTop: 28}} icon={require('../../resource/mine/index/default_photo.png')}
                            iconSize={64}/>

                    <Text style={{fontSize: 17, color: '#2B2B2B', marginTop: 15}}>马东</Text>
                    <Text style={{fontSize: 14, color: '#7E7E7E', marginTop: 3}}>1379296509</Text>
                    <Text style={{fontSize: 14, color: '#2B2B2B', marginTop: 20}}>累计邀请0人</Text>
                </View>
                <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    {this.arr.map(((value,index) => {
                        return (
                            <XView style={{alignItems:'center',justifyContent:'center',width:(Const.screenWidth / 3) - 1,height:(Const.screenWidth / 3) - 1}} onPress={()=>{
                                if (index == 1) {
                                    showModalPrompt('兑换码','',(text)=>{

                                    },'请输入兑换码')
                                }
                                if (index == 2) {
                                    showModalPrompt('推广码','',(text)=>{

                                    },'请输入推广码')
                                }
                            }}>
                                <XImage icon={value.img} iconSize={32}/>
                                <Text style={{color:'#7E7E7E',fontSize:14,marginTop:12}}>{value.title}</Text>
                            </XView>
                        )
                    }))}
                </View>
            </View>
        )
    }

    // _addSubView() {
    //     return (
    //         <>
    //             <View
    //                 style={{height: 44, backgroundColor: '#00B1FF', justifyContent: 'center', alignItems: 'center'}}>
    //                 <Text style={{fontSize: 17, color: Colors.white}}>我的</Text>
    //             </View>
    //         </>
    //     )
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
