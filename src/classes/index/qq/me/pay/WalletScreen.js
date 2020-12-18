import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import BaseVC from "../../../zfb/Common/BaseVC";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {Notify} from "../../../../../common/events/Notify";
import {showModalPrompt, showOverlayModal} from "../../../../../compoments/YHUtils";
import {isEmpty} from "../../../../../common/utils/Utils";
import Overlay from "teaset/components/Overlay/Overlay";
import {URLInputView} from "../../chat/ChatUrlScreen";
import {CommonTwoInputView} from "../../chat/views/NewPersonView";

const {width} = Dimensions.get("window");

export default class WalletScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            refresh:false,
        };
    }

    componentDidMount() {
        this._setBarStyle(2);
        this._setPlaceViewBackgroundColor('#EDEDED')
        Notify.Refresh_WX_LQ.register(this.refreshMoney)
    }
    componentWillUnmount() {
        Notify.Refresh_WX_LQ.unRegister(this.refreshMoney);
    }
    refreshMoney = ({}) => {
        this.setState({
            refresh:!this.state.refresh
        })
    };

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='钱包' rightText='账单' clickRText={()=>{
                    navigation.push('BillsScreen')
                }}/>
                <ScrollView>
                    <DiscoveryListCell hasLine data={{
                        title: '零钱',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_lq.png'),
                        rightText: RNStorage.wx_lq
                    }} itemClick={() => {
                        navigation.push('PocketMoneyScreen')
                    }}/>
                    <DiscoveryListCell title_info={'1.32%'} hasLine data={{
                        title: '零钱通',
                        rightText: RNStorage.wx_lqt,
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_lqt.png'),
                        title_info:'收益率' + RNStorage.wx_lqtsyl + '%',
                    }} itemClick={() => {
                        // showModalPrompt('充值','',(text)=>{
                        //     if (!isEmpty(text) && parseFloat(text)>0) {
                        //         RNStorage.wx_lqt = (parseFloat(RNStorage.wx_lqt ) + parseFloat(text)).toFixed(2);
                        //         Notify.Refresh_WX_LQ.sendEvent({})
                        //     }
                        // },'请输入金额')
                        const key = showOverlayModal('zoomOut', true, <CommonTwoInputView value1={RNStorage.wx_lqt} value2={RNStorage.wx_lqtsyl} keyboardType1={'number-pad'} keyboardType2={'number-pad'} firstP={'请输入零钱通余额'} secondP={'请输入利率'} cancelClick={() => {
                            Overlay.hide(key);
                        }} confirmClick={(value) => {
                            if (!isEmpty(value.first) && parseFloat(value.first)>0) {
                                RNStorage.wx_lqt = parseFloat(value.first).toFixed(2);
                            }
                            if (!isEmpty(value.second) && parseFloat(value.second)>0) {
                                RNStorage.wx_lqtsyl = value.second
                            }
                            Notify.Refresh_WX_LQ.sendEvent({})
                            Overlay.hide(key);
                        }}/>);
                    }}/>
                    <DiscoveryListCell data={{
                        title: '银行卡',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_yhk.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell hasLine marginTop={8} data={{
                        title: '亲属卡',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_qsk.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell data={{
                        title: '银行储蓄',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_yhcx.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell marginTop={8} data={{
                        title: '安全保障',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_aqbz.png'),
                    }} itemClick={() => {

                    }}/>
                </ScrollView>
                <View style={{width: Const.screenWidth,alignItems:'center',position:'absolute',bottom:22,left:0}}>
                    <Text style={{color:'#5C6B8C',fontSize:13}}>帮助中心</Text>
                    <Text style={{color:'#7F7F7F',fontSize:13,marginTop:7}}>本服务由财付通提供</Text>
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
