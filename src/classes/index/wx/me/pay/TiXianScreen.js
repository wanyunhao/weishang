import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";

const {width} = Dimensions.get("window");

export default class TiXianScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='零钱提现' rightImage={require('../../../../resource/common/wx_more.png')} clickRImage={()=>{

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
