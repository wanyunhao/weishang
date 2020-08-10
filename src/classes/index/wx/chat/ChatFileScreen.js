import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {MSGTableName, writeToRealm, WXConversationTableName} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {Notify} from "../../../../common/events/Notify";
import {Colors} from "../../../../common/storage/Const";
import {isEmpty} from "../../../../common/utils/Utils";
import {XImage, XView} from "react-native-easy-app";
import TitleAndSubCell from "../me/pay/views/TitleAndSubCell";
import {showToast} from "../../../../common/widgets/Loading";

export default class ChatFileScreen extends WXBaseVC {
    constructor() {
        super();
        this.state = {
            fileName: '',
            fileType: '.txt',
            fileIndex: 0,
            fileSize: '50M',
            select: 2,
            df_user_info: {avatar: '', user_name: ''},
        }
        this.mapList = [
            {
                title:'.txt',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.ppt',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.pptx',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.doc',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.docx',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.xls',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.xlsx',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.zip',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.rar',
                img:require('../../../resource/images/avatar.png')
            },
            {
                title:'.pdf',
                img:require('../../../resource/images/avatar.png')
            },
        ]
    }

    componentDidMount() {
        super.componentDidMount();
        this.c_id = this.props.route.params.c_id;
        this.setState({
            df_user_info: this.props.route.params.df_user_info,
        })
    }

    chooseFileType(index) {
        this.setState({

            fileType: this.mapList[index].title,
            fileIndex: index,
        })
    }
    _addSubView() {

        const data = this.props.route.params.data;
        const isGroup = data.type == 2;
        return (
            <View>
                <WXNavigationBar title={'发送文件'} rightText={'完成'} clickRText={()=>{
                    if (isEmpty(this.state.fileName)) {
                        showToast('请输入文件名')
                        return
                    }
                    if (isEmpty(this.state.fileType)) {
                        showToast('请选择文件类型')
                        return
                    }
                    if (isEmpty(this.state.fileSize)) {
                        showToast('请输入文件大小')
                        return
                    }
                    writeToRealm({
                        id: getNow(),
                        c_id: data.id,//会话id
                        type: 9,//9: 发送文件
                        send_id: this.state.select == 2 ? parseInt(RNStorage.user_id) : isGroup? parseInt(this.state.df_user_info.user_id) : parseInt(this.state.df_user_info.id),
                        fileName: this.state.fileName,//文件名
                        fileType: this.state.fileType,//文件类型
                        fileSize: this.state.fileSize,//文件大小
                    }, MSGTableName).then(() => {
                        writeToRealm({
                            id: data.id,
                            last_time: getNow(),
                            last_type: '[文件]'
                        }, WXConversationTableName).then((res) => {
                            navigation.goBack()
                            Notify.Refresh_conversation_list.sendEvent({});
                        })
                    })
                }}/>
                <View style={{padding:10,backgroundColor:Colors.white}}>
                    <Text>预览消息</Text>
                    <View style={{marginTop:10,padding:10,borderRadius:5,borderWidth:0.5,alignSelf:'center', flexDirection:'row',alignItems:'flex-end'}}>
                        <XImage icon={require('../../../resource/images/avatar.png')} iconSize={50}/>
                        <View style={{marginLeft:20,marginRight:20,height:50,justifyContent:'space-between'}}>
                            <Text>{this.state.fileName + this.state.fileType}</Text>
                            <Text style={{color:'#e5e5e5',fontSize:12}}>{this.state.fileSize}</Text>
                        </View>
                        <Text style={{color:'#e5e5e5',fontSize:14}}>已发送</Text>
                    </View>
                </View>
                <View style={{padding:15,backgroundColor:Colors.white,marginTop:10}}>
                    <Text>文件类型</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>

                    {this.mapList.map((value, index) => {
                        if (index > 4) return null
                        return (
                            <XView onPress={()=>{
                                this.chooseFileType(index)
                            }} style={{alignItems:'center',marginTop:10}}>
                                <XImage icon={value.img} iconSize={40}/>
                                <Text>{value.title}</Text>
                            </XView>
                        )
                    })}

                    </View>
                    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>

                    {this.mapList.map((value, index) => {
                        if (index < 5) return null
                        return (
                            <XView onPress={()=>{
                                this.chooseFileType(index)
                            }} style={{alignItems:'center',marginTop:10}}>
                                <XImage icon={value.img} iconSize={40}/>
                                <Text>{value.title}</Text>
                            </XView>
                        )
                    })}

                    </View>
                </View>
                <TitleAndSubCell isEdit={true} title={'文件名称'} sub_title='请输入'
                                 viewStyle={{marginTop: 10,}}
                                 value={this.state.fileName} onChangeText={(text) => {
                    this.setState({
                        fileName: text
                    })
                }}/>
                <TitleAndSubCell isEdit={true} title={'文件大小'} sub_title='请输入'
                                 viewStyle={{marginTop: 10,}}
                                 keyboardType="numeric" value={this.state.fileSize} onChangeText={(text) => {
                    this.setState({
                        fileSize: text
                    })
                }}/>
                <View style={{paddingHorizontal: 15, backgroundColor: Colors.white}}>
                    <Text style={{marginTop: 10,}}>选择发送人</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10,}}>
                            <XView onPress={() => {
                                if (isGroup) {
                                    navigation.push('GroupUserDelScreen', {
                                        fromChoose: true,
                                        group_id: data.id, refreshList: (item) => {
                                            this.setState({
                                                df_user_info: item,
                                                select:1,
                                            })
                                        }
                                    })
                                }
                            }}>
                                <XImage
                                    icon={isEmpty(this.state.df_user_info) ? require('../../../resource/common/add_user.png') : this.state.df_user_info.avatar}
                                    iconSize={35}/>
                                <Text style={{
                                    fontSize: 12,
                                    marginTop: 3
                                }}>{isEmpty(this.state.df_user_info) ? '请选择' : this.state.df_user_info.user_name}</Text>
                            </XView>
                            <XImage style={{marginLeft: 5,}}
                                    icon={this.state.select == 1 ? require('../../../resource/index/chat/hb_send_select.png') : require('../../../resource/index/chat/hb_send_normal.png')}
                                    iconSize={18} onPress={() => {
                                this.setState({
                                    select: 1,
                                })
                            }}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10,}}>

                            <XImage style={{marginRight: 5,}}
                                    icon={this.state.select == 2 ? require('../../../resource/index/chat/hb_send_select.png') : require('../../../resource/index/chat/hb_send_normal.png')}
                                    iconSize={18} onPress={() => {
                                this.setState({
                                    select: 2,
                                })
                            }}/>
                            <View>
                                <XImage icon={RNStorage.avatarUrl} iconSize={35}/>
                                <Text style={{fontSize: 12, marginTop: 3}}>自己发</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
