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
import {XHttp, XImage, XView} from "react-native-easy-app";
import {MSGTableName, writeToRealm, WXHBLQListTableName} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {isEmpty} from "../../../../common/utils/Utils";
import {showToast} from "../../../../common/widgets/Loading";
import BaseVC from "../../zfb/Common/BaseVC";
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {Notify} from "../../../../common/events/Notify";
import {Api} from "../../../../common/http/Api";

export default class SendRPScreen extends WXBaseVC {
    constructor() {
        super();
        this.state = {
            select: 2,
            hongbaoText: '',
            hongbaoMoney: 0,
            hongbaoCount: '1',
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

    getRandomMoney(remainMoney,remainSize){
        let moneyList=[];
        const min=0.01;
        let max,money;
        while (remainSize>1){
            max=remainMoney/remainSize*2;
            money=Math.random()*max;
            money=money<0.01 ? 0.01 : money;
            money=Math.round(money*100)/100;
            moneyList.push(money);
            remainSize--;
            remainMoney-=money;
        }

        moneyList.push(Math.round(remainMoney*100)/100);
        return moneyList;
    }

    _fahongbao(successBlock) {

        const data = this.props.route.params.data;
        const isGroup = data.type == 2;
        const obj = {
            token: '123456',
            user_id: RNStorage.user_id,//发红包者昵称
            send_user_nickname: this.state.select == 1?this.state.df_user_info.user_name:RNStorage.user_name,//发红包者昵称
            send_user_atatar:this.state.select == 1?this.state.df_user_info.avatar:RNStorage.avatarUrl,//发红包者头像
            is_group:isGroup ? '1': '0',//是否为群发送（1是0不是）
            title:this.state.hongbaoText,//红包标题
            money:this.state.hongbaoMoney,//发送金额
            type:this.state.type == 1 ? '0':'1',//0 普通红包 1 转账
            quantity:this.state.hongbaoCount,//红包数量
            plat:'2',//发送平台（1：支付宝2：微信） 默认为支付宝
        }
        console.log(obj);
        XHttp().url(Api.Api_Gift_send)
            .param(obj)
            .post((success, json) => {
                console.log('来了老弟',success)
                console.log('来了老弟json->',json)
                if (success) {
                    successBlock()
                }
            })
    }
    _addSubView() {
        const data = this.props.route.params.data;
        const isGroup = data.type == 2;
        return (
            <View style={styles.container}>
                <WXNavigationBar title={this.state.type == 2 ? '转账' : '发红包'} rightText='发送' clickRText={() => {

                    if (isEmpty(this.state.hongbaoMoney) || this.state.hongbaoMoney <= 0) {
                        showToast(this.state.type == 2 ? '转账金额不能低于0.01' : '单个红包金额不能低于0.01');
                        return;
                    }
                    if (isGroup && this.state.select == 1 &&isEmpty(this.state.df_user_info)) {
                        showToast('请选择发送人');
                        return;
                    }
                    this._fahongbao(()=>{

                        const msg_id = getNow();
                        let obj = {
                            id: msg_id,
                            c_id: this.c_id,//会话id
                            send_id: this.state.select == 2 ? parseInt(RNStorage.user_id) : isGroup? parseInt(this.state.df_user_info.user_id) : parseInt(this.state.df_user_info.id),
                            type: this.state.type == 2 ? 6 : 5,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息

                            // xitongText : 'int?',
                            // hongbaoTime : 'int?',
                            isReceived: false,
                        };
                        if (isGroup && isEmpty(this.state.hongbaoCount)) {
                            showToast('请输入个数');
                            return;
                        }
                        if (this.state.type == 1) {
                            obj.hongbaoText = isEmpty(this.state.hongbaoText) ? '恭喜发财，大吉大利' : this.state.hongbaoText;
                            obj.hongbaoMoney = this.state.hongbaoMoney;
                            if (isGroup) {
                                obj.hongbaoCount = parseInt(this.state.hongbaoCount);
                                obj.totalhongbaoCount = parseInt(this.state.hongbaoCount);
                                var moneylist = this.getRandomMoney(parseFloat(this.state.hongbaoMoney),parseInt(this.state.hongbaoCount));
                                let max = 0;
                                moneylist.map(value => {
                                    if (value > max) {
                                        max = value
                                    }
                                })
                                for (let i = 0; i < this.state.hongbaoCount; i++) {
                                    writeToRealm({
                                        id: getNow() + i,
                                        index: i,
                                        msg_id: msg_id,//消息id
                                        money : moneylist[i] + "", //钱
                                        isBest: max == moneylist[i],//是否手气最佳
                                        isLq: false,//是否已经领取
                                    },WXHBLQListTableName).then((res)=>{
                                    })
                                }

                            } else {
                                obj.hongbaoCount = 1;
                            }
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
                    {isGroup ? (
                        <TitleAndSubCell
                            isEdit={true} title={'红包个数(本群共' + data.members.length + '人)'}
                            sub_title={'请输入个数'}
                            value={this.state.hongbaoCount}
                            onChangeText={(text) => {
                                this.setState({
                                    hongbaoCount: text
                                })
                            }}/>) : null}
                </View>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
