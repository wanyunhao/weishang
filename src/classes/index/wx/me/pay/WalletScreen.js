import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";

const {width} = Dimensions.get("window");

export default class WalletScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='钱包' rightText='账单' clickRText={()=>{
                    navigation.push('BillsScreen')
                }}/>
                <ScrollView>
                    <DiscoveryListCell hasLine data={{
                        title: '零钱',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_lq.png'),
                        rightText: '$12345'
                    }} itemClick={() => {
                        navigation.push('PocketMoneyScreen')
                    }}/>
                    <DiscoveryListCell hasLine data={{
                        title: '零钱通',
                        icon: require('../../../../resource/index/wx/me/pay/wallet/qb_icon_lqt.png'),
                    }} itemClick={() => {

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
