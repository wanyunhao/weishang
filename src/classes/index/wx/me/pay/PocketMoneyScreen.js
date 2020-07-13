import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import {XImage, XText} from "react-native-easy-app";
import ChangYongView from "./views/ChangYongView";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import BaseVC from "../../../zfb/Common/BaseVC";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {Provider} from "@ant-design/react-native";
import {getPeople, showModalPrompt} from "../../../../../compoments/YHUtils";
import {isEmpty} from "../../../../../common/utils/Utils";
import {PYQListTableName, writeToRealm} from "../../../../../common/utils/RealmUtil";

const {width} = Dimensions.get("window");

export default class PocketMoneyScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false
        };
    }

    componentDidMount() {
        this._setBarStyle(2);
        this._setPlaceViewBackgroundColor(Colors.white)
    }
    _addSubView() {
        return (
            <Provider>
            <View style={styles.container}>
                <WXNavigationBar nav_bg_color={Colors.white} rightText='零钱明细' noLine clickRText={()=>{

                }}/>
                <View style={{alignItems: 'center',}}>
                    <XImage style={{marginTop:50}} icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/lq_icon_wdlq.png')} iconSize={50}/>
                    <Text style={{fontSize:16,color:Colors.wx_black_text_color,marginTop:35}}>我的零钱</Text>
                    <Text style={{fontSize:44,color:Colors.wx_black_text_color,fontWeight:'bold'}}>￥{RNStorage.wx_lq}</Text>
                    <Text style={{fontSize:13,color:'#E6A259'}}>免费开通零钱通给自己加加薪</Text>
                    <XText onPress={()=>{
                        showModalPrompt('充值','',(text)=>{
                            if (!isEmpty(text) && parseInt(text)>0) {
                                RNStorage.wx_lq = text;
                                this.setState({
                                    refresh: true,
                                })
                            }
                        },'请输入金额')
                    }} text='充值' style={{width:173,height:38,backgroundColor: '#07C160',marginTop:200,color:Colors.white,borderRadius:5,fontSize:16,fontWeight:'bold',textAlign:'center',lineHeight:38}}/>

                    {RNStorage.wx_lq == 0 ? null : (
                        <XText onPress={()=>{
                            navigation.push('TiXianScreen');
                        }} text='提现' style={{marginTop:14,width:173,height:38,backgroundColor: '#EDEDED',color:'#07C160',borderRadius:5,fontSize:16,fontWeight:'bold',textAlign:'center',lineHeight:38}}/>

                    )}

                </View>
                <ChangYongView/>
            </View>
            </Provider>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});
