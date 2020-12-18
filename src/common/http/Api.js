import React from 'react';

const Base_URL = 'http://117.24.14.55:3210';
export const Api = {
    Usercenter_getUserlist: Base_URL + '/Api/Usercenter/getUserlist',// 随机获取用户信息
    Api_Gift_send: Base_URL + '/Api/Gift/send',//发红包接口
    Api_Gift_addRecordForadd: Base_URL + '/Api/Gift/addRecordForadd',//自定义消息-自定义
    Api_Gift_addRecord: Base_URL + '/Api/Gift/addRecord',//自定义消息-自定义
    Api_Gift_getRecord: Base_URL + '/Api/Gift/getRecord',//自定义消息-自定义
    Api_Gift_addRecordForTransfer: Base_URL + '/Api/Gift/addRecordForTransfer',//自定义消息-转账
    Api_Gift_addRecordForRecharge: Base_URL + '/Api/Gift/addRecordForRecharge',//自定义消息-转账
    api_Usercenter_getBank: Base_URL + '/api/Usercenter/getBank',// 银行列表
    Api_User_register: Base_URL + '/Api/User/register',// 注册用户
    Api_User_resetpwd: Base_URL + '/Api/User/resetpwd',// 忘记密码
    Api_User_login: Base_URL + '/Api/User/login',// 登录用户
    Api_user_sendSmsCode: Base_URL + '/Api/User/sendSmsCode',// 发送验证码
    Api_User_checkCode: Base_URL + '/Api/User/checkCode',// 激活码兑换
    Api_User_MyInvite: Base_URL + '/Api/User/MyInvite',// 推广码输入
    register_captcha: Base_URL + '/register/captcha',// 发送注册验证码
    login_captcha: Base_URL + '/login/captcha',// 发送登录验证码
    user_pwd_captcha: Base_URL + '/user/pwd/captcha',// 发送修改密码用的短信验证码
    login_account: Base_URL + '/login/account',// 账号密码登录
    login_mobile: Base_URL + '/login/mobile',// 账号密码登录
    user_info: Base_URL + '/user/info',// 活用信息
    user_edit: Base_URL + '/user/edit',// 编辑用户信息
    course_home: Base_URL + '/course/home',// 首页和活动页等
    course_search: Base_URL + '/course/search',// 搜索
    course_catalog_all: Base_URL + '/course/catalog/all',// 获取全部分类
    course_institute_search: Base_URL + '/course/institute/search',// 获取全部分类
    course_enrollment: Base_URL + '/course/enrollment',// 课程报名信息
    course_enrolling: Base_URL + '/course/enrolling',// 课程报名
    course_floor: Base_URL + '/course/floor',// 获取楼层标签(tags)下的内容
    course_myclass: Base_URL + '/course/myclass',// 获取楼层标签(tags)下的内容
    course_class: Base_URL + '/course/class',// 去学习，进入课程课件列表
    course_discuss: Base_URL + '/course/discuss',// 课程大纲页的讨论（按列表显示帖子，不显示评论，点击帖子进入帖子详情才显示评论）
    course_content_posting: Base_URL + '/course/content/posting',// 帖子详情页（单个帖子及其所有评论，评论倒叙排列）

};

export const Assets = 'https://react-native-easy-app.oss-cn-beijing.aliyuncs.com/demo/';
