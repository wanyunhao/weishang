import React from 'react';
import {StyleSheet,} from 'react-native';
import BaseVC from "./BaseVC";

export default class ZFBBaseVC extends BaseVC {

    componentDidMount() {
        this._setBarStyle(2);
        this._setPlaceViewBackgroundColor('#EDEDED')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
