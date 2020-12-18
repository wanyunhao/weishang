import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar,
} from 'react-native';
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {XFlatList, XImage, XText} from "react-native-easy-app";
import {Colors, CommonStyles, Const} from "../../../../../common/storage/Const";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {MSGTableName, writeToRealm, WXConversationTableName} from "../../../../../common/utils/RealmUtil";
import {deepClone, isEmpty} from "../../../../../common/utils/Utils";
import {dateToFormat, getNow} from "../../../../../common/utils/DateUtils";
import {Notify} from "../../../../../common/events/Notify";

export default class ZhuanZhangDetailScreen extends Component {

    constructor() {
        super();
        this.state = {
            type:1,
            caozuo_user_id: RNStorage.user_id,
        }
    }

    componentDidMount() {
        this.setState({
            type:this.props.type
        })
    }

    render() {
        const data = this.props.data || {};
        const item = this.props.item || {};
        let statusText = ''
        if (this.state.caozuo_user_id == item.send_id) {
            if (item.isReceived) {
                if (item.received_id == this.state.caozuo_user_id) {
                    statusText = '已收款';
                } else {
                    statusText = data.userinfo.user_name + '已收款';
                }
            } else {
                statusText = '待' + data.userinfo.user_name + '确认收款';
            }
        } else {
            if (item.isReceived) {
                statusText = '已收款';
            } else {
                statusText = '待确认收款';
            }
        }
        return (
            <View style={[CommonStyles.container, {marginTop: Const.isIos ? 0 : INSETS.top,backgroundColor: Colors.white}]}>
                <StatusBar backgroundColor={Colors.white}
                           barStyle='light-content'
                           translucent={true}
                           hidden={false}
                           animated={true}/>
                {Const.isIos ? (<View style={{width: Const.screenWidth,height: INSETS.top,backgroundColor:Colors.white}}>

                </View>) : null}
                <View style={{paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,height:44}}>
                    <XImage style={{width:15,height:22}} icon={require('../../../../resource/index/wx/wx_back.png')} onPress={this.props.closeHB}/>
                </View>
                <View style={{alignItems:'center',marginTop:46}}>
                    <XImage icon={this.state.type == 2 ? require('../../../../resource/index/chat/shoukuan_yes.png'):require('../../../../resource/index/chat/dqrsk.png')} iconSize={56.37}/>
                    <XText style={{color:'#1A1A1A',fontSize:17,marginTop:39}} text={statusText}/>
                    <XText style={{color:'#1A1A1A',fontSize:47}} text={'￥'+ parseFloat(item.zhuanzhangMoney).toFixed(2)}/>
                    {this.state.type == 2 ? (
                        <View>
                            <XText style={{color:'#7F7F7F',fontSize:14}} text={(item.send_id == this.state.caozuo_user_id) ?(item.received_id ==this.state.caozuo_user_id)?'已存入零钱中':'已存入对方零钱中':'已存入零钱中'}/>
                        </View>
                    ) : (
                        <>
                            {item.send_id == this.state.caozuo_user_id ? (
                                <View style={{flexDirection:'row',marginTop:17}}>
                                    <XText style={{color:'#7F7F7F',fontSize:14}} text='1天内朋友未确认，将退还给你。'/>
                                    <XText style={{color:'#576B95',fontSize:14}} text='提醒对方收款' onPress={()=>{

                                    }}/>
                                </View>
                            ) : (
                                <>
                                    <XText onPress={()=>{

                                        this.setState({
                                            type:2,
                                        })
                                        writeToRealm({id:item.id,isReceived:true},MSGTableName).then(()=>{
                                            let obj = {
                                                id: getNow(),
                                                c_id: item.c_id,//会话id
                                                send_id : parseInt(this.state.caozuo_user_id),
                                                received_id : parseInt(this.state.caozuo_user_id),
                                                type: 6,//1:文字 2:图片 3:语音 4:视频 5:红包 6:转账 7:系统消息
                                                isReceived: true,
                                                zhuanzhangText:'已收款',
                                                zhuanzhangMoney:item.zhuanzhangMoney,
                                            };
                                            writeToRealm(obj,MSGTableName).then(()=>{
                                                this.props.refreshChat();

                                            })
                                        })




                                    }} text='确认收款' style={{width:192,height:50,backgroundColor: '#07C160',marginTop:99,color:Colors.white,borderRadius:4,fontSize:18,textAlign:'center',lineHeight:50}}/>

                                    <View style={{flexDirection:'row',marginTop:17}}>
                                        <XText style={{color:'#7F7F7F',fontSize:14}} text='1天内未确认，将退还给对方。'/>
                                        <XText style={{color:'#576B95',fontSize:14}} text='立即退还' onPress={()=>{

                                        }}/>

                                    </View>
                                </>
                            )}

                        </>
                    )}
                </View>
                <XText style={{color:'#7F7F7F',fontSize:14,position:'absolute',bottom:80,left:0,right:0,textAlign:'center'}} text={'转账时间: ' + dateToFormat(item.create_time,'yyyy-MM-dd hh:mm')}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:Const.screenWidth,
        height:Const.screenHeight,
    },
});
