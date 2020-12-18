import React, {PureComponent} from 'react';
import {XImage, XText} from 'react-native-easy-app';
import {BackHandler, Alert} from 'react-native';
import {Colors} from '../common/storage/Const';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import OneController from '../classes/index/wx/chat/ChattingScreen';
import FourController from '../classes/index/qq/me/MeScreen';
import ConversationScreen from '../classes/index/qq/chat/ConversationScreen';
import ContactScreen from '../classes/index/qq/contact/ContactScreen';
import DiscoveryScreen from '../classes/index/qq/discovery/DiscoveryScreen';
import { DeviceEventEmitter } from 'react-native';

let lastClickTime = (new Date()).valueOf();
const {Navigator, Screen} = createBottomTabNavigator();

export default class QQController extends PureComponent {

    constructor(props) {
        super(props);
        // this.initConfig();
        // global.tabNavigator = props.navigation;
    }

    render() {
        return <Navigator>
            <Screen name='Home1'
                    options={this.tabItemOption('消息', require('../classes/resource/qq/btn_qq_main_home_pressed.png'), require('../classes/resource/qq/btn_qq_main_home_notmal.png'))}
                    component={ConversationScreen}/>
            <Screen name='Mine2'
                    options={this.tabItemOption('联系人', require('../classes/resource/qq/btn_qq_main_contacts_pressed.png'), require('../classes/resource/qq/btn_qq_main_contacts_normal.png'))}
                    component={ContactScreen}/>
            <Screen name='Mine3'
                    options={this.tabItemOption('看点', require('../classes/resource/qq/btn_qq_main_watch_pressed.png'), require('../classes/resource/qq/btn_qq_main_watch_normal.png'))}
                    component={DiscoveryScreen}/>
            <Screen name='Mine4'
                    options={this.tabItemOption('动态', require('../classes/resource/qq/btn_qq_main_trends_pressed.png'), require('../classes/resource/qq/btn_qq_main_trends_normal.png'))}
                    component={FourController}/>
        </Navigator>;
    }

    tabItemOption = (title, iconChecked, iconUnChecked) => {
        return {
            tabBarLabel: ({focused}) => {
                return <XText text={title} style={{fontSize: 10, marginBottom: 3, fontWeight: focused ? 'bold' : 'normal', color: focused ? Colors.tabbar_select_color : Colors.tabbar_normal_color}}/>;
            },
            tabBarIcon: ({focused}) => {
                return <XImage iconSize={24} icon={focused ? iconChecked : iconUnChecked}/>;
            },
        };
    };

    componentDidMount() {
        this.listener = this.backListener();
        // Notify.TOKEN_EXPIRED.register(this.tokenExpired);
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        // Notify.TOKEN_EXPIRED.unRegister(this.tokenExpired);
    }
    backListener = () => {
        return BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });
    };
    //
    // tokenExpired = ({message}) => { // token 过期需要处理的逻辑
    //     Alert.alert('Token 过期 ', message);
    // };
}
