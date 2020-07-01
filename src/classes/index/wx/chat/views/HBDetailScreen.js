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

export default class HBDetailScreen extends Component {

    render() {
        return (
            <View style={[CommonStyles.container, {marginTop: INSETS.top,backgroundColor: Colors.white}]}>
                <StatusBar backgroundColor="#F25542"
                           barStyle='light-content'
                           translucent={true}
                           hidden={false}
                           animated={true}/>
               <View style={{width:Const.screenWidth,height:88}} >
                   <XImage resizeMode='stretch' style={{width:Const.screenWidth,height:88,position:'absolute'}} icon={require('../../../../resource/index/chat/wx_hbxq_bg.png')}/>
                   <View style={{paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                       <XImage style={{width:15,height:22}} icon={require('../../../../resource/index/chat/back_white_yy.png')} onPress={this.props.closeHB}/>
                       <XImage style={{width:24,height:19.3}} icon={require('../../../../resource/index/chat/hbxq_more.png')}/>
                   </View>
               </View>
                <XFlatList
                    data={['1',2]}
                    ListHeaderComponent={() => {
                        return this._renderHeader();
                    }}
                    renderItem={({item, index}) => {
                        return this._renderCell(item,index);
                    }}
                />
            </View>
        );
    }

    _renderHeader() {
        return (
            <View style={{alignItems:'center',marginTop:27,paddingBottom:67}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <XImage style={{borderRadius:2}} icon={require('../../../../resource/images/avatar.png')} iconSize={21}/>
                    <XText style={{fontSize:18,color:'#191919',marginLeft:7}} text='a.l的红包'/>
                    <XText style={{width:17,height: 17,lineHeight:17,fontSize:11,color:Colors.white,backgroundColor:'#CFAC74',textAlign:'center',marginLeft:7}} text='拼' onPress={()=>{}}/>
                </View>
                <XText style={{color:'#B3B3B3',fontSize:13,marginTop:7}} text='过年好'/>
                <View style={{marginTop:15,flexDirection:'row',alignItems:'flex-end'}}>
                    <XText style={{color:'#CFAC74',fontSize:54,fontWeight:'bold'}} text='88.08'/>
                    <XText style={{color:'#C2A472',fontSize:14,marginLeft:8,marginBottom:12,}} text='元'/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <XText style={{color:'#CFAC74',fontSize:13,}} text='已存入零钱，可直接提现'/>
                    <XImage style={{width: 6.31,height: 11.19,marginLeft:3}} icon={require('../../../../resource/index/chat/hbxq_more_jt.png')}/>
                </View>
            </View>
        )
    }

    _renderCell(item,index) {
        return (
            <View style={{flexDirection:'row',alignItems:'center',paddingVertical:11,paddingHorizontal:15,}}>
                <Image style={{borderRadius:4,width: 45,height: 45}} source={require('../../../../resource/images/avatar.png')}/>
                <View style={{marginLeft:10,flex:1}}>
                    <XText style={{color:'#191919',fontSize:19}} text='达菲林'/>
                    <XText style={{color:'#B3B3B3',fontSize:13,}} text='1月25日 17:30'/>
                </View>
                <XText style={{color:'#191919',fontSize:16}} text='1.08元'/>
                <YHDividingLine left={72}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:Const.screenWidth,
        height:Const.screenHeight,
    },
});
