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
    instance,
    MSGTableName,
    queryFilterFromRealm,
    SelfTableName,
    UsersTableName, writeToRealm
} from "../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {isEmpty} from "../../../../common/utils/Utils";
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

const {width} = Dimensions.get("window");

export default class ChattingScreen extends Component {

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
        };
    }

    componentDidMount() {
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

    componentWillMount() {
    }


    handleClick(index) {
        switch (index) {
            case 0:
                this.chooseImage();
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
                            this.showTime('bottom', false, 'Pull from bottom',8)
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

    chooseImage() { // 从相册中选择图片发送
        // ImagePicker.openPicker({
        //   cropping: false
        // }).then(image => {
        //   if (this.props.sendImageMessage) {
        //     let path = image.path;
        //     if (!Utils.isEmpty(path)) {
        //       let name = path.substring(path.lastIndexOf('/') + 1, path.length);
        //       this.props.sendImageMessage(image);
        //     }
        //   }
        // });
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
                            send_id: RNStorage.user_id,
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
                    {/*<Label type='title' size='xl' text={text} />*/}
                    {/*{modal ? <View style={{height: 60}} /> : null}*/}
                    {/*{modal ? <Button title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}*/}
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
                        send_id: RNStorage.user_id,
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
                        // this.setState({
                        //   showRP: false,
                        // })
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

    render() {
        let data = ['1', '2', '3', 4, 1, 6, 7, 7, 1, 1, 1, 1]
        return (
            <View style={styles.container}>
                <WXNavigationBar title='消息'/>
                {/*<NavigationBar title='消息' onBack={()=>{*/}
                {/*  this.setState({*/}
                {/*    showHongbao: !this.state.showHongbao*/}
                {/*  })*/}
                {/*}}/>*/}

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
                                           <ChatListCell isSelf={RNStorage.user_id == item.send_id}/>
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
                                                               hongbaoReceiveName: item.userinfo.user_name,
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
                <ChatBottomBarView bottom={220} c_id={this.state.c_data.id} refrshChat={() => {
                    this.queryChat();
                }}/>
                <MoreView itemClick={(index) => {
                    this.handleClick(index);
                }}/>
                {/*{this.state.showRP ? (<YHHongBaoPopView closeClick={()=>{*/}
                {/*  this.setState({*/}
                {/*    showRP: false,*/}
                {/*  })*/}
                {/*}} finishAnimation={()=>{*/}
                {/*  this.setState({*/}
                {/*    showRP: false,*/}
                {/*  },()=>{*/}
                {/*    this.showPop('zoomOut', false, 'Pop zoom out')*/}
                {/*  })*/}
                {/*}}/>) : null}*/}
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
