import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text,TextInput} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import {XImage, XText} from "react-native-easy-app";
import {showToast} from "../../../../../common/widgets/Loading";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {Button, Label, Overlay, Theme} from "teaset";
import PasswordInput from "./views/passwordInput";
import BaseVC from "../../../zfb/Common/BaseVC";

const {width} = Dimensions.get("window");

export default class TiXianScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            inputMsg:''
        };
    }

    showPull(side, modal, text, rootTransform) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
                {/*<View style={{backgroundColor: Theme.defaultColor, minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>*/}
                {/*    <Label type='title' size='xl' text={text} />*/}
                {/*    {modal ? <View style={{height: 60}} /> : null}*/}
                {/*    {modal ? <Button title='Close' onPress={() => this.overlayPullView && this.overlayPullView.close()} /> : null}*/}
                {/*</View>*/}
                <View style={{paddingHorizontal:20,paddingTop:20}}>
                    <Text style={{color:'#181818',fontSize:17,}}>选择到账银行卡</Text>
                    <Text style={{color:'#888888',fontSize:11,marginTop:5}}>请留意各银行到帐时间</Text>
                    <YHDividingLine isBottom={false} top={77}/>
                    <View style={{marginTop:25}}>
                        {
                            ['',2].map((value)=>{
                                return (
                                    <View style={{flexDirection:'row',alignItems:'center',paddingVertical:12}}>
                                        <XImage icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/yh_b_jh.png')} iconSize={23.5}/>
                                        <View style={{marginLeft:21,flex:1}}>
                                            <Text style={{color:'#181818',fontSize:16}}>建设银行储蓄卡(8888)</Text>
                                            <Text style={{color:'#999999',fontSize:10,marginTop:1}}>2小时内到账</Text>
                                        </View>
                                        <XImage icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/radio_s.png')} iconSize={15}/>
                                        <YHDividingLine left={22}/>
                                    </View>
                                )
                            })
                        }
                        <YHTouchableOpacity onPress={()=>{
                            this.overlayPullView && this.overlayPullView.close()
                            navigation.push('AddBankCardScreen')
                        }} style={{flexDirection:'row',alignItems:'center',paddingVertical:12}}>
                            <View style={{marginLeft:45,flex:1}}>
                                <Text style={{color:'#181818',fontSize:16}}>使用新卡提现</Text>
                            </View>
                            <XImage icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/radio_s.png')} iconSize={15}/>
                            <YHDividingLine left={22}/>
                        </YHTouchableOpacity>
                    </View>

                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    showPop(type, modal, text) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{backgroundColor: Theme.defaultColor, minWidth: 300, minHeight: 310, borderRadius: 8,  alignItems: 'center',padding:15}}>
                    <Text style={{color:'#181818',fontSize:16}}>请输入支付密码</Text>
                    <Text style={{color:'#181818',fontSize:16,marginTop:24}}>零钱提现</Text>
                    <Text style={{color:'#181818',fontSize:39,marginTop:1}}>$1.00</Text>
                    <YHDividingLine isBottom={false} top={154} left={15} right={15}/>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:30,width:270,}}>
                        <Text style={{color:'#878787',fontSize:13}}>服务费</Text>
                        <Text style={{color:'#000000',fontSize:13}}>$0.10</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:270,marginTop:13}}>
                        <Text style={{color:'#878787',fontSize:13}}>费率</Text>
                        <Text style={{color:'#000000',fontSize:13}}>0.10%(最低0.1)</Text>
                    </View>
                    <PasswordInput style={{marginTop:30,width:270}} maxLength={6} onChange={(text)=>{
                        if (text.length == 6) {
                            this.overlayPopView && this.overlayPopView.close()
                            navigation.push('TixianResultScreen');
                        }
                    }}/>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }
    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='零钱提现' rightImage={require('../../../../resource/common/wx_more.png')} clickRImage={()=>{

                }}/>
                <View style={{marginTop:19,marginHorizontal:15,backgroundColor: '#FBFBFB',paddingHorizontal:28,paddingVertical:20}}>
                    <View style={{flexDirection:'row'}}>
                        <XText text='到账银行卡' style={{fontSize:13,color:'#000000',}}/>
                        <View style={{paddingLeft:34}}>
                            <XText style={{color:'#596B91',fontSize:13}} text='请选择银行卡' /*onPress={()=>{
                                navigation.push('AddBankCardScreen')
                            }}*/ onPress={() => this.showPull('bottom', false, 'Pull from bottom')}/>
                            <XText style={{color:'#B4B4B4',fontSize:12,marginTop:8}} text='2小时内到账'/>
                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal:15,backgroundColor: '#FFFFFF',paddingHorizontal:28,paddingVertical:15}}>
                    <XText text='提现金额' style={{fontSize:13,color:'#000000',}}/>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
                        <Text style={{color:'#1A1A1A',fontSize:31,fontWeight:'bold',width:31}}>￥</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{height:60,width:Const.screenWidth - 86 - 31,fontSize:31,fontWeight:'bold'}}
                            value={this.state.inputMsg}
                            onChangeText={text => {
                                this.setState({inputMsg: text});
                            }}
                        />
                        <YHDividingLine/>
                    </View>
                    <Text style={{color:'#B4B4B4',fontsize:12,marginTop:11}}>当前零钱余额3297.88元，<XText style={{color:'#5B6B8D',fontsize:12,}} text='全部提现'/></Text>
                    <YHTouchableOpacity text='提现' style={{width:'100%',height:45,backgroundColor: '#F2F2F2',marginTop:27,borderRadius:5,}} onPress={()=>{
                        this.showPop('zoomIn', false, 'Pop zoom in')
                    }}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg,
    },
});
