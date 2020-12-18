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
    writeToRealm, ZFBUserTableName
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
                    let userinfo = {id:1,user_name:'自己',account:'123',avatar:'https://pic.lanhuapp.com/FiYN8LHssdP-fu1AoC5jxzNLdFSL?imageMogr2/thumbnail/480x/crop/x360/format/webp/imageslim'}
                    writeToRealm(userinfo,ZFBUserTableName,ZFBUserTableName).then(()=>{
                        RNStorage.zfb_user_id = userinfo.id
                        RNStorage.zfb_avatarUrl = userinfo.avatar;
                        RNStorage.zfb_user_name = userinfo.user_name;
                        RNStorage.zfb_account = '123456';
                        RNStorage.zfb_account_level = '大众会员';
                        RNStorage.zfb_ye = 0.00;
                        RNStorage.zfb_yeb = 0.00;
                        writeToRealm(userinfo,SelfTableName).then((res)=>{
                            RNStorage.user_id = userinfo.id;
                            RNStorage.avatarUrl = userinfo.avatar;
                            RNStorage.user_name = userinfo.user_name;
                            RNStorage.wx_lq = '0.00';
                            RNStorage.wx_lqt = '0.00';
                            RNStorage.wx_lqtsyl = '0.00';
                            navigation.replace('Main')
                        });
                    })

                } else {

                    navigation.replace('LoginVC')
                    // navigation.replace('Main')
                }

            })
            // navigation.replace('Main')
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
        // data.map(([keyStr, value]) => {
        //     let [, key] = keyStr.split('#');
        //     XLog.log('持久化数据变更:', key, '<###>', value);
        // })
    };


    render() {
        return null;
    }

}

