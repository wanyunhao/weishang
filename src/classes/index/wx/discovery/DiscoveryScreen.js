import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView} from "react-native";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors} from "../../../../common/storage/Const";
import MsgListCell from "../chat/views/MsgListCell";
import {XFlatList} from "react-native-easy-app";
import DiscoveryListCell from "./view/DiscoveryListCell";
import {instance, PYQListTableName, writeToRealm} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";

const {width} = Dimensions.get("window");

export default class DiscoveryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='发现' hideBack={true}/>
                <ScrollView>
                    <DiscoveryListCell data={{
                        title: '朋友圈',
                        icon: require('../../../resource/index/wx/fx/wx_fx_pyq.png'),
                        right_icon: require('../../../resource/images/avatar.png')
                    }} itemClick={() => {
                        navigation.push('PYQListScreen');
                    }}/>
                    <DiscoveryListCell hasLine marginTop={8} data={{
                        title: '扫一扫',
                        icon: require('../../../resource/index/wx/fx/wx_fx_sys.png'),
                    }} itemClick={() => {
                        writeToRealm({
                            id: getNow(),
                            user_name: 'wyh',
                            avatar: require('../../../resource/images/avatar.png'),
                            text: '我今天天天气 打的 的的的外放就欧是的就',
                            time: '10分钟前',
                            dianzanText: '吴彦祖,对对对,对对对打的'
                        },PYQListTableName)
                    }}/>
                    <DiscoveryListCell data={{
                        title: '摇一摇',
                        icon: require('../../../resource/index/wx/fx/pyq_icon1.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell hasLine marginTop={8} data={{
                        title: '看一看',
                        icon: require('../../../resource/index/wx/fx/pyq_icon2.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell data={{
                        title: '搜一搜',
                        icon: require('../../../resource/index/wx/fx/wx_fx_sou.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell marginTop={8} data={{
                        title: '附近的人',
                        icon: require('../../../resource/index/wx/fx/pyq_icon3.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell hasLine marginTop={8} data={{
                        title: '购物',
                        icon: require('../../../resource/index/wx/fx/pyq_icon4.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell data={{
                        title: '游戏',
                        icon: require('../../../resource/index/wx/fx/pyq_icon5.png'),
                    }} itemClick={() => {

                    }}/>
                    <DiscoveryListCell marginTop={8} data={{
                        title: '小程序',
                        icon: require('../../../resource/index/wx/fx/pyq_icon6.png'),
                    }} itemClick={() => {

                    }}/>
                </ScrollView>
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
