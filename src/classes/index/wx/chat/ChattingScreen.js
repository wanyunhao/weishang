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
    UsersTableName, writeToRealm, WXConversationTableName, WXGroupMemberTableName
} from "../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {deepClone, isEmpty} from "../../../../common/utils/Utils";
import YHHongBaoPopView from "./views/YHHongBaoPopView";
import {Button, Label, Overlay, Theme, Wheel} from "teaset";
import HBDetailScreen from "./views/HBDetailScreen";
import {getNow} from "../../../../common/utils/DateUtils";
import MsgSystemCell, {MsgSystemDefaultCell} from "./views/MsgSystemCell";
import ZhuanZhangDetailScreen from "./views/ZhuanZhangDetailScreen";
import SliderAntm from "@ant-design/react-native/es/slider";
import SliderView from "./views/SliderView";
import ChatYuyinCell from "./views/ChatYuyinCell";
import {showActionSheet, showOverlayModal, showOverlayPull} from "../../../../compoments/YHUtils";
import Wheel3View from "./views/Wheel3View";
import ChatTonghHuaCell from "./views/ChatTonghHuaCell";
import ImagePicker from "react-native-image-picker";
import ChatPicCell from "./views/ChatPicCell";
import EmojiView from "./views/EmojiView";
import {showToast} from "../../../../common/widgets/Loading";
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import BaseVC from "../../zfb/Common/BaseVC";
import {Notify} from "../../../../common/events/Notify";
import YHDatePicker from "./views/YHDatePicker";
import DraggableFlatList from 'react-native-draggable-flatlist'

