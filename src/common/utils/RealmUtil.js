import Realm from 'realm';

/***表定义区**/
export const WXConversationTableName = 'WXConversation';
export const SelfTableName = 'Self';
export const UsersTableName = 'Users';
export const MSGTableName = 'MSG';
export const MSGPicTableName = 'MSGPicTableName';
export const PYQListTableName = 'PYQListTableName';
export const PYQListPicTableName = 'PYQListPicTableName';
export const PYQListTalkTableName = 'PYQListTalkTableName';
export const WXNewFriendTableName = 'WXNewFriendTableName';
export const WXQB_BankTableName = 'WXQB_BankTableName';
export const WXGroupMemberTableName = 'WXGroupMemberTableName';

//微信会话列表
export const WXConversationSchema = {
    name: WXConversationTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
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
        wx_lq: {type:'float?',default:0},
        wx_lqt: {type:'float?',default:0},
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
        type: 'int',//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息 8:语音通话
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
        hongbaoTime : 'int?',
        zhuanzhangText : 'string?',
        zhuanzhangMoney : 'string?',
        xitongText:'string?',
        xitongTextType:'int?',//1:纯文字 2:红包
        hongbaoSendName : 'string?', //红包发送人姓名
        hongbaoReceiveName : 'string?', //红包接收人姓名
        isReceived: 'bool?',
        received_id:'int?',
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
