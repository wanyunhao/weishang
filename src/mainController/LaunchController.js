import React, {PureComponent} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {XStorage} from 'react-native-easy-app';
import {RNStorage} from '../common/storage/AppStorage';
import XLog from "../common/utils/XLog";
import {
    queryAllFromRealm,
    SelfTableName,
    SelfTableNameSchema,
    UsersTableName,
    writeToRealm
} from "../common/utils/RealmUtil";
import {isEmpty} from "../common/utils/Utils";
import {getNow} from "../common/utils/DateUtils";

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
                if (isEmpty(data)) {
                    console.log("0000空的");
                    let userinfo = {user_id:1,user_name:'wyh',avatar:'https://avatars0.githubusercontent.com/u/15177441?s=60&v=4'}
                    writeToRealm(userinfo,SelfTableName);
                } else {
                    console.log("1111有的");
                    queryAllFromRealm(SelfTableName).then((data)=>{
                        RNStorage.user_id = data[0].user_id
                    })
                }
            })
            queryAllFromRealm(UsersTableName).then((data)=>{
                if (isEmpty(data)) {
                    let userinfo = {id:1,user_name:'wyh',avatar:'https://upload.jianshu.io/users/upload_avatars/9988193/fc26c109-1ae6-4327-a298-2def343e9cd8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp'}
                    writeToRealm(userinfo,UsersTableName);
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

