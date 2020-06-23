import React from 'react';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,CardStyleInterpolators,HeaderStyleInterpolators,TransitionSpecs} from '@react-navigation/stack';
import {XWidget} from "react-native-easy-app";
import {Assets} from "./common/http/Api";

import LaunchController from "./mainController/LaunchController";
import MainController from "./mainController/MainController";
import WXController from "./mainController/WXController";
import LoginVC from "./classes/login/LoginVC";
import RegisterVC from "./classes/login/RegisterVC";
import ChattingScreen from "./classes/index/wx/chat/ChattingScreen";

export default function App() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <NavigationContainer>
            <ScreenList/>
        </NavigationContainer>
    </SafeAreaProvider>
}

function ScreenList() {
    global.INSETS = useSafeAreaInsets();
    XWidget.initResource(Assets).initReferenceScreen(375, 677);
    // return <MyStack />
    const {Navigator, Screen} = createStackNavigator();
    return <Navigator initialPage={LaunchController} headerMode='none' screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 切换路由时水平动画
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,}}>
        <Screen name='Launch' component={LaunchController}/>
        <Screen name='Main' component={MainController}/>
        <Screen name='WX' component={WXController}/>
        <Screen name='Register' component={RegisterVC}/>
        <Screen name='LoginVC' component={LoginVC}/>
        <Screen name='ChattingScreen' component={ChattingScreen}/>
    </Navigator>;
}
const Stack = createStackNavigator();

function MyStack() {

    return (
        <Stack.Navigator  headerMode='none' screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 切换路由时水平动画
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,}}>
            <Stack.Screen name="Launch" component={LaunchController} />
            <Stack.Screen name="Main" component={MainController} />
            <Stack.Screen name="WX" component={WXController}/>
            <Stack.Screen name="ChattingScreen" component={ChattingScreen}/>
        </Stack.Navigator>
    );
}
