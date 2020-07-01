import Realm from 'realm';

/***表定义区**/
export const WXConversationTableName = 'WXConversation';
export const SelfTableName = 'Self';
export const UsersTableName = 'Users';
export const MSGTableName = 'MSG';
export const PYQListTableName = 'PYQListTableName';
export const PYQListPicTableName = 'PYQListPicTableName';
export const PYQListTalkTableName = 'PYQListTalkTableName';

//微信会话列表
export const WXConversationSchema = {
    name: WXConversationTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user_id: 'int',
        df_user_id: 'int',
        last_time: 'string?',
        last_type: 'string?',
    }
};

//自己信息
const SelfTableNameSchema = {
    name: SelfTableName,
    properties: {
        id: 'int',
        user_name: 'string',
        avatar: 'string',
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
        type: 'int',//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
        user_name: 'string?',
        avatar: 'string?',
        text: 'string?',
        pic: 'string?',
        yuyin: 'string?',
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

export const instance = new Realm({
    schema: [
        WXConversationSchema,
        UsersSchema,
        WXMSGSchema,
        SelfTableNameSchema,
        PYQListSchema,
        PYQListPicSchema,
        PYQListTalkSchema
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
