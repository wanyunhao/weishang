import Realm from 'realm';

/***表定义区**/
export const WXConversationTableName = 'WXConversation';
export const SelfTableName = 'Self';
export const ZFBUserTableName = 'ZFBUserTableName';
export const UsersTableName = 'Users';
export const MSGTableName = 'MSG';
export const MSGPicTableName = 'MSGPicTableName';
export const PYQListTableName = 'PYQListTableName';
export const PYQListPicTableName = 'PYQListPicTableName';
export const PYQListTalkTableName = 'PYQListTalkTableName';
export const WXNewFriendTableName = 'WXNewFriendTableName';
export const WXQB_BankTableName = 'WXQB_BankTableName';
export const WXGroupMemberTableName = 'WXGroupMemberTableName';
export const WXHBLQListTableName = 'WXHBLQListTableName';

//微信会话列表
export const WXConversationSchema = {
    name: WXConversationTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        app: 'int',//1: wx 2: zfb 3: qq
        type: 'int',//1 单聊 2 群聊
        user_id: 'int?',
        df_user_id: 'int?',
        group_name: 'string?',//群聊名称
        group_count: 'int?',//群聊人数
        group_gonggao: 'string?',//群聊公告
        last_time: 'int?',
        last_type: 'string?',//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息 8:语音通话
    }
};

//微信群聊关系
export const WXGroupMemberSchema = {
    name: WXGroupMemberTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        group_id: 'int',//
        user_id: 'int?',//用户id
        user_name: 'string?',//名称
        avatar: 'string?',//用户头像

    }
};
//自己信息
const SelfTableNameSchema = {
    name: SelfTableName,
    properties: {
        id: 'int',
        user_name: 'string',
        avatar: 'string',
        account: {type:'string?',default: ''},
        wx_lq: {type:'float?',default:0},
        wx_lqt: {type:'float?',default:0},
    }
};
//支付宝
const ZFBUserTableNameSchema = {
    name: ZFBUserTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user_name: 'string',
        avatar: 'string',
        account:{type:'string?',default:'123456'},
        level:{type:'string?',default:'大众会员'},//1: 大众会员 2: 黄金会员 3:铂金会员 4:钻石会员
        zfb_ye: {type:'string?',default:'0.00'},
        zfb_yeb: {type:'string?',default:'0.00'},
        zfb_yeb_lx: {type:'string?',default:'0.00'},//余额宝利息
        yeb_zrsy: {type:'string?',default:'0.00'},//昨日收益
        yeb_ljsy: {type:'string?',default:'0.00'},//累计收益
        yeb_ll: {type:'string?',default:'0.00'},//利率
        zcc_lccp: {type:'string?',default:'0.00'},//总资产开始 理财产品
        zcc_lccp_lx: {type:'string?',default:'0.00'},//理财产品 利息
        zcc_jj: {type:'string?',default:'0.00'},//基金
        zcc_jj_lx: {type:'string?',default:'0.00'},//基金 利息
        zcc_hj: {type:'string?',default:'0.00'},//黄金
        zcc_hj_lx: {type:'string?',default:'0.00'},//黄金 利息
        zcc_ylb: {type:'string?',default:'0.00'},//余利宝
        zcc_ylb_lx: {type:'string?',default:'0.00'},//余利宝 利息
        lccp_sel: {type:'int?',default:1},//理财产品默认选中
        jj_sel: {type:'int?',default:1},//理财产品默认选中
        hj_sel: {type:'int?',default:1},//理财产品默认选中
        ylb_sel: {type:'int?',default:1},//理财产品默认选中

        zcc_huabei: {type:'string?',default:'0.00'},//花呗
        zcc_jiebei: {type:'string?',default:'0.00'},//借呗
        zcc_wangshangdai: {type:'string?',default:'0.00'},//网商贷
        zcc_beiyongjin: {type:'string?',default:'0.00'},//备用金
    }
};
//用户
const UsersSchema = {
    name: UsersTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user_name: 'string',
        avatar: 'string',
    }
};
//消息
export const WXMSGSchema = {
    name: MSGTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        c_id: 'int',//会话id
        send_id : 'int',
        type: 'int',//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息 8:语音通话 9:文件 10:连接
        user_name: 'string?',
        avatar: 'string?',
        text: 'string?',
        pic: 'string?',
        width : 'float?', //图片宽度
        height : 'float?', //图片高度
        isVertical: 'bool?',
        yuyin: 'string?',
        yuyintonghua: 'string?',
        shipin: 'string?',
        hongbaoText : 'string?',
        hongbaoMoney : 'string?',
        hongbaoCount : 'int?',
        totalhongbaoCount : 'int?',
        hongbaoTime : 'int?',
        zhuanzhangText : 'string?',
        zhuanzhangMoney : 'string?',
        xitongText:'string?',
        xitongTextType:'int?',//1:时间 2:红包 3:消息撤回 4:纯文字
        hongbaoSendName : 'string?', //红包发送人姓名
        hongbaoReceiveName : 'string?', //红包接收人姓名
        isReceived: 'bool?',
        received_id:'int?',
        fileName: {type:'string?',default:''},//文件名
        fileType: {type:'string?',default:''},//文件类型
        fileSize: {type:'string?',default:''},//文件大小
        urlIcon: {type:'string?',default:''},//连接图片
        urlTitle: {type:'string?',default:''},//连接标题
        urlContent: {type:'string?',default:''},//连接内容
        create_time: 'int?',//创建时间
    }
};
//红包领取人列表
export const WXHBLQListSchema = {
    name: WXHBLQListTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        msg_id: 'int?',//消息id
        index: 'int?',//消息id
        user_name : {type:'string?',default:''}, //用户名
        avatar : {type:'string?',default:''}, //头像
        money : {type:'string?',default:''}, //钱
        isBest: {type:'bool?',default:false},//是否手气最佳
        isLq: {type:'bool?',default:false},//是否已经领取
        lqTime : 'int?',//领取时间

    }
};
//图片信息
export const WXMSGPicSchema = {
    name: MSGPicTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        father_id: 'int',//消息id
        width : 'float?', //红包接收人姓名
        height : 'float?', //红包接收人姓名
        isVertical: 'bool?',

    }
};
//朋友消息
export const PYQListSchema = {
    name: PYQListTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user_name: 'string?',
        avatar: 'string?',
        text: 'string?',//文字
        time: 'string?',//时间
        dianzanText: 'string?',//点赞
        location: 'string?',//地点
    }
};
//朋友圈图片
export const PYQListPicSchema = {
    name: PYQListPicTableName,
    properties: {
        pyq_id: 'int',
        pic: 'string?',
        width: 'string?',//宽度
        height: 'string?',//高度
    }
};
//朋友圈消息
export const PYQListTalkSchema = {
    name: PYQListTalkTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        pyq_id: 'int',
        user_name: 'string?',
        father_name: 'string?',
        text: 'string?',
    }
};
//新的朋友
export const WXNewFriendSchema = {
    name: WXNewFriendTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user_name: 'string?',
        father_name: 'string?',
        text: 'string?',
    }
};

