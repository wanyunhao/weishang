import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar,
} from 'react-native';
import BaseVC from "../../Common/BaseVC";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";

export default class YueIndex extends BaseVC {
    constructor() {
        super();

    }

    _addSubView() {
        return (
            <View>
                <YHTouchableOpacity text='123' onPress={()=>{

                }}/>
            </View>
        )
    }
    componentDidMount() {
        super._setPlaceViewBackgroundColor('#0A62A1')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
