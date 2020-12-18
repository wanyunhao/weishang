import React from "react";
import {Dimensions, StyleSheet, View, DeviceEventEmitter, FlatList, Alert} from "react-native";
import {XFlatList, XImage, XText, XView} from "react-native-easy-app";
import MsgListCell from "./views/MsgListCell";
import {Colors, Const, ImageRes} from "../../../../common/storage/Const";
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
import {RNStorage} from "../../../../common/storage/AppStorage";
import QQBaseVC from "../../zfb/Common/QQBaseVC";
import {QQNavigationBar} from "../../../../common/widgets/QQNavigation";

const {width} = Dimensions.get("window");
const Realm = require('realm');
export default class ConversationScreen extends QQBaseVC {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.requestData();
        this._setTopSafeView(true);
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
                    <XView style={{flexDirection:'row',alignItems:'center',height:INSETS.top + 44,justifyContent:'space-between',paddingHorizontal:16,paddingTop:INSETS.top}}>
                        <XImage resizeMode={'cover'} icon={require('../../../../classes/resource/qq/qq_nav_bg.png')} iconSize={Const.screenWidth} style={{position:'absolute',width:Const.screenWidth,height:INSETS.top + 44}}/>
                        <XView style={{flexDirection:'row', alignItems:'center'}}>
                            <XImage icon={require('../../../resource/images/avatar.png')} iconSize={32}/>
                            <View style={{marginLeft:10.5}}>
                                <XText text={'翻滚'} style={{fontSize:17,color:'white'}}/>
                                <XText text={'iPhone XS在线 '} style={{fontSize:10,color:'white'}}/>
                            </View>
                        </XView>
                        <XView style={[{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }]}>
                            <XImage style={{
                                right: 0,
                                width: 45,
                                height: '100%',
                                paddingLeft: 8,
                                position: 'absolute',
                            }} icon={require('../../../../classes/resource/qq/ic_qq_more.png')} iconSize={24} onPress={() => {
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
                                                        app: 3,//qq
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
                                                    app: 3,//1 单聊 2 群聊
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
                            <XImage style={{
                                right: 45,
                                width: 45,
                                height: '100%',
                                paddingLeft: 8,
                                position: 'absolute',
                            }} icon={require('../../../../classes/resource/qq/ic_qq_camera.png')} iconSize={24} onPress={() => {

                            }}/>
                        </XView>
                    </XView>
                    <FlatList data={this.state.data}
                              style={{backgroundColor: Colors.white}}
                              ListHeaderComponent={() => {
                                  return this._renderHeader();
                              }}
                              renderItem={({item, index}) => <MsgListCell data={item} itemClick={() => {
                                  navigation.push('QQChattingScreen', {c_id: item.id});
                              }}/>}
                    />
                </View>
        );
    }

    _renderHeader() {
        return (
            <View style={{paddingVertical:11.5,paddingHorizontal:15.5}}>
                <XImage resizeMode={'cover'} icon={require('../../../resource/qq/home_search.png')} style={{width:'100%',height:36}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