//朋友圈消息
export const WXQB_BankSchema = {
    name: WXQB_BankTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        bank_name: 'string?',
        bank_num: 'string?',
        bank_icon: 'string?',
    }
};
export const instance = new Realm({
    schema: [
        WXConversationSchema,
        UsersSchema,
        WXMSGSchema,
        SelfTableNameSchema,
        PYQListSchema,
        PYQListPicSchema,
        PYQListTalkSchema,
        WXNewFriendSchema,
        WXQB_BankSchema,
        WXGroupMemberSchema,
        ZFBUserTableNameSchema,
        WXHBLQListSchema,
        // WXMSGPicSchema
    ],
    deleteRealmIfMigrationNeeded: true,
    inMemory: false,
});


/***表使用区**/
export function writeToRealm(obj,tabName) {
    return new Promise((resolve, reject) => {
        instance.write(() => {
            instance.create(tabName, obj, true)
            resolve(true)
        })
    })
}

export function syncWriteToRealm(obj,tabName) {
    return new Promise((resolve, reject) => {
        instance.write(() => {
            instance.create(tabName, obj, true)
            resolve(true)
        })
    })
}


export function queryAllFromRealm(tabName) {
    return new Promise((resolve, reject) => {
        let obj = instance.objects(tabName);
        let data = [];
        for (const objectsKey in obj) {
            let model = obj[objectsKey];
            data.push(model);
        }
        resolve(data);
    })
}

export function queryFilterFromRealm(tabName,filter) {
    return new Promise((resolve, reject) => {
        let obj = instance.objects(tabName).filtered(filter);
        let data = [];
        for (const objectsKey in obj) {
            let model = obj[objectsKey];
            data.push(model);
        }
        resolve(data);
    })
}

export function clearAllFromRealm(tabName) {
    return new Promise((resolve, reject) => {
        instance.write(() => {
            let arrays = instance.objects(tabName);
            instance.delete(arrays);
            resolve(true)
        })
    })
}


export function clearRowFromRealm(id,tabName) {
    return new Promise((resolve, reject) => {
        instance.write(() => {
            let arrays = instance.objects(tabName);
            let row = arrays.filtered('id==' + id);
            instance.delete(row);
            resolve(true)
        })
    })
}
export function clearRowFromRealmFiltered(tabName,filter) {
    return new Promise((resolve, reject) => {
        instance.write(() => {
            let arrays = instance.objects(tabName);
            let row = arrays.filtered(filter);
            instance.delete(row);
            resolve(true)
        })
    })
}
