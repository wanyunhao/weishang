import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Colors} from "../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import TitleAndSubCell from "../me/pay/views/TitleAndSubCell";
import {XImage} from "react-native-easy-app";
import {MSGTableName, writeToRealm} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {isEmpty} from "../../../../common/utils/Utils";
import {showToast} from "../../../../common/widgets/Loading";
import BaseVC from "../../zfb/Common/BaseVC";
import WXBaseVC from "../../zfb/Common/WXBaseVC";

export default class SendRPScreen extends WXBaseVC {
    constructor() {
        super();
        this.state = {
            select: 2,
            hongbaoText: '',
            hongbaoMoney: 0,
            type: 1,
            df_user_info: {avatar: '', user_name: ''},
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.c_id = this.props.route.params.c_id;
        this.setState({
            type: this.props.route.params.type,
            df_user_info: this.props.route.params.df_user_info,
        })
    }


    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title={this.state.type == 2 ? '转账' : '发红包'} rightText='发送' clickRText={() => {

                    if (isEmpty(this.state.hongbaoMoney) || this.state.hongbaoMoney <= 0) {
                        showToast(this.state.type == 2 ? '转账金额不能低于0.01' : '单个红包金额不能低于0.01');
                        return;
                    }
                    let obj = {
                        id: getNow(),
                        c_id: this.c_id,//会话id
                        send_id: this.state.select == 2 ? RNStorage.user_id : this.state.df_user_info.id,
                        type: this.state.type == 2 ? 6 : 5,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息

                        // xitongText : 'int?',
                        // hongbaoTime : 'int?',
                        isReceived: false,
                    };
                    if (this.state.type == 1) {
                        obj.hongbaoText = isEmpty(this.state.hongbaoText) ? '恭喜发财，大吉大利' : this.state.hongbaoText;
                        obj.hongbaoMoney = this.state.hongbaoMoney;
                    }
                    if (this.state.type == 2) {
                        // zhuanzhangText
                        obj.zhuanzhangText = isEmpty(this.state.hongbaoText) ? this.state.select == 2 ? ('转账给' + this.state.df_user_info.user_name) : '转账给你' : this.state.hongbaoText;
                        obj.zhuanzhangMoney = this.state.hongbaoMoney;
                    }
                    writeToRealm(obj, MSGTableName).then((res) => {
                        this.props.route.params.refreshList();
                        navigation.goBack();
                    })
                }}/>
                <View>
                    <TitleAndSubCell isEdit={true} title={this.state.type == 2 ? '转账金额' : '红包金额'} sub_title='请输入'
                                     keyboardType="numeric" value={this.state.hongbaoMoney} onChangeText={(text) => {
                        this.setState({
                            hongbaoMoney: text
                        })
                    }}/>
                    <TitleAndSubCell isEdit={true} title={this.state.type == 2 ? '转账信息' : '红包信息'}
                                     sub_title={this.state.type == 2 ? '请输入' : '恭喜发财,大吉大利'}
                                     value={this.state.hongbaoText} onChangeText={(text) => {
                        this.setState({
                            hongbaoText: text
                        })
                    }}/>
                </View>
                <View style={{paddingHorizontal: 15, backgroundColor: Colors.white}}>
                    <Text style={{marginTop: 10,}}>选择发送人</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10,}}>
                            <View>
                                <XImage icon={isEmpty(this.state.df_user_info) ? null : this.state.df_user_info.avatar}
                                        iconSize={35}/>
                                <Text style={{
                                    fontSize: 12,
                                    marginTop: 3
                                }}>{isEmpty(this.state.df_user_info) ? '' : this.state.df_user_info.user_name}</Text>
                            </View>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
