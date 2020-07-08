import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text,TextInput} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import {XText} from "react-native-easy-app";
import {showToast} from "../../../../../common/widgets/Loading";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import TitleAndSubCell from "./views/TitleAndSubCell";
import BaseVC from "../../../zfb/Common/BaseVC";

const {width} = Dimensions.get("window");

export default class AddBankCardScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            inputMsg:''
        };
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='新增银行卡' rightText='完成' clickRText={()=>{

                }}/>
                <TitleAndSubCell isEdit={false} title='银行名称' sub_title='招商银行'/>
                <TitleAndSubCell isEdit={true} title='银行卡四位尾号' sub_title='请输入'/>

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
