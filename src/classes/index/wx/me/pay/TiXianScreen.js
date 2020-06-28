import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text,TextInput} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import {XText} from "react-native-easy-app";
import {showToast} from "../../../../../common/widgets/Loading";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";

const {width} = Dimensions.get("window");

export default class TiXianScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMsg:''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='零钱提现' rightImage={require('../../../../resource/common/wx_more.png')} clickRImage={()=>{

                }}/>
                <View style={{marginTop:19,marginHorizontal:15,backgroundColor: '#FBFBFB',paddingHorizontal:28,paddingVertical:20}}>
                    <View style={{flexDirection:'row'}}>
                        <XText text='到账银行卡' style={{fontSize:13,color:'#000000',}}/>
                        <View style={{paddingLeft:34}}>
                            <XText style={{color:'#596B91',fontSize:13}} text='请选择银行卡' onPress={()=>{
                                navigation.push('AddBankCardScreen')
                            }}/>
                            <XText style={{color:'#B4B4B4',fontSize:12,marginTop:8}} text='2小时内到账'/>
                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal:15,backgroundColor: '#FFFFFF',paddingHorizontal:28,paddingVertical:15}}>
                    <XText text='提现金额' style={{fontSize:13,color:'#000000',}}/>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
                        <Text style={{color:'#1A1A1A',fontSize:31,fontWeight:'bold',width:31}}>￥</Text>
                        <TextInput
                            style={{height:44,width:Const.screenWidth - 86 - 31,fontSize:31,fontWeight:'bold'}}
                            value={this.state.inputMsg}
                            onChangeText={text => {
                                this.setState({inputMsg: text});
                            }}
                        />
                        <YHDividingLine/>
                    </View>
                    <Text style={{color:'#B4B4B4',fontsize:12,marginTop:11}}>当前零钱余额3297.88元，<XText style={{color:'#5B6B8D',fontsize:12,}} text='全部提现'/></Text>
                    <YHTouchableOpacity text='提现' style={{width:'100%',height:45,backgroundColor: '#F2F2F2',marginTop:27,borderRadius:5,}} onPress={()=>{
                        showToast('提现')
                    }}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg,
    },
});
