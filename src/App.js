import React from 'react';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {XWidget} from "react-native-easy-app";
import {Assets} from "./common/http/Api";

import LaunchController from "./mainController/LaunchController";
import MainController from "./mainController/MainController";
import WXController from "./mainController/WXController";

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
    const {Navigator, Screen} = createStackNavigator();
    return <Navigator initialPage={LaunchController} headerMode='none'>
        <Screen name='Launch' component={LaunchController}/>
        <Screen name='Main' component={MainController}/>
        <Screen name='WX' component={WXController}/>
    </Navigator>;
}
