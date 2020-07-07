import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar, ScrollView
} from 'react-native';
import {Colors, CommonStyles, Const, ImageRes} from "../../../../common/storage/Const";
import {XImage} from "react-native-easy-app";
import BaseVC from "../Common/BaseVC";
import TitleAndSubCell from "../../wx/me/pay/views/TitleAndSubCell";
import DiscoveryListCell from "../../wx/discovery/view/DiscoveryListCell";
import ImgTitleCell from "./view/ImgTitleCell";
import {showToast} from "../../../../common/widgets/Loading";

export default class Index extends BaseVC {
    constructor() {
        super();
    }

    _addSubView() {
        return (
            <>
                <View style={{
                    backgroundColor: Colors.zfb_theme_color,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                }}>
                    <Text style={{color: Colors.white, fontSize: 18.5}}>我的</Text>
                    <Text style={{color: Colors.white, fontSize: 18.5}}>设置</Text>
                </View>
                <ScrollView>
                    <View style={{
                        backgroundColor: Colors.zfb_theme_color,
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View>
                            <View
                                style={{flexDirection: 'row', alignItems: 'center', paddingTop: 4, paddingBottom: 14}}>
                                <XImage style={{borderRadius: 2, borderWidth: 2, borderColor: '#6DAFE2'}}
                                        icon={require('../../../resource/images/avatar.png')} iconSize={53}/>
                                <View style={{marginLeft: 7}}>
                                    <Text style={{color: Colors.white, fontSize: 18.5}}>我的</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 11,
                                        borderRadius: 10,
                                        height: 20,
                                        backgroundColor: '#2A8AD6',
                                        justifyContent: 'center',
                                        marginTop: 5
                                    }}>
                                        <Text style={{color: '#CFEBFF', fontSize: 14}}>fubailinyx@sina.com</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <XImage style={{width: 9.5, height: 17,}}
                                icon={require('../../../resource/zfb/five/zfb_me_icon_more.png')}/>
                    </View>
                    <ImgTitleCell data={{
                        title: '支付宝会员',
                        icon: require('../../../resource/zfb/five/zfb_me_zfbhy.png'),
                        icon_width: 22.72,
                        icon_height: 26.9,
                        rightText: '15个积分待领取',
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine marginTop={9} data={{
                        title: '支付宝会员',
                        icon: require('../../../resource/zfb/five/zfb_me_btn1.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine sub_color='#0EA095' data={{
                        title: '总资产',
                        icon: require('../../../resource/zfb/five/zfb_me_btn2.png'),
                        rightText: '15个积分待领取',
                    }} itemClick={() => {
                        navigation.push('ZZCIndex');
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '余额',
                        icon: require('../../../resource/zfb/five/zfb_me_btn3.png'),
                        rightText: '0.00 元',
                    }} itemClick={() => {
                        navigation.push('YueIndex')
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '余额宝',
                        icon: require('../../../resource/zfb/five/zfb_me_btn4.png'),
                    }} itemClick={() => {
                        navigation.push('YueBaoIndex');
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '花呗',
                        icon: require('../../../resource/zfb/five/zfb_me_btn6.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '余利宝',
                        icon: require('../../../resource/zfb/five/zfb_me_btn5.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '银行卡',
                        icon: require('../../../resource/zfb/five/zfb_me_btn7.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine marginTop={9} data={{
                        title: '芝麻信用',
                        icon: require('../../../resource/zfb/five/zfb_me_btn8.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '蚂蚁保险',
                        icon: require('../../../resource/zfb/five/zfb_me_btn9.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '借呗',
                        icon: require('../../../resource/zfb/five/zfb_me_btn10.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '网商银行',
                        icon: require('../../../resource/zfb/five/zfb_me_btn11.png'),
                    }} itemClick={() => {
                    }}/>

                    <ImgTitleCell hasLine marginTop={9} data={{
                        title: '支付宝公益',
                        icon: require('../../../resource/zfb/five/zfb_me_btn12.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '我的客服',
                        icon: require('../../../resource/zfb/five/zfb_me_btn13.png'),
                    }} itemClick={() => {
                    }}/>
                </ScrollView>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
