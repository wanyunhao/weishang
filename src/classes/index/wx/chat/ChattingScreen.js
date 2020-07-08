import React, {Component} from "react";
import Global from "../../../../common/utils/Global";
import {Dimensions, Keyboard, PixelRatio, StyleSheet, View, StatusBar} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import HongBaoCell from "./views/HongBaoCell";
import {Colors, Const} from "../../../../common/storage/Const";
import MsgListCell from "./views/MsgListCell";
import {XFlatList, XText} from "react-native-easy-app";
import ChatListCell from "./views/ChatListCell";
import ChatZhuanZhangListCell from "./views/ChatZhuanZhangListCell";
import ChatBottomBar from "../../../../views/ChatBottomBar";
import ChatBottomBarView from "./views/ChatBottomBarView";
import MoreView from "../../../../views/MoreView";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {
    instance, MSGPicTableName,
    MSGTableName,
    queryFilterFromRealm,
    SelfTableName,
    UsersTableName, writeToRealm
} from "../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {deepClone, isEmpty} from "../../../../common/utils/Utils";
import YHHongBaoPopView from "./views/YHHongBaoPopView";
import {Button, Label, Overlay, Theme, Wheel} from "teaset";
import HBDetailScreen from "./views/HBDetailScreen";
import {getNow} from "../../../../common/utils/DateUtils";
import MsgSystemCell from "./views/MsgSystemCell";
import ZhuanZhangDetailScreen from "./views/ZhuanZhangDetailScreen";
import SliderAntm from "@ant-design/react-native/es/slider";
import SliderView from "./views/SliderView";
import ChatYuyinCell from "./views/ChatYuyinCell";
import {showActionSheet} from "../../../../compoments/YHUtils";
import Wheel3View from "./views/Wheel3View";
import ChatTonghHuaCell from "./views/ChatTonghHuaCell";
import ImagePicker from "react-native-image-picker";
import ChatPicCell from "./views/ChatPicCell";
import EmojiView from "./views/EmojiView";
import {showToast} from "../../../../common/widgets/Loading";
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import BaseVC from "../../zfb/Common/BaseVC";


