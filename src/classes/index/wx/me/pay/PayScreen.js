import React, { Component } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import {Colors, Const} from "../../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {XImage} from "react-native-easy-app";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import BaseVC from "../../../zfb/Common/BaseVC";

export default class PayScreen extends BaseVC {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.fuwuData = [
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon7.png'),
        title: '信用卡还款'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon8.png'),
        title: '微粒贷借钱'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon9.png'),
        title: '手机充值'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon1.png'),
        title: '理财通'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon6.png'),
        title: '生活缴费'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon5.png'),
        title: 'Q币充值'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon2.png'),
        title: '城市服务'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon3.png'),
        title: '腾讯公益'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon4.png'),
        title: '医疗健康'
      },
    ]
    this.thirdData = [
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon12.png'),
        title: '火车票机票'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon11.png'),
        title: '滴滴出行'
      },
      {
        icon: require('../../../../resource/index/wx/me/pay/qb_icon10.png'),
        title: '京东购物'
      }
    ]
  }

  renderItem(data) {
    return (
        <View style={{backgroundColor: Colors.white,width:(Const.screenWidth - 14)/3,height:(Const.screenWidth - 14)/3, alignItems:'center',justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <XImage icon={data.icon} iconSize={32}/>
            <Text style={{color:Colors.pay_gray_text_color,fontSize:13,marginTop:6}}>{data.title}</Text>
          </View>
          <YHDividingLine isBottom={false}/>
          <View style={[{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: Colors.wx_line_color,
            height: '100%',
            width: 0.5
          }]}>
          </View>
        </View>
    )
  }

  _addSubView() {
    return (
      <View style={styles.container}>
        <WXNavigationBar title="支付"/>
        <ScrollView>
          <View style={{marginHorizontal:7,marginTop:8,backgroundColor: '#3BAC6A',height:158,borderRadius:10,flexDirection:'row',alignItems:'center'}}>
            <View style={{alignItems:'center',flex:1}}>
              <XImage icon={require('../../../../resource/index/wx/me/pay/zf_icon_sfk.png')} style={{width:31,height:25}}/>
              <Text style={{color:Colors.white,fontSize:16,marginTop:14}}>收付款</Text>
            </View>
            <YHTouchableOpacity style={{alignItems:'center',flex:1}} onPress={()=>{
              navigation.push('WalletScreen')
            }}>
              <XImage icon={require('../../../../resource/index/wx/me/pay/zf_icon_qb.png')} style={{width:31,height:25}}/>
              <Text style={{color:Colors.white,fontSize:16,marginTop:14}}>钱包</Text>
              <Text style={{color:'#9AD6B2',fontSize:13,marginTop:0,}}>￥2312000.88</Text>
            </YHTouchableOpacity>
          </View>

        {/*  腾讯服务*/}
        <View style={{marginHorizontal:7,marginTop:8,backgroundColor: Colors.white ,borderRadius:10}}>
          <Text style={{color:Colors.pay_gray_text_color,fontSize:13,paddingVertical:21,marginLeft:15}}>腾讯服务</Text>
          <View style={{flexDirection:'row',flexWrap: 'wrap',}}>
            {this.fuwuData.map((item)=>{
              return this.renderItem(item);
            })}
          </View>
        </View>

        {/*  第三方服务*/}
        <View style={{marginHorizontal:7,marginTop:8,backgroundColor: Colors.white ,borderRadius:10}}>
          <Text style={{color:Colors.pay_gray_text_color,fontSize:13,paddingVertical:21,marginLeft:15}}>腾讯服务</Text>
          <View style={{flexDirection:'row',flexWrap: 'wrap',}}>
            {this.thirdData.map((item)=>{
              return this.renderItem(item);
            })}
          </View>
        </View>

        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.page_bg
  },
});
