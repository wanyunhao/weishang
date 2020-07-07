import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView, TouchableOpacity,
} from 'react-native';
import {Colors, CommonStyles, Const} from "../../../common/storage/Const";
import {NavigationBar} from "../../../common/widgets/WidgetNavigation";
import {showToast} from "../../../common/widgets/Loading";
import {RNStorage} from "../../../common/storage/AppStorage";
import {Notify} from "../../../common/events/Notify";
import {XHttp} from "react-native-easy-app";
import {Api} from "../../../common/http/Api";
import BaseVC from "../../index/zfb/Common/BaseVC";

export default class MineVC extends BaseVC {
    constructor() {
        super();
        this.state = {
            isLogin: false,
            nickname: '',
            avatarUrl: '',
            openId: '',
        }
    }

    componentDidMount() {
        super._setPlaceViewBackgroundColor('#00B1FF');
        this._setBarStyle(1);
    }

    _addSubView() {
        return (
            <>
                <View
                    style={{height: 44, backgroundColor: '#00B1FF', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 17, color: Colors.white}}>我的</Text>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
