import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Colors, Const} from "../../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import {XText} from "react-native-easy-app";

export default class TixianResultScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='零钱提现' nav_bg_color={Colors.white}/>
                <View style={{paddingHorizontal:24,}}>
                    <View style={{flexDirection:'row',marginTop:46, alignItems:'center',paddingBottom:43}}>
                        <Image style={{width:34.84,height:159}} source={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/lqtx.png')}/>
                        <View style={{justifyContent:'space-between',marginLeft:18,height:165}}>
                            <Text style={{color:'#7F7F7F',fontSize:17}}>发起提现申请</Text>
                            <View>
                                <Text style={{color:'#191919',fontSize:17}}>银行处理中</Text>
                                <Text style={{color:'#7F7F7F',fontSize:13}}>预计2020-01-30 17:12到账</Text>
                            </View>
                            <Text style={{color:'#B2B2B2',fontSize:17}}>到账成功</Text>
                        </View>

                        <YHDividingLine/>
                    </View>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
                            <Text style={{color:'#909090',fontSize:14}}>提现金额</Text>
                            <Text style={{color:'#000000',fontSize:14}}>0.10%(最低0.1)</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
                            <Text style={{color:'#909090',fontSize:14}}>到账银行卡</Text>
                            <Text style={{color:'#000000',fontSize:14}}>0.10%(最低0.1)</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
                            <Text style={{color:'#909090',fontSize:14}}>服务费</Text>
                            <Text style={{color:'#000000',fontSize:14}}>0.10%(最低0.1)</Text>
                        </View>
                    </View>
                </View>
                <View style={{position:'absolute',left:0,right:0,bottom:INSETS.bottom + 46,width:Const.screenWidth,alignItems:'center'}}>
                    <XText onPress={()=>{
                        navigation.pop(2)
                    }} text='完成' style={{width:169,height:34,backgroundColor: '#EDEDED',color:'#07C160',borderRadius:5,fontSize:16,fontWeight:'bold',textAlign:'center',lineHeight:34}}/>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});
