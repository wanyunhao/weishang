import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {XText} from "react-native-easy-app";
import {Colors, CommonStyles} from "../../../../common/storage/Const";
import MsgListCell from "./views/MsgListCell";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {isEmpty} from "../../../../common/utils/Utils";
import TitleAndSubCell from "../me/pay/views/TitleAndSubCell";
import {Notify} from "../../../../common/events/Notify";
import {MSGTableName, writeToRealm, WXConversationTableName} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";

export default class ChatSystemMsgScreen extends WXBaseVC {

    constructor() {
        super();
        this.state = {
            selectData:{
                content: '请选择系统消息',
                inputText: ''
            },
            userinfo: {
                user_name: '',
            },
            userinfo2: {
                user_name: '',
            },
            text: '',
            data: [
                {
                    type:1,
                    content: '以上是打招呼的内容'
                },
                {
                    type:2,
                    content: '你已添加了用户名，现在可以开始聊天了。',
                },
                {
                    type:1,
                    content: '如果陌生人主动加你朋友，请谨慎核实对方身份。'
                },
                {
                    type:1,
                    content: '消息已发出，但被对方拒收了。'
                },
                {
                    type:2,
                    content: '用户名开启了朋友验证，你还不是他(她)朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。',
                    content1: '发送朋友验证'
                },
                {
                    type:2,
                    content: '"用户名" 撤回了一条消息',
                },
                {
                    type:1,
                    content: '你撤回了一条消息',
                    content1: '重新编辑'
                },
                {
                    type:1,
                    content: '对方曾尝试与你进行语音聊天，但没有成功接通'
                },
                {
                    type:1,
                    content: '你拍了拍自己'
                },
                {
                    type:2,
                    content: '你拍了拍"用户名"',
                },
                {
                    type:2,
                    content: '"用户名"拍了拍你',
                },
                {
                    type:2,
                    content: '"用户名"拍了拍自己',
                },
            ],
            data1: [
                {
                    type:2,
                    content: '"用户名" 撤回了一条消息',
                },
                {
                    type:1,
                    content: '你撤回了一条消息',
                    content1: '重新编辑'
                },
                {
                    type:2,
                    content: '用户名发起了语音通话',
                },
                {
                    type:1,
                    content: '语音通话已经结束'
                },
                {
                    type:3,
                    content: '"用户名"修改群名为"群名称"。'
                },
                {
                    type:2,
                    content: '你将"用户名"移除了群聊',
                },
                {
                    type:2,
                    content: '你被"用户名"移除了群聊',
                },
                {
                    type:4,
                    content: '你修改群名为"群名称"',
                },
                {
                    type:5,
                    content: '"用户名1"邀请"用户名2"加入群聊',
                },
                {
                    type:5,
                    content: '你邀请"用户名1﹑用户名2"加入了群聊',
                    content1: '撤销'
                },
                {
                    type:5,
                    content: '"用户名1"邀请你和"用户名2"加入了群聊',
                    content1: '撤销'
                },
                {
                    type:2,
                    content: '你邀请"用户名"加入了群聊',
                    content1: '撤销'
                },
                {
                    type:5,
                    content: '"用户名1"通过扫描"用户名2"分享的二维码加入群聊',
                },
                {
                    type:1,
                    content: '群主已启用"群聊邀请确认"，群成员需群主确认才能邀请朋友进群'
                },
                {
                    type:1,
                    content: '群主已恢复默认进群方式'
                },
                {
                    type:1,
                    content: '群聊邀请已发送给群主，请等待群主确认。'
                },
                {
                    type:2,
                    content: '"用户名"已成为新群主'
                },
                {
                    type:1,
                    content: '当前群聊人数较多，已显示群成员昵称，你可在聊天信息页中将其关闭'
                },
                {
                    type:1,
                    content: '你拍了拍自己'
                },
                {
                    type:2,
                    content: '你拍了拍"用户名"',
                },
                {
                    type:2,
                    content: '"用户名"拍了拍你',
                },
                {
                    type:2,
                    content: '"用户名"拍了拍自己',
                },
            ]
        }
    }
    componentDidMount() {
        super.componentDidMount();
        if (this.props.route.params.data.type == 1) {
            this.setState({
                userinfo:this.props.route.params.data.userinfo
            })
        }
    }

