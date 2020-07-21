import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import BaseVC from "../../zfb/Common/BaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors, Const} from "../../../../common/storage/Const";
import {XImage, XView} from "react-native-easy-app";
import TitleAndSubCell from "../me/pay/views/TitleAndSubCell";
import {getPeople, showModalPrompt} from "../../../../compoments/YHUtils";
import {deepClone, isEmpty} from "../../../../common/utils/Utils";
import {
    instance,
    PYQListTableName,
    queryFilterFromRealm, UsersTableName,
    writeToRealm, WXConversationTableName,
    WXGroupMemberTableName
} from "../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {Notify} from "../../../../common/events/Notify";
import {getNow} from "../../../../common/utils/DateUtils";
import {showMsg} from "react-native-debug-tool/lib/utils/DebugUtils";

export default class GroupSetScreen extends BaseVC {
    constructor() {
        super();
        this.op_items = [
            {
                user_name: '通讯录添加', avatar: require('../../../resource/index/chat/group_tel.png'), onPress: () => {
                    navigation.push('ContactScreen', {
                        fromChoose: true, chooseItem: (item) => {
                            let p_id = getNow();
                            writeToRealm({
                                id: p_id,
                                group_id: this.state.data.id,//
                                user_id: parseInt(item.id),//用户id
                                user_name: item.nick,//名称
                                avatar: item.icon,//用户头像
                            }, WXGroupMemberTableName).then(() => {
                                Notify.Refresh_conversation_list.sendEvent({})
                                this._requestData();
                            })
                        }
                    })

                }
            },
            {
                user_name: '自动获取', avatar: require('../../../resource/index/chat/group_auto.png'), onPress: () => {
                    showModalPrompt('添加人数', '', (text) => {
                        if (!isEmpty(text) && parseInt(text) > 0) {
                            let p_id = getNow();
                            getPeople(text, (data) => {
                                for (const dataKey in data) {
                                    let model = data[dataKey];
                                    writeToRealm({
                                        id: parseInt(p_id + dataKey),
                                        group_id: this.state.data.id,//
                                        user_id: parseInt((p_id * 10 + dataKey) + ""),//用户id
                                        user_name: model.name,//名称
                                        avatar: model.img,//用户头像

                                    }, WXGroupMemberTableName).then(() => {
                                        Notify.Refresh_conversation_list.sendEvent({})
                                        this._requestData();
                                    })
                                }
                            })
                        }
                    }, '请输入个数')
                }
            },
            {
                user_name: '删除成员', avatar: require('../../../resource/index/chat/gourp_del.png'), onPress: () => {
                    navigation.push('GroupUserDelScreen', {
                        group_id: parseInt(this.p_id), refreshList: () => {
                            this._requestData()
                            Notify.Refresh_conversation_list.sendEvent({})
                        }
                    })
                }
            },
        ]
        this.state = {
            data: {
                members: []
            },
            group_name: '',
            group_count: '',
        }
    }

    componentDidMount() {
        this._setPlaceViewBackgroundColor(Colors.white)
        this._setBarStyle(2);
        this._requestData();
        this.p_id = deepClone(this.props.route.params.c_id);
    }

    _requestData() {
        queryFilterFromRealm(WXConversationTableName, 'id=' + this.props.route.params.c_id).then(data => {
            queryFilterFromRealm(WXGroupMemberTableName, 'group_id=' + this.props.route.params.c_id).then((data1) => {
                let model = data[0];
                model.members = data1;
                this.setState({
                    data: model,
                    group_name: model.group_name + "",
                    group_count: model.group_count + "",
                })
            })
        })
    }

    _addSubView() {
        const itemW = (Const.screenWidth - 110) / 5 - 1;
        const itemss = this.state.data.members.concat(this.op_items)
        // console.log(itemss.length);
        return (
            <>
                <WXNavigationBar title='群组设置' rightText='完成' nav_bg_color={Colors.white} noLine clickRText={() => {
                    if (parseInt(this.state.group_count) >500) {
                        showMsg('最多500人')
                        return;
                    }
                    if (parseInt(this.state.group_count) <1) {
                        showMsg('最少1人')
                        return;
                    }
                    writeToRealm({
                        id:this.props.route.params.c_id,
                        group_name:this.state.group_name,
                        group_count:parseInt(this.state.group_count),
                    },WXConversationTableName).then(()=>{
                        Notify.Refresh_conversation_list.sendEvent({})
                        navigation.goBack();
                    })
                }}/>
                <ScrollView style={{backgroundColor: '#EDEDED'}}>
                    <View style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        backgroundColor: Colors.white,
                        paddingBottom: 15
                    }}>
                        {itemss.map((value, index) => {
                            return (
                                <XView onPress={value.onPress != null ? value.onPress : () => {
                                }} style={{
                                    alignItems: 'center',
                                    marginLeft: index % 5 == 0 ? 0 : 20,
                                    marginTop: index > 4 ? 10 : 0
                                }}>
                                    <XImage style={{borderRadius: 4}}
                                            icon={value.avatar} iconSize={itemW}/>
                                    <Text style={{
                                        color: Colors.gray_text_color,
                                        marginTop: 3,
                                        fontSize: 12,
                                        maxWidth: itemW,
                                        maxHeight: 14
                                    }}>{value.user_name}</Text>
                                </XView>
                            )
                        })}
                    </View>

                    <TitleAndSubCell
                        viewStyle={{marginTop: 10,}}
                        isEdit={true} title='群聊名称'
                        sub_title={this.state.group_name}
                        value={this.state.group_name}
                        onChangeText={(text) => {
                            this.setState({
                                group_name: text
                            })
                        }}/>
                    <TitleAndSubCell
                        isEdit={true} title='群聊人数(显示人数)'
                        sub_title={this.state.group_count}
                        value={this.state.group_count}
                        onChangeText={(text) => {
                            this.setState({
                                group_count: text
                            })
                        }}/>
                    <TitleAndSubCell
                        viewStyle={{marginTop: 10,}}
                        title='置顶聊天'
                    />
                    <TitleAndSubCell
                        title='消息免打扰'
                    />
                    <TitleAndSubCell
                        title='听筒播放'
                    />
                    <TitleAndSubCell
                        title='是否显示群昵称'
                    />
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
