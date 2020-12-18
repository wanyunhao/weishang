import React from "react";
import {Dimensions, StyleSheet, View, DeviceEventEmitter, FlatList, Alert} from "react-native";
import {XFlatList} from "react-native-easy-app";
import MsgListCell from "./views/MsgListCell";
import {Colors} from "../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {
    clearAllFromRealm,
    clearRowFromRealmFiltered,
    instance, MSGTableName, PYQListTableName, PYQListTalkTableName,
    queryFilterFromRealm,
    UsersTableName, writeToRealm,
    WXConversationTableName, WXGroupMemberTableName
} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import BaseVC from "../../zfb/Common/BaseVC";
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {Notify} from "../../../../common/events/Notify";
import {getPeople, showModalOperation, showModalPrompt, showOverlayModal} from "../../../../compoments/YHUtils";
import NewPersonView, {TwoInputView} from "./views/NewPersonView";
import Overlay from "teaset/components/Overlay/Overlay";
import {isEmpty} from "../../../../common/utils/Utils";
import {Provider} from "@ant-design/react-native";
import {RNStorage} from "../../../../common/storage/AppStorage";

const {width} = Dimensions.get("window");
const Realm = require('realm');
export default class ConversationScreen extends WXBaseVC {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.requestData();
        Notify.Refresh_conversation_list.register(this.refreshList);
    }

    componentWillUnmount() {
        Notify.Refresh_conversation_list.unRegister(this.refreshList);
    }

    refreshList = () => {
        this.requestData();
    };

    requestData() {
        this.realm = instance;
        var objects = this.realm.objects(WXConversationTableName).sorted('last_time', true);
        var data = [];
        this.setState({
            data: [],
        })
        for (const objectsKey in objects) {
            let model = objects[objectsKey];
            if (model.type == 1) {
                queryFilterFromRealm(UsersTableName, 'id=' + model.df_user_id).then((user) => {
                    if (user != null) {
                        model.userinfo = user[0];
                    }
                    data.push(model);
                    this.setState({
                        data: data,
                    })
                })
            } else {
                queryFilterFromRealm(WXGroupMemberTableName,'group_id=' + model.id).then((res)=>{
                    model.group_info = res;
                    data.push(model);
                    this.setState({
                        data: data,
                    })
                })
            }

        }
    }

    _addSubView() {
        //wx_icon_search wx_icon_add
        return (
                <View style={styles.container}>

                    <WXNavigationBar
                        rightImage2={require('../../../resource/index/wx_icon_search.png')}
                        rightImage={require('../../../resource/index/wx_icon_add.png')}
                        title='微信' hideBack={true} clickRImage={() => {
                        let items = [
                            {
                                text: '创建单聊', onPress: () => {
                                    const key = showOverlayModal('zoomOut', true, <NewPersonView cancelClick={() => {
                                        Overlay.hide(key);
                                    }} confirmClick={(value) => {

                                        let pra_id = getNow();
                                        writeToRealm({
                                            id: pra_id,
                                            user_name: value.name,
                                            avatar: value.icon,
                                        }, UsersTableName).then((res) => {
                                            writeToRealm({
                                                id: pra_id,
                                                app: 1,//1 单聊 2 群聊
                                                type: 1,//1 单聊 2 群聊
                                                user_id: parseInt(RNStorage.user_id),
                                                df_user_id: pra_id,
                                                last_time:pra_id,
                                            },WXConversationTableName).then((res)=>{
                                                navigation.push('ChattingScreen',{c_id:pra_id});//1594277045186,
                                                Notify.Refresh_conversation_list.sendEvent({})
                                            })
                                        })
                                        Overlay.hide(key);
                                    }}/>);
                                }
                            },
                            {
                                text: '创建群聊', onPress: () => {
                                    const key = showOverlayModal('zoomOut', true, <TwoInputView cancelClick={() => {
                                        Overlay.hide(key);
                                    }} confirmClick={(value) => {

                                        let pra_id = getNow();
                                        writeToRealm({
                                            id: pra_id,
                                            app: 1,//1 单聊 2 群聊
                                            type: 2,//1 单聊 2 群聊
                                            group_name:value.group_name,
                                            group_count:parseInt(value.group_count),
                                            user_id:parseInt(RNStorage.user_id),
                                            last_time:pra_id,
                                        },WXConversationTableName).then((res)=>{
                                            writeToRealm({
                                                id: pra_id,
                                                group_id: pra_id,//
                                                user_id: parseInt(RNStorage.user_id),//用户id
                                                user_name: RNStorage.user_name,//名称
                                                avatar: RNStorage.avatarUrl,//用户头像

                                            },WXGroupMemberTableName).then(()=>{
                                                navigation.push('ChattingScreen',{c_id:pra_id});//1594277045186,
                                                Notify.Refresh_conversation_list.sendEvent({})
                                            })
                                        })
                                        Overlay.hide(key);
                                    }}/>);
                                }
                            },
                            {
                                text: '通讯录选择好友聊天', onPress: () => {
                                    navigation.push('ContactScreen',{fromChoose:true,chooseItem:(item)=>{
                                            queryFilterFromRealm(WXConversationTableName,'df_user_id=' + item.id).then((res)=>{
                                                if (isEmpty(res)) {
                                                    let pra_id = getNow();
                                                    writeToRealm({
                                                        id: pra_id,
                                                        app: 1,//1 单聊 2 群聊
                                                        type: 1,//1 单聊 2 群聊
                                                        user_id: parseInt(RNStorage.user_id),
                                                        df_user_id: item.id,
                                                        last_time:pra_id,
                                                    },WXConversationTableName).then((res)=>{
                                                        navigation.push('ChattingScreen',{c_id:pra_id});//1594277045186,
                                                        Notify.Refresh_conversation_list.sendEvent({})
                                                    })
                                                } else {
                                                    navigation.push('ChattingScreen',{c_id:res[0].id});//1594277045186,
                                                }
                                            })
                                        }})
                                }
                            },
                            {
                                text: '清空聊天列表', onPress: () => {
                                    clearAllFromRealm(WXConversationTableName).then(()=>{
                                        this.requestData();
                                        clearAllFromRealm(MSGTableName)
                                    })
                                }
                            },
                            {
                                text: '退出小微', onPress: () => {
                                    navigation.goBack();
                                }
                            },
                        ];
                        showModalOperation(items);

                    }}/>

                    <FlatList data={this.state.data}
                              style={{backgroundColor: Colors.white}}
                              renderItem={({item, index}) => <MsgListCell data={item} itemClick={() => {
                                  navigation.push('ChattingScreen', {c_id: item.id});
                              }}/>}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
