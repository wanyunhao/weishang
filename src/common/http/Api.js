import React from 'react';

const Base_URL = 'http://api.wnkj.co';
export const Api = {
    register_mobile: Base_URL + '/register/mobile',// 注册
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




    animalImageList: 'https://api.jikan.moe/v3/character/1/pictures',//获取动画图片列表
    queryCitiesAmount: 'http://www.webxml.com.cn/WebServices/MobileCodeWS.asmx/getDatabaseInfo',//查询各城市Mobile服务数量
    queryAnimations: 'https://api.jikan.moe/v3/search/anime?q=Fate/Zero',//动漫列表
    queryMembers: 'https://api.jikan.moe/v3/club/1/members',//查询成员列表
};

export const Assets = 'https://react-native-easy-app.oss-cn-beijing.aliyuncs.com/demo/';
