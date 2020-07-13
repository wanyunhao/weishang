/**
 *  常用工具类
 */
import React from 'react';
import {ActionSheet} from "teaset";
import {XHttp} from "react-native-easy-app";
import {Api} from "../common/http/Api";
import {
    Modal,
} from '@ant-design/react-native';

export function getPeople(count,successBlock) {
    XHttp().url(Api.Usercenter_getUserlist)
        .param({token: '123456',nums:count || 20})
        .post((success, json) => {
            if (success) {
                successBlock(json.data || [])
            }
        })
}
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
export function showModalOperation(array) {
    // [
    //     { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
    //     { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
    // ]
    Modal.operation(array);
}

export function showModalPrompt(title,msg,callBlock,placeholder) {
    Modal.prompt(
        title,
        msg,
         callBlock,
        'default',
        null,
        [placeholder]
    );
}

export function dealImage(base64, w, callback) {
    var newImage = new Image();
    var quality = 0.6;    //压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
    var imgWidth, imgHeight;
    newImage.onload = function () {
        imgWidth = this.width;
        imgHeight = this.height;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
            if (imgWidth > imgHeight) {
                canvas.width = w;
                canvas.height = w * imgHeight / imgWidth;
            } else {
                canvas.height = w;
                canvas.width = w * imgWidth / imgHeight;
            }
        } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
        // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
        // while (base64.length / 1024 > 150) {
        // 	quality -= 0.01;
        // 	base64 = canvas.toDataURL("image/jpeg", quality);
        // }
        // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        // while (base64.length / 1024 < 50) {
        // 	quality += 0.001;
        // 	base64 = canvas.toDataURL("image/jpeg", quality);
        // }
        callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
    }
}
