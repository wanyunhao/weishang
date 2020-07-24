import React from 'react';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
    TransitionSpecs
} from '@react-navigation/stack';
import {XWidget} from "react-native-easy-app";
import {Assets} from "./common/http/Api";

import LaunchController from "./mainController/LaunchController";
import MainController from "./mainController/MainController";
import WXController from "./mainController/WXController";
import ZFBController from "./mainController/ZFBController";
import LoginVC from "./classes/login/LoginVC";
import RegisterVC from "./classes/login/RegisterVC";
import ChattingScreen from "./classes/index/wx/chat/ChattingScreen";
import GroupSetScreen from "./classes/index/wx/chat/GroupSetScreen";
import GroupUserDelScreen from "./classes/index/wx/chat/GroupUserDelScreen";
import SendRPScreen from "./classes/index/wx/chat/SendRPScreen";
import PayScreen from "./classes/index/wx/me/pay/PayScreen";
import WalletScreen from "./classes/index/wx/me/pay/WalletScreen";
import BillsScreen from "./classes/index/wx/me/pay/BillsScreen";
import PocketMoneyScreen from "./classes/index/wx/me/pay/PocketMoneyScreen";
import TixianResultScreen from "./classes/index/wx/me/pay/TixianResultScreen";
import TiXianScreen from "./classes/index/wx/me/pay/TiXianScreen";
import AddBankCardScreen from "./classes/index/wx/me/pay/AddBankCardScreen";
import PYQListScreen from "./classes/index/wx/discovery/PYQListScreen";
import PYQSendScreen from "./classes/index/wx/discovery/PYQSendScreen";
import ChooseLocationScreen from "./classes/index/wx/discovery/ChooseLocationScreen";
import ContactScreen from './classes/index/wx/contact/ContactScreen';
import ChatDemo from './classes/index/wx/chat/src/ChatDemo';
import YueIndex from './classes/index/zfb/five/yue/YueIndex';
import PersonInfoScreen from './classes/index/zfb/five/PersonInfoScreen';
import YueBaoIndex from './classes/index/zfb/five/yuebao/YueBaoIndex';
import ZZCIndex from './classes/index/zfb/five/zongzichan/ZZCIndex';
import ZFBContactIndex from './classes/index/zfb/four/contact/ZFBContactIndex';
import WXNewFriendScreen from "./classes/index/wx/contact/WXNewFriendScreen";
import TeaNavigator from "teaset/components/TeaNavigator/TeaNavigator";

import TeasetExampleHome from './classes/demo/views/Home';
import {Const} from "./common/storage/Const";
import {Provider} from "@ant-design/react-native";

export default function App() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <NavigationContainer>

            <Provider>
                <ScreenList/>

            </Provider>
        </NavigationContainer>
    </SafeAreaProvider>
}

// export default function App() {
//     return (
//         <TeaNavigator rootView={<TeasetExampleHome />} />
//     )
// }

function ScreenList() {
    global.INSETS = useSafeAreaInsets();
    XWidget.initResource(Assets).initReferenceScreen(375, 677);
    const {Navigator, Screen} = createStackNavigator();
    return <Navigator initialPage={LaunchController} headerMode='none' screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 切换路由时水平动画
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    }}>
        <Screen name='Launch' component={LaunchController}/>
        <Screen name='Main' component={MainController}/>
        <Screen name='WX' component={WXController}/>
        <Screen name='Register' component={RegisterVC}/>
        <Screen name='LoginVC' component={LoginVC}/>
        <Screen name='ChattingScreen' component={ChattingScreen}/>
        <Screen name='PayScreen' component={PayScreen}/>
        <Screen name='WalletScreen' component={WalletScreen}/>
        <Screen name='BillsScreen' component={BillsScreen}/>
        <Screen name='PocketMoneyScreen' component={PocketMoneyScreen}/>
        <Screen name='TiXianScreen' component={TiXianScreen}/>
        <Screen name='PYQListScreen' component={PYQListScreen}/>
        <Screen name='AddBankCardScreen' component={AddBankCardScreen}/>
        <Screen name='PYQSendScreen' component={PYQSendScreen}/>
        <Screen name='ChooseLocationScreen' component={ChooseLocationScreen}/>
        <Screen name='ContactScreen' component={ContactScreen}/>
        <Screen name='TixianResultScreen' component={TixianResultScreen}/>
        <Screen name='SendRPScreen' component={SendRPScreen}/>
        <Screen name='ChatDemo' component={ChatDemo}/>
        <Screen name='ZFBController' component={ZFBController}/>
        <Screen name='YueIndex' component={YueIndex}/>
        <Screen name='YueBaoIndex' component={YueBaoIndex}/>
        <Screen name='ZZCIndex' component={ZZCIndex}/>
        <Screen name='ZFBContactIndex' component={ZFBContactIndex}/>
        <Screen name='WXNewFriendScreen' component={WXNewFriendScreen}/>
        <Screen name='GroupSetScreen' component={GroupSetScreen}/>
        <Screen name='GroupUserDelScreen' component={GroupUserDelScreen}/>
        <Screen name='PersonInfoScreen' component={PersonInfoScreen}/>
    </Navigator>;
}
