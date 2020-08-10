import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {
    MSGTableName,
    writeToRealm,
    WXConversationTableName,
    WXGroupMemberTableName
} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {Notify} from "../../../../common/events/Notify";
import {Colors} from "../../../../common/storage/Const";
import {isEmpty} from "../../../../common/utils/Utils";
import {XImage, XView} from "react-native-easy-app";
import TitleAndSubCell from "../me/pay/views/TitleAndSubCell";
import {showToast} from "../../../../common/widgets/Loading";
import SyanImagePicker from "react-native-syan-image-picker";
import {Input} from "teaset";
import {ConfirmCancelView, TwoInputView} from "./views/NewPersonView";
import {showOverlayModal} from "../../../../compoments/YHUtils";
import Overlay from "teaset/components/Overlay/Overlay";

export default class ChatUrlScreen extends WXBaseVC {
    constructor() {
        super();
        this.state = {
            urlIcon: require('../../../resource/index/wx/fx/fb_add.png'),
            urlTitle: '',
            urlContent: '',
            select: 2,
            df_user_info: {avatar: '', user_name: ''},
        }
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
                <WXNavigationBar title={'添加连接'} rightText={'完成'} clickRText={()=>{
                    if (isEmpty(this.state.urlIcon)) {
                        showToast('请选择图片')
                        return
                    }
                    if (isEmpty(this.state.urlTitle)) {
                        showToast('请输入标题')
                        return
                    }
                    if (isEmpty(this.state.fileSize)) {
                        showToast('请输入内容')
                        return
                    }
                    writeToRealm({
                        id: getNow(),
                        c_id: data.id,//会话id
                        type: 10,//9: 发送文件
                        send_id: this.state.select == 2 ? parseInt(RNStorage.user_id) : isGroup? parseInt(this.state.df_user_info.user_id) : parseInt(this.state.df_user_info.id),
                        urlIcon: this.state.urlIcon,
                        urlTitle: this.state.urlTitle,
                        urlContent: this.state.urlContent,
                    }, MSGTableName).then(() => {
                        writeToRealm({
                            id: data.id,
                            last_time: getNow(),
                            last_type: '[连接]' + this.state.urlTitle
                        }, WXConversationTableName).then((res) => {
                            navigation.goBack()
                            Notify.Refresh_conversation_list.sendEvent({});
                        })
                    })
                }}/>

                <View style={{flexDirection:'row',paddingHorizontal:15,paddingVertical:10,alignItems:'center',backgroundColor:Colors.white,marginTop:10}}>
                    <XImage icon={this.state.urlIcon} iconSize={60} onPress={()=>{
                        SyanImagePicker.showImagePicker({
                            imageCount: 1,
                            isCrop: true,
                            allowPickingOriginalPhoto: false,
                            isCamera: false,
                            enableBase64: true
                        }, (err, selectedPhotos) => {
                            if (err) {
                                // 取消选择
                                return;
                            }
                            // 选择成功，渲染图片
                            // ...
                            this.setState({
                                urlIcon: selectedPhotos[0].base64
                            })
                        })
                    }}/>
                    <XView style={{marginLeft:10}} onPress={()=>{
                        const key = showOverlayModal('zoomOut', true, <TwoInputView cancelClick={() => {
                            Overlay.hide(key);
                        }} confirmClick={(value) => {

                            // let pra_id = getNow();
                            // writeToRealm({
                            //     id: pra_id,
                            //     type: 2,//1 单聊 2 群聊
                            //     group_name:value.group_name,
                            //     group_count:parseInt(value.group_count),
                            //     user_id:parseInt(RNStorage.user_id),
                            //     last_time:pra_id,
                            // },WXConversationTableName).then((res)=>{
                            //     writeToRealm({
                            //         id: pra_id,
                            //         group_id: pra_id,//
                            //         user_id: parseInt(RNStorage.user_id),//用户id
                            //         user_name: RNStorage.user_name,//名称
                            //         avatar: RNStorage.avatarUrl,//用户头像
                            //
                            //     },WXGroupMemberTableName).then(()=>{
                            //         navigation.push('ChattingScreen',{c_id:pra_id});//1594277045186,
                            //         Notify.Refresh_conversation_list.sendEvent({})
                            //     })
                            // })
                            Overlay.hide(key);
                        }}/>);
                    }}>
                        <Text>标题</Text>
                        <Text>内容</Text>
                    </XView>
                </View>
                <View style={{paddingHorizontal: 15, backgroundColor: Colors.white,marginTop:10}}>
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


export class URLInputView extends Component {

    constructor() {
        super();
        this.state = {
            first:'',
            second:''
        }
    }

    render() {
        return (
            <View style={{ alignItems: 'center', marginTop: 10,height:180,}}>
                <Input
                    style={{width: 200, marginTop: 10,}}
                    size='md'
                    value={this.state.first}
                    placeholder='请输入'
                    onChangeText={text => this.setState({first: text})}
                />
                <Input
                    style={{width: 200, marginTop: 10,}}
                    size='md'
                    value={this.state.second}
                    placeholder='请输入'
                    onChangeText={text => this.setState({second: text})}
                />

                <ConfirmCancelView cancelClick={this.props.cancelClick} confirmClick={()=>{
                    if (isEmpty(this.state.first)) {
                        showToast('请输入');
                        return
                    }
                    if (isEmpty(this.state.second)) {
                        showToast('请输入');
                        return
                    }
                    const obj = {first: this.state.first, second: this.state.second};
                    this.props.confirmClick(obj)
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
