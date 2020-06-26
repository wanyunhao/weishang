import Realm from 'realm';

/***表定义区**/
export const WXConversationTableName = 'WXConversation';
export const SelfTableName = 'Self';
export const UsersTableName = 'Users';
export const MSGTableName = 'MSG';

//微信会话列表
export const WXConversationSchema = {
    name: WXConversationTableName,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user_id: 'int',
        df_user_id: 'int',
        msgs: {type: 'list', objectType: MSGTableName},
    }
};

//自己信息
const SelfTableNameSchema = {
    name: SelfTableName,
    properties: {
        user_id: 'int',
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
        other : 'bool',
        type: 'int',//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账
        user_name: 'string?',
        avatar: 'string?',
        text: 'string?',
        pic: 'string?',
        yuyin: 'string?',
        shipin: 'string?',
        hongbao : 'string?',
        zhuanzhang: 'string?',

    }
};

export const instance = new Realm({
    schema: [
        WXConversationSchema,
        UsersSchema,
        WXMSGSchema,
        SelfTableNameSchema,
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
        let objStr = JSON.stringify(obj);
        resolve(JSON.parse(objStr))
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
