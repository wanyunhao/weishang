import React from 'react';
import {StyleSheet,} from 'react-native';
import BaseVC from "./BaseVC";
import {Colors} from "../../../../common/storage/Const";

export default class ZFBBaseVC extends BaseVC {

    componentDidMount() {
        this._setBarStyle(1);
        this._setPlaceViewBackgroundColor(Colors.zfb_theme_color)
    }
    _addSubView() {
        super._addSubView();

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
