import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View, ScrollView, Text, TextInput} from "react-native";
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
import {queryAllFromRealm, WXQB_BankTableName} from "../../../../../common/utils/RealmUtil";
import {isEmpty} from "../../../../../common/utils/Utils";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import SecurityKeyboard from "../../../../../compoments/yhkeyborder/component/securityKeyboardBase";
import {Notify} from "../../../../../common/events/Notify";

const {width} = Dimensions.get("window");

export default class TiXianScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            inputMsg: '',
            bank_list: [],
            select_bank: {},
        };
    }

    componentDidMount() {
        this._requestData();
    }

    _requestData() {
        queryAllFromRealm(WXQB_BankTableName).then((data) => {
            if (!isEmpty(data)) {
                this.setState({
                    select_bank: data[0]
                })
            }
            this.setState({
                bank_list: data,
            })
        })
    }

    showPull(side, modal, text, rootTransform) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform}
                              ref={v => this.overlayPullView = v}>
                <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                    <Text style={{color: '#181818', fontSize: 17,}}>选择到账银行卡</Text>
                    <Text style={{color: '#888888', fontSize: 11, marginTop: 5}}>请留意各银行到帐时间</Text>
                    <YHDividingLine isBottom={false} top={77}/>
                    <View style={{marginTop: 25}}>
                        {
                            this.state.bank_list.map((value) => {
                                return (
                                    <YHTouchableOpacity onPress={() => {
                                        this.overlayPullView && this.overlayPullView.close()
                                        this.setState({
                                            select_bank: value
                                        })
                                    }} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}>
                                        <XImage
                                            icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/yh_b_jh.png')}
                                            iconSize={23.5}/>
                                        <View style={{marginLeft: 21, flex: 1}}>
                                            <Text style={{
                                                color: '#181818',
                                                fontSize: 16
                                            }}>{value.bank_name + '(' + value.bank_num + ')'}</Text>
                                            <Text style={{color: '#999999', fontSize: 10, marginTop: 1}}>2小时内到账</Text>
                                        </View>
                                        {this.state.select_bank.id == value.id ? <XImage
                                            icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/radio_s.png')}
                                            iconSize={15}/> : null}

                                        <YHDividingLine left={22}/>
                                    </YHTouchableOpacity>
                                )
                            })
                        }
                        <YHTouchableOpacity onPress={() => {
                            this.overlayPullView && this.overlayPullView.close()
                            navigation.push('AddBankCardScreen', {
                                refreshBankList: () => {
                                    this._requestData();
                                }
                            })
                        }} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}>
                            <View style={{marginLeft: 45, flex: 1}}>
                                <Text style={{color: '#181818', fontSize: 16}}>使用新卡提现</Text>
                            </View>
                            {/*<XImage icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/radio_s.png')} iconSize={15}/>*/}
                            <YHDividingLine left={22}/>
                        </YHTouchableOpacity>
                    </View>

                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    showPop(type, modal, text) {
        let fwf = (this.state.inputMsg * 0.001).toFixed(2)
        if (fwf < 0.1) {
            fwf = 0.1;
        }
        let jine = (this.state.inputMsg - fwf).toFixed(2);

        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: 300,
                    minHeight: 310,
                    borderRadius: 8,
                    alignItems: 'center',
                    padding: 15
                }}>
                    <Text style={{color: '#181818', fontSize: 16}}>请输入支付密码</Text>
                    <Text style={{color: '#181818', fontSize: 16, marginTop: 24}}>零钱提现</Text>
                    <Text style={{color: '#181818', fontSize: 39, marginTop: 1}}>￥{jine}</Text>
                    <YHDividingLine isBottom={false} top={154} left={15} right={15}/>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 30,
                        width: 270,
                    }}>
                        <Text style={{color: '#878787', fontSize: 13}}>服务费</Text>
                        <Text style={{color: '#000000', fontSize: 13}}>￥{fwf}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 270,
                        marginTop: 13
                    }}>
                        <Text style={{color: '#878787', fontSize: 13}}>费率</Text>
                        <Text style={{color: '#000000', fontSize: 13}}>0.10%(最低0.10)</Text>
                    </View>
                    <PasswordInput style={{marginTop: 30, width: 270}} maxLength={6} onChange={(text) => {
                        if (text.length == 6) {
                            this.overlayPopView && this.overlayPopView.close()
                            navigation.push('TixianResultScreen',{jine:jine,fwf:fwf,select_bank:this.state.select_bank});
                            RNStorage.wx_lq = (RNStorage.wx_lq - this.state.inputMsg).toFixed(2);
                            Notify.Refresh_WX_LQ.sendEvent({})
                        }
                    }}/>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }
    parsePrice(obj) {
        //必须保证第一位为数字而不是.
        obj = obj.replace(/[^\d.]/g, "");
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/^\./g, "");
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace(/\.{2,}/g, ".");
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //只能输入两个小数
        obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        return obj;
    }
    _addSubView() {
        return (
            <View style={styles.container}>
                {/*<SecurityKeyboard*/}
                {/*    placeholder={"手动输入金额"}*/}
                {/*    placeholderTextColor={'#E0E0E0'}*/}
                {/*    onChangeText={(text)=>{*/}
                {/*        console.log(text);*/}
                {/*    }}*/}
                {/*    onFocus={()=>{*/}
                {/*        console.log('onFocus');*/}
                {/*    }}*/}
                {/*    // style={styles.XXX}*/}
                {/*    // valueStyle={styles.XXXX}*/}
                {/*    ref={$moneyInput=>{*/}
                {/*        this.$moneyInput = $moneyInput;*/}
                {/*    }}*/}
                {/*    // regs={this.XXX.bind(this)}*/}
                {/*/>*/}
                <WXNavigationBar title='零钱提现' rightImage={require('../../../../resource/common/wx_more.png')}
                                 clickRImage={() => {

                                 }}/>
                <View style={{
                    marginTop: 19,
                    marginHorizontal: 15,
                    backgroundColor: '#FBFBFB',
                    paddingHorizontal: 28,
                    paddingVertical: 20
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <XText text='到账银行卡' style={{fontSize: 13, color: '#000000',}}/>
                        <View style={{paddingLeft: 34}}>

                            {isEmpty(this.state.select_bank) ? (
                                <XText style={{color: '#596B91', fontSize: 13}} text='请选择银行卡'
                                       onPress={() => this.showPull('bottom', false, 'Pull from bottom')}/>
                            ) : (
                                <XText style={{color: '#596B91', fontSize: 13}} text={this.state.select_bank.bank_name}
                                       onPress={() => this.showPull('bottom', false, 'Pull from bottom')}/>
                            )}
                            <XText style={{color: '#B4B4B4', fontSize: 12, marginTop: 8}} text='2小时内到账'/>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginHorizontal: 15,
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 28,
                    paddingVertical: 15
                }}>
                    <XText text='提现金额' style={{fontSize: 13, color: '#000000',}}/>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 10,height:65}}>
                        <Text style={{color: '#1A1A1A', fontSize: 31, fontWeight: 'bold', width: 31}}>￥</Text>
                        {/*<SecurityKeyboard*/}
                        {/*    style={{height: 60, width: Const.screenWidth - 86 - 31 }}*/}
                        {/*    value={this.state.inputMsg}*/}
                        {/*    valueStyle={{fontSize: 46, fontWeight: 'bold',lineHeight:60}}*/}
                        {/*    onChangeText={(text)=>{*/}
                        {/*        this.setState({*/}
                        {/*            inputMsg:text*/}
                        {/*        })*/}
                        {/*    }}*/}
                        {/*    placeholder={' '}*/}
                        {/*    regs={this.parsePrice.bind(this)}*/}
                        {/*/>*/}
                        <TextInput
                            keyboardType="numeric"
                            style={{width: Const.screenWidth - 86 - 31, fontSize: 43, fontWeight: 'bold'}}
                            value={this.state.inputMsg}
                            onChangeText={text => {
                                this.setState({inputMsg: text});
                            }}
                        />
                        <YHDividingLine/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 11}}>
                        <Text style={{color: '#B4B4B4', fontsize: 12}}>当前零钱余额{RNStorage.wx_lq}元，</Text>
                        <XText style={{color: '#5B6B8D', fontsize: 12,}} text='全部提现' onPress={() => {
                            this.setState({
                                inputMsg: RNStorage.wx_lq
                            })
                        }}/>
                    </View>
                    <YHTouchableOpacity text='提现' style={{
                        width: '100%',
                        height: 45,
                        backgroundColor: isEmpty(this.state.inputMsg) ? '#F2F2F2' : '#07C160',
                        marginTop: 27,
                        borderRadius: 5,
                    }} textStyle={{
                        color: isEmpty(this.state.inputMsg) ? Colors.black_text_color : Colors.white,
                    }} onPress={() => {
                        if (isEmpty(this.state.inputMsg)) {
                            return;
                        }
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
