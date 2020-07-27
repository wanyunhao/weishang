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
import {showModalPrompt} from "../../../../../compoments/YHUtils";
import {isEmpty} from "../../../../../common/utils/Utils";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {queryFilterFromRealm, writeToRealm, ZFBUserTableName} from "../../../../../common/utils/RealmUtil";
import {Notify} from "../../../../../common/events/Notify";
import ZFBBaseVC from "../../Common/ZFBBaseVC";

export default class YueBaoIndex extends ZFBBaseVC {
    constructor() {
        super();
        this.state = {
            zfb_yeb: RNStorage.zfb_yeb,
            zrsy:'0.00',
            ljsy:'0.00',
            ll:'0.00'
        }
    }

    _addSubView() {
        return (
            <View>
                <XImage resizeMode='stretch' icon={require('../../../../resource/zfb/five/yuebao/zfb_yeb_bg.png')} style={{position:'absolute',width:Const.screenWidth, height:405,}}/>
                <ZFBNavigationBar title='余额宝' nav_bg_color='transparent' noLine={true} rightImage={require('../../../../resource/zfb/common/zfb_ye_more_dian.png')}/>
                <View style={{borderRadius:4,marginLeft:16,width:Const.screenWidth - 32,backgroundColor:Colors.white,padding:15,alignItems:'center',marginTop:10,height:351}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:30,}}>
                        <Text style={{color:'#333333',fontSize:12.5}}>总金额(元)</Text>
                        <XImage icon={require('../../../../resource/zfb/five/yuebao/zfb_yeb_bg_eye.png')} style={{width:17.51,height:13.19,marginLeft:5}}/>
                    </View>

                    <Text style={{color:'#000000',fontSize:34,marginTop:8}}>{this.state.zfb_yeb}</Text>
                    <View style={{backgroundColor:'#F7F7F7',height:30,paddingHorizontal:15,borderRadius:15,justifyContent:'center',marginTop:10}}>
                        <Text style={{color:'#666666',fontSize:12}}>
                            昨日收益{' '}
                            <Text style={{color:'#FF6600',fontSize:16,}}>
                                {this.state.zrsy}
                            </Text>
                            {' '}元
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:40}}>
                        <View style={{flex: 1,alignItems:'center'}}>
                            <Text style={{color:'#B4B4B4',fontSize:13}}>累计收益(元)</Text>
                            <Text style={{color:'#333333',fontSize:17,fontWeight:'bold',marginTop:10}}>{this.state.ljsy}</Text>
                        </View>
                        <View style={{flex: 1,alignItems:'center'}}>
                            <Text style={{color:'#B4B4B4',fontSize:13}}>七日年化(%)</Text>
                            <Text style={{color:'#333333',fontSize:17,fontWeight:'bold',marginTop:10}}>{this.state.ll}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:40}}>
                        <YHTouchableOpacity textStyle={{color:'#FC6703',fontSize:17}} text='转出' style={{flex: 1,alignItems:'center',backgroundColor:'#FEF5EE',height:46,borderRadius:4,}}/>
                        <YHTouchableOpacity textStyle={{color:'#FFFFFF',fontSize:17}} text='转入' style={{flex: 1,alignItems:'center',backgroundColor:'#FF6600',marginLeft:10,height:46,borderRadius:4,}} onPress={()=>{
                            showModalPrompt('转入','',(text)=>{
                                if (!isEmpty(text) && parseFloat(text)>0) {
                                    RNStorage.zfb_yeb = (parseFloat(text)).toFixed(2);
                                    writeToRealm({id:parseInt(RNStorage.zfb_user_id),zfb_yeb:RNStorage.zfb_yeb},ZFBUserTableName)
                                    this.setState({
                                        zfb_yeb: RNStorage.zfb_yeb,
                                    })
                                    Notify.Refresh_ZFB_YE.sendEvent({})
                                }
                            },'请输入金额')
                        }}/>
                    </View>
                </View>
            </View>
        )
    }
    componentDidMount() {
        this._setBarStyle(1)
        this._setPlaceViewBackgroundColor('#FF6600')
        queryFilterFromRealm(ZFBUserTableName,'id='+RNStorage.user_id).then((res)=>{
            const model = res[0];
            this.setState({
                zfb_yeb: model.zfb_yeb,
                zrsy: model.yeb_zrsy,
                ljsy: model.yeb_ljsy,
                ll: model.yeb_ll,
            })
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
