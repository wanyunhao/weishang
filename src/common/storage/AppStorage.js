import React from 'react';
import DeviceInfo from 'react-native-device-info';

export const RNStorage = {//持久化数据列表
    user_name: undefined,
    user_id: undefined,
    token: undefined,
    avatarUrl: undefined,
    wx_lq: undefined,//微信零钱
    wx_lqt: undefined,//微信零钱通

    wx_pyq_bg: undefined,//微信朋友圈背景
    zfb_bg_one: undefined,//首页背景
    zfb_bg_two: undefined,//财富背景
    zfb_bg_three: undefined,//口碑背景
    zfb_bg_zzc: undefined,//总资产背景

    zfb_user_id: undefined,
    zfb_avatarUrl: undefined,
    zfb_user_name: undefined,
    zfb_account: undefined,
    zfb_account_level: undefined,

    zfb_ye: undefined,
    zfb_yeb: undefined,

    customerId: undefined,//客户ID
    accessToken: undefined,//OAuth2.0 accessToken
    refreshToken: undefined,//OAuth2.0 refreshToken
    baseUrl: undefined,
    str: undefined,//测试符串
    json: undefined,//测试符串
    [DeviceInfo.getBundleId()]: undefined,
    search_history_list: []
};

export const RNData = {//临时内存数据
    LogOn: true,//展示日志
    canGoBack: false,//webView返回标记
    tokenExpiredList: [],
    hasQueryToken: null,
    userAgent: {//http请求使用
        package: DeviceInfo.getBundleId,
        os_version: DeviceInfo.getSystemVersion(),
        package_name: DeviceInfo.getBundleId(),
        app_version: DeviceInfo.getVersion(),
        device_name: DeviceInfo.getModel(),
        default_ua: DeviceInfo.getUserAgentSync,
    },
};

// 声明全局变量，方便查询变量含义
const global = {
    INSETS: undefined, // safeView insets 安全区域range
    navigation: undefined, // 栈导航器
    tabNavigator: undefined, // Tab导航器
    eventEmitter: undefined, // 事件发送器，建议直接Notify替代
};