export default class ChattingScreen extends WXBaseVC {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            showHongbao: false,
            showEmojiView: false,
            showMoreView: false,
            c_data: {},
            data: [],
            silderValue: 30,
            inputType:1,// 1:文字 2:表情 3:更多
            inputBottom:220,// 1:文字 2:表情 3:更多
            kebordHeight: 0,
            emoji:'',
            senderId: RNStorage.user_id,
        };
    }

    // componentDidMount() {
    //     // super.componentDidMount();
    //     this.setState({
    //         c_data: this.props.route.params.data
    //     }, () => {
    //         this.queryChat();
    //         console.log(this.state.c_data);
    //     })
    // }
    componentDidMount() {
        super.componentDidMount();
        this.setState({
            c_data: this.props.route.params.data
        }, () => {
            this.queryChat();
        })
    }


    queryChat() {
        queryFilterFromRealm(MSGTableName, 'c_id=' + this.state.c_data.id).then((data) => {
            let dataArray = [];
            for (const dataKey in data) {
                let model = data[dataKey];
                queryFilterFromRealm(model.send_id == RNStorage.user_id ? SelfTableName : UsersTableName, 'id=' + model.send_id).then((data1) => {
                    if (!isEmpty(data1)) {
                        model.userinfo = data1[0];
                        dataArray.push(model);
                        this.setState({
                            data: dataArray
                        })
                    }

                })
            }
        });
    }

    // componentWillMount() {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    // }
    //
    // _keyboardDidShow(frames) {
    //     let keyboardSpace = frames.endCoordinates.height;//获取键盘高度
    //     this.setState({
    //         kebordHeight: keyboardSpace
    //     })
    // }
    //
    // componentWillUnmount() {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    handleClick(index) {
        switch (index) {
            case 0:
                this.chooseImage(0);
                break;
            case 1:
                this.chooseImage(1);
                break;
            case 2:
                // this.showEdit('zoomOut', false, 'Pop zoom out');
                showActionSheet([
                    {
                        title: '语音通话', onPress: () => {
                            this.showTime('bottom', false, 'Pull from bottom',8)
                        }
                    },
                    {
                        title: '视频通话', onPress: () => {
                            this.showTime('bottom', false, 'Pull from bottom',4)
                        }
                    },
                ])
                break;
            case 4:
                this.sendHB(1);
                break;
            case 5:
                this.sendHB(2);
                break;
            case 6:
                this.showEdit('zoomOut', false, 'Pop zoom out');
                break;
            default:
                break;
        }
    }

    sendHB(type) {
        navigation.push('SendRPScreen', {
            type: type, df_user_info: this.state.c_data.userinfo, c_id: this.state.c_data.id, refreshList: () => {
                this.queryChat();
            }
        });
    }

    chooseImage(type) { // 从相册中选择图片发送
        if (type == 1) {

            const options = {
                title: '拍照',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            ImagePicker.launchCamera(options,(response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    this.writePicToRealm(response);
                }
            }))
        } else {
            const options = {
                title: '库图',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            ImagePicker.launchImageLibrary(options,(response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    this.writePicToRealm(response);
                }
            }))
        }
    }

    writePicToRealm(response) {
        // console.log(response);
        writeToRealm({
            id: getNow(),
            c_id: this.state.c_data.id,//会话id
            send_id: this.state.senderId,
            type: 2,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
            pic: 'data:image/jpeg;base64,' + response.data,
            width : response.width, //图片宽度
            height : response.height, //图片高度
            isVertical: response.isVertical,
        }, MSGTableName).then(() => {
            this.queryChat();
        })
    }
    showTime(side, modal, text,type) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} ref={v => this.overlayPullView5 = v}>
                <View style={{backgroundColor: Theme.defaultColor, minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
                    <Wheel3View time={(one,two,three)=>{

                        let result = (one * 60 + two ) + ':' + (three<10 ? '0' + three:three);
                        if (one == 0 && two < 10) {
                            result = '0' + two + ':' + (three<10 ? '0' + three:three);
                        }
                        this.overlayPullView5 && this.overlayPullView5.close()
                        writeToRealm({
                            id: getNow(),
                            c_id: this.state.c_data.id,//会话id
                            send_id: this.state.senderId,
                            type: type,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
                            yuyintonghua: result,
                            shipin: result
                        }, MSGTableName).then(() => {
                            this.queryChat();
                        })
                    }}/>
                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    showPop(type, modal, text) {
        let overlayView = (
            <Overlay.PopView
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: 260,
                    minHeight: Const.screenHeight,
                    padding: 0
                }}>
                    <HBDetailScreen closeHB={() => {
                        this.overlayPopView1 && this.overlayPopView1.close()
                        this.overlayPopView && this.overlayPopView.close()
                    }}/>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    showEdit(type, modal, text) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView3 = v}
            >
                <SliderView confirmClick={(value) => {
                    writeToRealm({
                        id: getNow(),
                        c_id: this.state.c_data.id,//会话id
                        send_id: this.state.senderId,
                        type: 3,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
                        yuyin: value + ''
                    }, MSGTableName).then(() => {
                        this.queryChat();
                    })

                    this.overlayPopView3 && this.overlayPopView3.close()
                }} cancelClick={() => {
                    this.overlayPopView3 && this.overlayPopView3.close()
                }}/>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    showZhuanZhangPop(type, modal, text, item) {
        let overlayView = (
            <Overlay.PopView
                type={type}
                modal={modal}
                ref={v => this.overlayPopView2 = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: 260,
                    minHeight: Const.screenHeight,
                    padding: 0
                }}>
                    <ZhuanZhangDetailScreen closeHB={() => {
                        this.overlayPopView2 && this.overlayPopView2.close()
                    }} data={this.state.c_data} item={item} type={item.isReceived ? 2 : 1} refreshChat={() => {
                        this.queryChat();
                    }}/>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }


    showHB(type, modal, text, item) {
        let overlayView = (
            <Overlay.PopView
                type={type}
                modal={modal}
                ref={v => this.overlayPopView1 = v}
            >
                <View style={{minWidth: 260, minHeight: Const.screenHeight, padding: 0}}>
                    <YHHongBaoPopView closeClick={() => {
                        this.overlayPopView1 && this.overlayPopView1.close()
                    }} finishAnimation={() => {
                        this.showPop('zoomOut', false, 'Pop zoom out')
                        let obj = {
                            id: item.id,
                            isReceived: true
                        };
                        writeToRealm(obj, MSGTableName).then(res => {
                            writeToRealm({
                                id: getNow(),
                                c_id: this.state.c_data.id,//会话id
                                send_id: item.send_id,
                                type: 7,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
                                xitongTextType: 2,
                                hongbaoSendName: item.userinfo.user_name,
                                hongbaoReceiveName: '你',
                            }, MSGTableName)
                            this.queryChat();
                        });
                    }}/>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    // _onEmoticonPress = data => {
    //     // 选择了某个emoji表情，将该表情追加到输入框中
    //     // this.refs.chatBottomBar.appendMsg(data.code);
    // };
    // _onBackspacePress = () => {};

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='消息' rightImage={require('../../../resource/common/wx_more.png')} clickRImage={()=>{
                    if (this.state.senderId == RNStorage.user_id) {
                        this.setState({
                            senderId: this.state.c_data.df_user_id
                        })
                        showToast('切换到对方发送');
                    } else {
                        this.setState({
                            senderId: RNStorage.user_id
                        })
                        showToast('自己发送');
                    }
                }}/>
                <XFlatList data={this.state.data}
                           style={{marginBottom: 52}}
                           renderItem={({item, index}) => {
                               switch (item.type) {
                                   case 1:
                                       return (
                                           <ChatListCell isSelf={RNStorage.user_id == item.send_id} data={item}/>
                                       )
                                   case 2:
                                       return (
                                           <ChatPicCell isSelf={RNStorage.user_id == item.send_id} data={item}/>
                                       )
                                   case 3:
                                       return (
                                           <ChatYuyinCell isSelf={RNStorage.user_id == item.send_id} data={item}/>
                                       )
                                   case 4:
                                       return (
                                           <ChatTonghHuaCell isSelf={RNStorage.user_id == item.send_id} data={item}/>
                                       )
                                   case 5:
                                       return (
                                           // <ChatZhuanZhangListCell/>
                                           <HongBaoCell isSelf={RNStorage.user_id == item.send_id}
                                                        isReceived={item.isReceived} data={item} onPress={() => {
                                               // this.setState({
                                               //   showRP: true
                                               // })
                                               // console.log(item);
                                               if (!item.isReceived) {
                                                   if (RNStorage.user_id == item.send_id) {

                                                       this.showPop('zoomOut', false, 'Pop zoom out')
                                                       let obj = {
                                                           id: item.id,
                                                           isReceived: true
                                                       };
                                                       writeToRealm(obj, MSGTableName).then(res => {
                                                           writeToRealm({
                                                               id: getNow(),
                                                               c_id: this.state.c_data.id,//会话id
                                                               send_id: item.send_id,
                                                               type: 7,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
                                                               xitongTextType: 2,
                                                               hongbaoReceiveName: this.state.c_data.userinfo.user_name,
                                                               hongbaoSendName: '你',
                                                           }, MSGTableName)
                                                           this.queryChat();
                                                       });
                                                   } else {
                                                       this.showHB('zoomOut', false, 'Pop zoom out', item)
                                                   }
                                               } else {
                                                   this.showPop('zoomOut', false, 'Pop zoom out')
                                               }
                                           }}/>
                                       )
                                   case 6:
                                       return (
                                           <ChatZhuanZhangListCell data={item}
                                                                   isSelf={RNStorage.user_id == item.send_id}
                                                                   isReceived={item.isReceived} onPress={() => {
                                               this.showZhuanZhangPop('zoomOut', false, 'Pop zoom out', item)
                                           }}/>
                                       )
                                   case 7:
                                       return (
                                           <MsgSystemCell data={item}/>
                                       )
                                   case 8:
                                       return (
                                           <ChatTonghHuaCell isSelf={RNStorage.user_id == item.send_id} data={item}/>
                                       )
                                   default:
                                       break;
                               }
                           }}
                />
                <ChatBottomBarView senderId={this.state.senderId} bottom={this.state.inputType == 1 ? 0 : this.state.inputBottom} c_id={this.state.c_data.id} refrshChat={() => {
                    this.queryChat();
                }} emojiClick={()=>{
                    this.setState({
                        inputType:2,
                        inputBottom: 341 + INSETS.bottom,
                    })
                }} moreClick={()=>{
                    this.setState({
                        inputType:3,
                        inputBottom: 220,
                    })
                }} tfonFocus={()=>{
                    this.setState({
                        inputType:1,
                    })
                }}/>
                {this.state.inputType == 3 ? (
                    <MoreView itemClick={(index) => {
                        this.handleClick(index);
                    }}/>
                ): null}

                {this.state.inputType == 2 ? (
                    <EmojiView/>
                ): null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
