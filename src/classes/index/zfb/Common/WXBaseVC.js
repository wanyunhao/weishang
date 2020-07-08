import React from 'react';
import {StyleSheet,} from 'react-native';
import BaseVC from "./BaseVC";

export default class WXBaseVC extends BaseVC {

    componentDidMount() {
        this._setBarStyle(2);
        this._setPlaceViewBackgroundColor('#EDEDED')
        // this._yhcomponentDidMount();
    }
    // _yhcomponentDidMount() {
    //
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
