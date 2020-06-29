/**
 *  常用工具类
 */
import React from 'react';
import {ActionSheet} from "teaset";


export function showActionSheet(array) {
    // let items = [
    //     {title: 'Say hello', onPress: () => alert('Hello')},
    //     {title: 'Do nothing'},
    //     {title: 'Disabled', disabled: true},
    // ];
    let items = array;
    let cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem,);
}
