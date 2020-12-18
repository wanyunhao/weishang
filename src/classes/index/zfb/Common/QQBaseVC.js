import React from 'react';
import {StyleSheet,} from 'react-native';
import BaseVC from "./BaseVC";

export default class QQBaseVC extends BaseVC {

    componentDidMount() {
        this._setBarStyle(2);
        this._setPlaceViewBackgroundColor('#F4F5FA')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
