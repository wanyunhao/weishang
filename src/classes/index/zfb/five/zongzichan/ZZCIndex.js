import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar, ScrollView,
} from 'react-native';
import BaseVC from "../../Common/BaseVC";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {ZFBNavigationBar} from "../../../../../common/widgets/ZFBNavigation";
import ImgTitleCell from "../view/ImgTitleCell";
import {XImage} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";

export default class ZZCIndex extends BaseVC {
    constructor() {
        super();

    }

    _addSubView() {
        return (
            <View>
                {/*<XImage resizeMode='stretch' icon={require('../../../../resource/zfb/five/yuebao/zfb_yeb_bg.png')} style={{position:'absolute',width:Const.screenWidth, height:405,}}/>*/}
                <ZFBNavigationBar title='总资产' noLine={true} rightText='服务'/>
                <View style={{borderRadius:4,marginLeft:16,width:Const.screenWidth - 32,backgroundColor:Colors.white,paddingVertical:15,marginTop:80,height:381}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:22,paddingHorizontal:15,}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'#000000',fontSize:16}}>我的资产</Text>
                            <XImage icon={require('../../../../resource/zfb/five/zzc/zfb_zzc_eye.png')} style={{width:16.89,height:11.5,marginLeft:10}}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage icon={require('../../../../resource/zfb/five/zzc/zfb_zzc_bzz.png')} style={{width:10.23,height:11.74}}/>
                            <Text style={{color:'#279C93',fontSize:12,marginLeft:4,marginRight:6}}>账户安全保障中</Text>
                            <XImage icon={require('../../../../resource/zfb/five/zzc/zfb_zzc_more2.png')} style={{width:6.05,height:9.55}}/>
                        </View>
                    </View>
                    <YHDividingLine isBottom={false} top={52}/>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:26,paddingHorizontal:15,}}>
                        <View>
                            <Text style={{color:'#999999',marginRight:14,fontSize:12}}>总资产(元)</Text>
                            <Text style={{color:'#333333',fontSize:23,marginTop:4}}>570.80</Text>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={{color:'#999999',fontSize:14}}>昨日收益</Text>
                            <Text style={{color:'#E7541E',fontSize:23,marginTop:4}}>+0.04</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:15}}>
                        {[1,2,3,4,5,6].map((value, index,) => {
                            return (
                                <View style={{width:(Const.screenWidth - 32) /2,height:68,justifyContent:'center',}}>
                                    {index < 2 ? <YHDividingLine isBottom={false} top={0}/> : null}
                                    <View style={{paddingHorizontal:15,}}>

                                        <Text style={{color:'#333333',marginRight:15,fontSize:12}}>余额</Text>
                                        <Text style={{color:'#999999',fontSize:14,marginTop:1}}>570.80</Text>
                                    </View>
                                    <YHDividingLine left={0}/>
                                    <View style={[{
                                        position: 'absolute',
                                        backgroundColor:'#eeeeee',
                                        width: 0.5,
                                        right: 0,
                                        top:0,
                                        bottom:0
                                    },]}>

                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:12,justifyContent:'center'}}>
                        <Text style={{fontSize:14,color:'#999999'}}>优选理财，去财富看看</Text>
                        <XImage icon={require('../../../../resource/images/ic_right_arrow.png')} style={{width:7.15,height:13.05,marginLeft:9}}/>
                    </View>
                </View>

                <View style={{borderRadius:4,marginLeft:16,width:Const.screenWidth - 32,backgroundColor:Colors.white,marginTop:12,height:188,paddingVertical:15}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:22,marginLeft:15}}>
                        <Text style={{color:'#000000',fontSize:16}}>我的额度</Text>
                    </View>
                    <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:15}}>
                        {[1,2,3,].map((value, index,) => {
                            return (
                                <View style={{width:(Const.screenWidth - 32) /2,height:68,justifyContent:'center',}}>
                                    {index < 2 ? <YHDividingLine isBottom={false} top={0}/> : null}
                                    <View style={{paddingHorizontal:15,}}>

                                        <Text style={{color:'#333333',marginRight:15,fontSize:12}}>余额</Text>
                                        <Text style={{color:'#999999',fontSize:14,marginTop:1}}>570.80</Text>
                                    </View>
                                    <YHDividingLine left={0}/>
                                    <View style={[{
                                        position: 'absolute',
                                        backgroundColor:'#eeeeee',
                                        width: 0.5,
                                        right: 0,
                                        top:0,
                                        bottom:0
                                    },]}>

                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    }
    componentDidMount() {
        super._setPlaceViewBackgroundColor('#0A62A1')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