    _addSubView() {
        const data = this.props.route.params.data;
        const isGroup = data.type == 2;
        let yulanText = '请选择系统消息'
        switch (this.state.selectData.type) {
            case 1:
                yulanText = this.state.selectData.content
                break;
            case 2:
                yulanText = this.state.selectData.content.replace('用户名',this.state.userinfo.user_name)
                break;
            case 3:
                yulanText = this.state.selectData.content.replace('用户名',this.state.userinfo.user_name)
                if (!isEmpty(this.state.selectData.inputText)) yulanText = yulanText.replace('群名称',this.state.selectData.inputText)
                break;
            case 4:
                yulanText = this.state.selectData.content
                if (!isEmpty(this.state.selectData.inputText)) yulanText = yulanText.replace('群名称',this.state.selectData.inputText)
                break;
            case 5:
                yulanText = this.state.selectData.content
                if (!isEmpty(this.state.userinfo.user_name)) yulanText = yulanText.replace('用户名1',this.state.userinfo.user_name)
                if (!isEmpty(this.state.userinfo2.user_name)) yulanText = yulanText.replace('用户名2',this.state.userinfo2.user_name)
                break;
        }
        this.yulanResult = yulanText
        return (
            <View style={[CommonStyles.container,{backgroundColor: '#7F7F7F'}]}>
                <WXNavigationBar title={'添加系统消息'} rightText={'完成'} clickRText={()=>{
                    const obj = {
                        id: getNow(),
                        c_id: data.id,//会话id
                        type: 7,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息 8:语音通话
                        send_id: parseInt(RNStorage.user_id),//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息 8:语音通话
                        xitongTextType: 4,//1:纯文字 2:红包 3:消息撤回 4:系统消息
                        xitongText: this.yulanResult,//1:纯文字 2:红包 3:消息撤回
                    }
                    writeToRealm(obj, MSGTableName).then(() => {
                        writeToRealm({
                            id: data.id,
                            last_time: getNow(),
                            last_type: this.yulanResult
                        }, WXConversationTableName).then((res) => {
                            navigation.goBack()
                            Notify.Refresh_conversation_list.sendEvent({});
                        })
                    })
                }}/>
                <View style={{padding:10,backgroundColor:Colors.white}}>
                    <Text>预览消息</Text>
                    <View style={{alignItems:'center',marginTop:10,padding:10,backgroundColor:'#e5e5e5',alignSelf:'center'}}>
                        <Text style={{alignSelf:'flex-start'}}>{yulanText}{isEmpty(this.state.selectData.content1) ? null : (<Text style={{color:'rgb(101,129,127)'}}>{this.state.selectData.content1}</Text>)}</Text>

                    </View>
                </View>

                {(this.state.selectData.type != 1) ? (
                    <View style={{marginTop:10,padding:10,backgroundColor:Colors.white}}>
                        {this.state.selectData.type != 4 ? (
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text>用户昵称</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text>
                                        {!isEmpty(this.state.userinfo.user_name) ? this.state.userinfo.user_name : '请选择'}
                                    </Text>
                                    <XText style={{backgroundColor:Colors.tabbar_select_color,marginLeft:10,lineHeight:30,borderRadius:4,paddingHorizontal:5}} text={isGroup? '选择群成员' : '不可修改'} onPress={()=>{
                                        if (isGroup) {
                                            navigation.push('GroupUserDelScreen', {
                                                fromChoose: true,
                                                group_id: data.id, refreshList: (item) => {
                                                    // {"avatar": "http://appossimg.91ylian.com/v_img/v556.jpg", "group_id": 1596619839597, "id": 15966198458141, "user_id": 159661984581401, "user_name": "平野"}
                                                    this.setState({
                                                        userinfo: item,
                                                    })
                                                }
                                            })
                                        }
                                    }}/>
                                </View>
                            </View>
                        ): null}
                        {this.state.selectData.type == 5 ? (
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:10}}>
                                <Text>用户昵称</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text>
                                        {!isEmpty(this.state.userinfo2.user_name) ? this.state.userinfo2.user_name : '请选择'}
                                    </Text>
                                    <XText style={{backgroundColor:Colors.tabbar_select_color,marginLeft:10,lineHeight:30,borderRadius:4,paddingHorizontal:5}} text={isGroup? '选择群成员' : '不可修改'} onPress={()=>{
                                        if (isGroup) {
                                            navigation.push('GroupUserDelScreen', {
                                                fromChoose: true,
                                                group_id: data.id, refreshList: (item) => {
                                                    // {"avatar": "http://appossimg.91ylian.com/v_img/v556.jpg", "group_id": 1596619839597, "id": 15966198458141, "user_id": 159661984581401, "user_name": "平野"}
                                                    this.setState({
                                                        userinfo2: item,
                                                    })
                                                }
                                            })
                                        }
                                    }}/>
                                </View>
                            </View>
                        ): null}
                        {this.state.selectData.type == 3 || this.state.selectData.type == 4 ? (
                            <TitleAndSubCell isEdit={true} title='编辑' sub_title={'请输入'} onChangeText={(text)=>{
                                let model = this.state.selectData
                                model.inputText = text
                                this.setState({
                                    selectData:model
                                })
                            }}/>
                        ): null}
                    </View>
                ): null}
                <FlatList
                    style={{backgroundColor:Colors.white,marginTop:10}}
                    data={isGroup ? this.state.data1:this.state.data}
                    keyExtractor={(item, index) => "list-item-" + index}
                    renderItem={({item, index}) => {
                        return (
                            <YHTouchableOpacity style={{padding:10}} onPress={()=>{
                                this.setState({
                                    selectData: item
                                })
                            }}>
                                <Text>{item.content + (!isEmpty(item.content1) ? item.content1 : '')}</Text>
                                <YHDividingLine/>
                            </YHTouchableOpacity>
                        )
                    }}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{padding:10}}>
                                <Text>选择快捷消息添加系统消息</Text>
                            </View>
                        )
                    }}
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
