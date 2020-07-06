import React, {PureComponent} from 'react';
import {BackHandler, Alert} from 'react-native';

import {DebugManager} from 'react-native-debug-tool';
import {showToast} from '../common/widgets/Loading';
import {Manager} from 'react-native-root-toast';
import DeviceInfo from 'react-native-device-info';
import {Notify} from '../common/events/Notify';
import {XImage, XText, XWidget} from 'react-native-easy-app';
import {Colors} from '../common/storage/Const';
import {Assets} from '../common/http/Api';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HttpConfig from '../common/http/HttpConfig';

import OneController from '../classes/index/zfb/one/Index';
import TwoController from '../classes/index/zfb/two/Index';
import ThreeController from '../classes/index/zfb/three/Index';
import FourController from '../classes/index/zfb/four/Index';
import FiveController from '../classes/index/zfb/five/Index';



let lastClickTime = (new Date()).valueOf();
const {Navigator, Screen} = createBottomTabNavigator();

export default class ZFBController extends PureComponent {

    constructor(props) {
        super(props);
        // this.initConfig();
        // global.tabNavigator = props.navigation;
    }

    render() {
        return <Navigator>
            <Screen name='Home1'
                    options={this.tabItemOption('首页', require('../classes/resource/zfb/common/zfb_tabbar_icon_sy_s.png'), require('../classes/resource/zfb/common/zfb_tabbar_icon_sy_s.png'))}
                    component={OneController}/>
            <Screen name='Mine2'
                    options={this.tabItemOption('理财', require('../classes/resource/zfb/common/zfb_tabbar_icon_cf_n.png'), require('../classes/resource/zfb/common/zfb_tabbar_icon_cf_n.png'))}
                    component={TwoController}/>
            <Screen name='Mine3'
                    options={this.tabItemOption('口碑', require('../classes/resource/zfb/common/zfb_tabbar_icon_kb_n.png'), require('../classes/resource/zfb/common/zfb_tabbar_icon_kb_n.png'))}
                    component={ThreeController}/>
            <Screen name='Mine4'
                    options={this.tabItemOption('朋友', require('../classes/resource/zfb/common/zfb_tabbar_icon_py_n.png'), require('../classes/resource/zfb/common/zfb_tabbar_icon_py_n.png'))}
                    component={FourController}/>
            <Screen name='Mine5'
                    options={this.tabItemOption('我的', require('../classes/resource/zfb/common/zfb_tabbar_icon_wd_n.png'), require('../classes/resource/zfb/common/zfb_tabbar_icon_wd_n.png'))}
                    component={FiveController}/>
        </Navigator>;
    }

    tabItemOption = (title, iconChecked, iconUnChecked) => {
        return {
            tabBarLabel: ({focused}) => {
                return <XText text={title} style={{fontSize: 10, marginBottom: 3, fontWeight: focused ? 'bold' : 'normal', color: focused ? Colors.zfb_tabbar_select_color : Colors.tabbar_normal_color}}/>;
            },
            tabBarIcon: ({focused}) => {
                return <XImage iconSize={24} icon={focused ? iconChecked : iconUnChecked}/>;
            },
        };
    };

    // componentDidMount() {
    //     this.listener = this.backListener();
    //     Notify.TOKEN_EXPIRED.register(this.tokenExpired);
    // }
    //
    // componentWillUnmount() {
    //     this.listener && this.listener.remove();
    //     Notify.TOKEN_EXPIRED.unRegister(this.tokenExpired);
    // }
    //
    // initConfig = () => {
    //     HttpConfig.initHttpConfig();
    //     DebugManager.initDeviceInfo(DeviceInfo);
    //     DebugManager.showFloat(Manager);
    // };
    //
    // backListener = () => {
    //     return BackHandler.addEventListener('hardwareBackPress', () => {
    //         const {state} = tabNavigator.dangerouslyGetState().routes[0];
    //         if (state && state.index !== 0) {// 若不是第一个Tab，则切换到第一个Tab
    //             tabNavigator.navigate('Home');
    //             return true;
    //         }
    //         if (navigation.canGoBack()) {// 若能返回，则不拦截
    //             return false;
    //         } else {
    //             let nowTime = (new Date()).valueOf();
    //             if (nowTime - lastClickTime < 1000) {//间隔时间小于1秒才能退出
    //                 BackHandler.exitApp();
    //             } else {
    //                 showToast('再按一次，退出应用');
    //                 lastClickTime = nowTime;
    //             }
    //             return true;
    //         }
    //     });
    // };
    //
    // tokenExpired = ({message}) => { // token 过期需要处理的逻辑
    //     Alert.alert('Token 过期 ', message);
    // };
}