export default class ChattingScreen extends WXBaseVC {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            showHongbao: false,
            showEmojiView: false,
            showMoreView: false,
            c_data: {
                userinfo:{
                    user_name:''
                }
            },
            data: [],
            silderValue: 30,
            inputType: 1,// 1:文字 2:表情 3:更多
            inputBottom: 220,// 1:文字 2:表情 3:更多
            kebordHeight: 0,
            emoji: '',
            senderId: RNStorage.user_id,
            time: new Date(),
            isDrag: false,
        };
    }



    componentWillUnmount() {
        Notify.Refresh_conversation_list.unRegister(this.refreshList);
    }

    refreshList = () => {
        this._requestData();
    };

    componentDidMount() {

        super.componentDidMount();
        Notify.Refresh_conversation_list.register(this.refreshList);
        this._requestData();
    }


    _requestData() {
        console.log(this.props.route.params.c_id);
        queryFilterFromRealm(WXConversationTableName, 'id=' + this.props.route.params.c_id).then(data => {

            if (data[0].type == 1) {
                queryFilterFromRealm(UsersTableName, 'id=' + data[0].df_user_id).then((data1) => {
                    if (!isEmpty(data1)) {
                        let model = data[0];
                        model.userinfo = data1[0];
                        this.setState({
                            c_data: model
                        }, () => {
                            this.queryChat();
                        })
                    }
                })
            } else {
                queryFilterFromRealm(WXGroupMemberTableName,'group_id='+this.props.route.params.c_id).then((data1)=>{
                    let model = data[0];
                    model.members = data1;
                    this.setState({
                        c_data: model
                    }, () => {
                        this.queryChat();
                    })
                })
            }
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
                            this.showTime('bottom', false, 'Pull from bottom', 8)
                        }
                    },
                    {
                        title: '视频通话', onPress: () => {
                            this.showTime('bottom', false, 'Pull from bottom', 4)
                        }
                    },
                ])
                break;
            case 3:
                const view = showOverlayPull('bottom', false, (<YHDatePicker confirmDate={(value) => {
                    Overlay.hide(view);
                    writeToRealm({
                        id: getNow(),
                        c_id: this.state.c_data.id,//会话id
                        send_id: parseInt(this.state.senderId),
                        type: 7,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息 8:语音通话
                        xitongText: value.getTime() + "",
                        xitongTextType: 1,//1:纯文字 2:红包
                    }, MSGTableName).then(() => {

                        writeToRealm({
                            id: this.state.c_data.id,
                            last_time: getNow()
                        }, WXConversationTableName).then((res) => {
                            Notify.Refresh_conversation_list.sendEvent({});
                        })
                        this.queryChat();
                    })
                }}/>))
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

                writeToRealm({
                    id: this.state.c_data.id,
                    last_type: type == 1 ? '[微信红包]恭喜发财,大吉大利' : '[转账]请你确认收款',
                    last_time: getNow()
                }, WXConversationTableName).then((res) => {
                    Notify.Refresh_conversation_list.sendEvent({});
                })
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
            ImagePicker.launchCamera(options, (response => {
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
            ImagePicker.launchImageLibrary(options, (response => {
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
            send_id: parseInt(this.state.senderId),
            type: 2,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
            pic: 'data:image/jpeg;base64,' + response.data,
            width: response.width, //图片宽度
            height: response.height, //图片高度
            isVertical: response.isVertical,
        }, MSGTableName).then(() => {
            this.queryChat();
            writeToRealm({
                id: this.state.c_data.id,
                last_type: '[图片]',
                last_time: getNow()
            }, WXConversationTableName).then((res) => {
                Notify.Refresh_conversation_list.sendEvent({});
            })
        })
    }

    showTime(side, modal, text, type) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} ref={v => this.overlayPullView5 = v}>
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: 300,
                    minHeight: 260,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Wheel3View time={(one, two, three) => {

                        let result = (one * 60 + two) + ':' + (three < 10 ? '0' + three : three);
                        if (one == 0 && two < 10) {
                            result = '0' + two + ':' + (three < 10 ? '0' + three : three);
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

                            writeToRealm({
                                id: this.state.c_data.id,
                                last_type: type == 4 ? '[视频通话]' : '[语音通话]',
                                last_time: getNow()
                            }, WXConversationTableName).then((res) => {
                                Notify.Refresh_conversation_list.sendEvent({});
                            })
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

                        writeToRealm({
                            id: this.state.c_data.id,
                            last_type: '[语音]',
                            last_time: getNow()
                        }, WXConversationTableName).then((res) => {
                            Notify.Refresh_conversation_list.sendEvent({});
                        })
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
                            }, MSGTableName).then((res) => {
                                this.queryChat();
                            })
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
                <WXNavigationBar title={this.state.c_data.type == 1 ? (!isEmpty(this.state.c_data.userinfo) ?this.state.c_data.userinfo.user_name:'' ):(this.state.c_data.group_name + '(' +this.state.c_data.group_count + ')')} rightImage={require('../../../resource/common/wx_more.png')}
                                 clickRImage={() => {
                                     navigation.push('GroupSetScreen',{c_id:this.props.route.params.c_id});
                                     // if (this.state.senderId == RNStorage.user_id) {
                                     //     this.setState({
                                     //         senderId: this.state.c_data.df_user_id
                                     //     })
                                     //     showToast('切换到对方发送');
                                     // } else {
                                     //     this.setState({
                                     //         senderId: RNStorage.user_id
                                     //     })
                                     //     showToast('自己发送');
                                     // }
                                 }}/>
                <DraggableFlatList data={this.state.data}
                                   style={{marginBottom: 52}}
                                   keyExtractor={(item, index) => `draggable-item-${item.id}`}
                                   onDragEnd={({data}) => this.setState({data})}
                                   renderItem={({item, index, drag, isActive}) => {
                                       switch (item.type) {
                                           case 1:
                                               return (
                                                   <ChatListCell isSelf={RNStorage.user_id == item.send_id} data={item}
                                                                 drag={this.state.isDrag ? drag : null}
                                                                 refreshChat={()=>{
                                                                     this.queryChat()
                                                                 }}
                                                                 changeUser={()=>{
                                                                     if (this.state.c_data.type == 1) {
                                                                         writeToRealm({id:item.id,send_id:item.send_id == RNStorage.user_id?parseInt(this.state.c_data.df_user_id):parseInt(RNStorage.user_id)},MSGTableName).then(()=>{
                                                                             this.queryChat();
                                                                         })
                                                                     }
                                                                 }}
                                                                 orderClick={() => {
                                                                     this.setState({
                                                                         isDrag: true,
                                                                     })
                                                                 }}/>
                                               )
                                           case 2:
                                               return (
                                                   <ChatPicCell isSelf={RNStorage.user_id == item.send_id} data={item}
                                                                drag={this.state.isDrag ? drag : null}
                                                                orderClick={() => {
                                                                    this.setState({
                                                                        isDrag: true,
                                                                    })
                                                                }}/>
                                               )
                                           case 3:
                                               return (
                                                   <ChatYuyinCell isSelf={RNStorage.user_id == item.send_id} data={item}
                                                                  drag={this.state.isDrag ? drag : null}
                                                                  orderClick={() => {
                                                                      this.setState({
                                                                          isDrag: true,
                                                                      })
                                                                  }}/>
                                               )
                                           case 4:
                                               return (
                                                   <ChatTonghHuaCell isSelf={RNStorage.user_id == item.send_id}
                                                                     data={item} drag={this.state.isDrag ? drag : null}
                                                                     orderClick={() => {
                                                                         this.setState({
                                                                             isDrag: true,
                                                                         })
                                                                     }}/>
                                               )
                                           case 5:
                                               return (
                                                   // <ChatZhuanZhangListCell/>
                                                   <HongBaoCell isSelf={RNStorage.user_id == item.send_id}
                                                                drag={this.state.isDrag ? drag : null}
                                                                orderClick={() => {
                                                                    this.setState({
                                                                        isDrag: true,
                                                                    })
                                                                }}
                                                                isReceived={item.isReceived} data={item}
                                                                onPress={() => {
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
                                                   }}
                                                                           drag={this.state.isDrag ? drag : null}
                                                                           orderClick={() => {
                                                                               this.setState({
                                                                                   isDrag: true,
                                                                               })
                                                                           }}/>
                                               )
                                           case 7: {
                                               if (item.xitongTextType == 1) {

                                                   return (
                                                       <MsgSystemDefaultCell data={item}
                                                                             drag={this.state.isDrag ? drag : null}
                                                                             orderClick={() => {
                                                                                 this.setState({
                                                                                     isDrag: true,
                                                                                 })
                                                                             }}/>
                                                   )
                                               }
                                               if (item.xitongTextType == 2) {

                                                   return (
                                                       <MsgSystemCell data={item}
                                                                      drag={this.state.isDrag ? drag : null}
                                                                      orderClick={() => {
                                                                          this.setState({
                                                                              isDrag: true,
                                                                          })
                                                                      }}/>
                                                   )
                                               }
                                           }
                                           case 8:
                                               return (
                                                   <ChatTonghHuaCell isSelf={RNStorage.user_id == item.send_id}
                                                                     data={item}
                                                                     drag={this.state.isDrag ? drag : null}
                                                                     orderClick={() => {
                                                                         this.setState({
                                                                             isDrag: true,
                                                                         })
                                                                     }}/>
                                               )
                                           default:
                                               break;
                                       }
                                   }}
                />

                {this.state.isDrag ? (
                    <View style={{
                        paddingHorizontal: 15,
                        height: 40,
                        backgroundColor: Colors.tabbar_select_color,
                        position: 'absolute',
                        top: 44,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <XText text='长按消息可以随意拖动改变顺序' style={{fontSize: 12, color: Colors.black_text_color}}/>
                        <XText text='  排序完成  ' style={{
                            fontSize: 14,
                            color: Colors.black_text_color,
                            borderWidth: 1,
                            lineHeight: 24,
                            borderRadius: 12
                        }} onPress={() => [
                            this.setState({
                                isDrag: false,
                            })
                        ]}/>
                    </View>
                ) : null}
                <ChatBottomBarView senderId={this.state.senderId}
                                   bottom={this.state.inputType == 1 ? 0 : this.state.inputBottom}
                                   c_id={this.state.c_data.id} refrshChat={() => {
                    this.queryChat();
                }} emojiClick={() => {
                    this.setState({
                        inputType: 2,
                        inputBottom: 341 + INSETS.bottom,
                    })
                }} moreClick={() => {
                    this.setState({
                        inputType: 3,
                        inputBottom: 220,
                    })
                }} tfonFocus={() => {
                    this.setState({
                        inputType: 1,
                    })
                }}/>
                {this.state.inputType == 3 ? (
                    <MoreView itemClick={(index) => {
                        this.handleClick(index);
                    }}/>
                ) : null}

                {this.state.inputType == 2 ? (
                    <EmojiView/>
                ) : null}

            </View>
            // </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
