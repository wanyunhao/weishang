import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import BaseVC from "../../../zfb/Common/BaseVC";

const {width} = Dimensions.get("window");

export default class BillsScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='账单' left_img={require('../../../../resource/common/wx_close.png')} left_img_size={13} rightImage={require('../../../../resource/common/wx_more.png')} clickRImage={()=>{

                }}/>

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
