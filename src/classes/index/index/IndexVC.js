import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    NativeModules, StatusBar,
} from 'react-native';
import {Colors, CommonStyles, Const} from "../../../common/storage/Const";

import {showToast} from '../../../common/widgets/Loading';
import {XHttp, XImage, XText, XView} from "react-native-easy-app";
import {Api} from "../../../common/http/Api";
import {WXNavigationBar} from "../../../common/widgets/WXNavigation";
import BaseVC from "../zfb/Common/BaseVC";

export default class IndexVC extends BaseVC {
    constructor() {
        super();
        this.state = {
            floors: [],
            itemTag_dic: {}
        }
        this.oneArr = [
            {
                img: require('../../resource/index/index/home_icon_cjlt.png'),
                title: '创建聊天',
            },
            {
                img: require('../../resource/index/index/home_icon_wxlq.png'),
                title: '微信零钱',
            },
            {
                img: require('../../resource/index/index/home_icon_wxtxl.png'),
                title: '微信通讯录',
            },
        ]
        this.wxArr = [
            {
                img: require('../../resource/index/index/xw_btn1.png'),
                title: '单聊',
            },
            {
                img: require('../../resource/index/index/xw_btn2.png'),
                title: '群聊',
            },
            {
                img: require('../../resource/index/index/xw_btn3.png'),
                title: '红包',
            },
            {
                img: require('../../resource/index/index/xw_btn4.png'),
                title: '表情',
            },
            {
                img: require('../../resource/index/index/xw_btn5.png'),
                title: '转账',
            },
        ]
        this.zfbArr = [

            {
                img: require('../../resource/index/index/xb_btn1.png'),
                title: '总资产',
            },
            {
                img: require('../../resource/index/index/xb_btn2.png'),
                title: '昨日收益',
            },
            {
                img: require('../../resource/index/index/xb_btn3.png'),
                title: '账单',
            },
            {
                img: require('../../resource/index/index/xb_btn4.png'),
                title: '余额',
            },
            {
                img: require('../../resource/index/index/xb_btn5.png'),
                title: '余额宝',
            },
        ]
    }

    componentDidMount() {
        super._setPlaceViewBackgroundColor(Colors.white);
        this._setBarStyle(2);
    }


    _addSubView() {
        return (
            <View>
                <View
                    style={{height: 44, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 17, color: '#000000'}}>制作截图</Text>
                </View>
                <ScrollView>

                    <XImage resizeMode='stretch' style={{width: Const.screenWidth, height: 208}}
                            icon={require('../../resource/index/index/baner.png')}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',backgroundColor:Colors.white,padding:20}}>
                        {this.oneArr.map(((value, index) => {
                            return (
                                <View style={{alignItems: 'center'}}>
                                    <XImage icon={value.img}
                                            iconSize={40}/>
                                    <Text style={{color: '#4A4A4A',marginTop:9}}>{value.title}</Text>
                                </View>
                            )
                        }))}
                    </View>
                    <View style={{paddingHorizontal:21,paddingVertical:15,backgroundColor:Colors.white,marginTop:10}}>
                        <XView onPress={()=>{
                            navigation.push('WX')
                            // this._setBarStyle(2);
                        }} style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <XImage icon={require('../../resource/index/index/xw.png')} iconSize={38.8}/>
                            <XImage icon={require('../../resource/index/index/more.png')} iconSize={13.85}/>
                        </XView>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-around',marginTop:27}}>
                            {this.wxArr.map(((value, index) => {
                                return (
                                    <XView onPress={()=>{
                                        showToast(index);
                                    }} style={{alignItems: 'center'}}>
                                        <XImage icon={value.img}
                                                iconSize={40}/>
                                        <Text style={{color: '#4A4A4A',marginTop:8}}>{value.title}</Text>
                                    </XView>
                                )
                            }))}
                        </View>
                    </View>
                    <View style={{paddingHorizontal:21,paddingVertical:15,backgroundColor:Colors.white,marginTop:10}}>
                        <XView onPress={()=>{
                            navigation.push('ZFBController')
                        }} style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <XImage icon={require('../../resource/index/index/xb.png')} iconSize={38.8}/>
                            <XImage icon={require('../../resource/index/index/more.png')} iconSize={13.85}/>
                        </XView>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-around',marginTop:27}}>
                            {this.zfbArr.map(((value, index) => {
                                return (
                                    <XView onPress={()=>{
                                        showToast(index);
                                    }} style={{alignItems: 'center'}}>
                                        <XImage icon={value.img}
                                                iconSize={40}/>
                                        <Text style={{color: '#4A4A4A',marginTop:8}}>{value.title}</Text>
                                    </XView>
                                )
                            }))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    top_container: {//默认页面背景样式
        flex: 1,
        height: 200,
    },
    wrapper: {
        height: 220
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide1_img: {
        width: Const.screenWidth,
        height: 200,
    }
});
