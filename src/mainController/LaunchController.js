import React, {PureComponent} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {XStorage} from 'react-native-easy-app';
import {RNStorage} from '../common/storage/AppStorage';
import XLog from "../common/utils/XLog";
import {queryAllFromRealm, SelfTableName, SelfTableNameSchema, writeToRealm} from "../common/utils/RealmUtil";

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.initAsync(); // this.initSync(); 两种初始化方式二选一( Choose one of two initialization methods )
    }

    initAsync = () => {
        XStorage.initStorage(RNStorage, AsyncStorage, () => {
            global.navigation = this.props.navigation;
            queryAllFromRealm(SelfTableName).then((data)=>{
                if (data == null) {
                    let userinfo = {user_id:1,user_name:'wyh',avatar:'https://avatars0.githubusercontent.com/u/15177441?s=60&v=4'}
                    writeToRealm(userinfo,SelfTableName,SelfTableNameSchema);
                }
            })
            navigation.replace('Main')
            // navigation.replace('LoginVC')
        }, this.printLog);
    };

    initSync = async () => {
        let result = await XStorage.initStorageSync(RNStorage, AsyncStorage, this.printLog);
        if (result) {
            global.navigation = this.props.navigation;
            navigation.replace('Main')
        }
    };

    printLog = (data) => {
        data.map(([keyStr, value]) => {
            let [, key] = keyStr.split('#');
            XLog.log('持久化数据变更:', key, '<###>', value);
        })
    };


    render() {
        return null;
    }

}

