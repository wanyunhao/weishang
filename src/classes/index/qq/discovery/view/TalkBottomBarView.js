import React, {Component} from "react";

import {
    Button,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Utils from '../../../../../common/utils/WXUtils'
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {Colors, Const} from "../../../../../common/storage/Const";
import {instance, MSGTableName, PYQListTalkTableName, writeToRealm} from "../../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {getNow} from "../../../../../common/utils/DateUtils";
import {XImage} from "react-native-easy-app";


const BAR_STATE_SHOW_KEYBOARD = 1;
const BAR_STATE_SHOW_RECORDER = 2;

export default class TalkBottomBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barState: BAR_STATE_SHOW_KEYBOARD,
            showEmojiView: false,
            showMoreView: false,
            inputMsg: ""
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.c_id = this.props.c_id;
        this.father_name = this.props.talk_info.father_name;
        this.user_name = this.props.talk_info.user_name;
        this.avatar = this.props.talk_info.avatar;
    }

    render() {
        var barState = this.state.barState;
        switch (barState) {
            case BAR_STATE_SHOW_KEYBOARD:
                return this.renderKeyBoardView();
            case BAR_STATE_SHOW_RECORDER:
                return this.renderRecorderView();
        }
    }

    // appendMsg(msg) {
    //   let s = this.state.inputMsg;
    //   s += msg;
    //   this.setState({ inputMsg: s });
    // }

    renderKeyBoardView() {
        return (
            <View style={[styles.container, {bottom: this.props.bottom || 0,}]}>
                <YHTouchableOpacity
                    onPress={this.props.changeAvatar}
                >
                    {/*<Image*/}
                    {/*    style={styles.icon}*/}
                    {/*    source={require("../../../../resource/index/chat_bot_icon_speech.png")}*/}
                    {/*/>*/}
                    <XImage icon={this.props.talk_info.avatar} iconSize={30}/>
                </YHTouchableOpacity>
                <View
                    style={styles.input}>
                    <TextInput
                        style={{height:'100%'}}
                        value={this.state.inputMsg}
                        onChangeText={text => {
                            this.setState({inputMsg: text});
                        }}
                    />
                </View>
                <YHTouchableOpacity
                    onPress={() => {
                        //点击表情
                    }}
                >
                    <Image
                        style={styles.icon}
                        source={require("../../../../resource/index/chat_bot_icon_biaoqing.png")}
                    />
                </YHTouchableOpacity>

                {Utils.isEmpty(this.state.inputMsg) ? null : (
                    <View style={{marginLeft: 10}}>
                        <Button
                            color={"#49BC1C"}
                            title={"发送"}
                            onPress={() => this.sendMsg()}
                        />
                    </View>
                )}
            </View>
        );
    }

    sendMsg() {
        // let onSendBtnClickListener = this.props.handleSendBtnClick;
        // if (!Utils.isEmpty(onSendBtnClickListener)) {
        //   onSendBtnClickListener(this.state.inputMsg);
        // }
        // writeToRealm({
        //     id: getNow(),
        //     c_id: this.c_id,
        //     send_id: RNStorage.user_id,
        //     type: 1,
        //     text: this.state.inputMsg
        // },MSGTableName)
        const obj = {
            id: getNow(),
            pyq_id: this.c_id,
            user_name: this.user_name,
            father_name: this.father_name,
            text: this.state.inputMsg,
        };
        writeToRealm(obj,PYQListTalkTableName)
        this.setState({inputMsg: ""},this.props.refrshChat);
    }

    renderRecorderView() {
        return (
            <View style={[styles.container, {bottom: this.props.bottom || 0,}]}>
                <YHTouchableOpacity
                    onPress={() => {
                        //切换到文字
                        this.setState({
                            barState: BAR_STATE_SHOW_KEYBOARD
                        })
                    }}
                >
                    <Image
                        style={styles.icon}
                        source={require("../../../../resource/index/chat_bot_icon_speech.png")}
                    />
                </YHTouchableOpacity>
                <YHTouchableOpacity style={{
                    flex: 1, backgroundColor: Colors.white, height: 38,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 5,
                }}>
                    <Text>按住 说话</Text>
                </YHTouchableOpacity>
                <YHTouchableOpacity
                    onPress={() => {

                    }}
                >
                    <Image
                        style={styles.icon}
                        source={require("../../../../resource/index/chat_bot_icon_biaoqing.png")}
                    />
                </YHTouchableOpacity>
                <YHTouchableOpacity
                    onPress={() => {

                    }}
                >
                    <Image
                        style={[styles.icon, {marginLeft: 10}]}
                        source={require("../../../../resource/index/chat_bot_icon_more.png")}
                    />
                </YHTouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 52,
        width: Const.screenWidth,
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 10,
        position: 'absolute',

    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: Colors.white,
        height: 38,
        borderRadius: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    recorder: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 38,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: "#6E7377",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    }
});
