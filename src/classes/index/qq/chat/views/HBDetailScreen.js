import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar,
    FlatList,
} from 'react-native';
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {XFlatList, XImage, XText} from "react-native-easy-app";
import {Colors, CommonStyles, Const} from "../../../../../common/storage/Const";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import {queryFilterFromRealm, WXHBLQListTableName} from "../../../../../common/utils/RealmUtil";
import {_getTimeStringAutoShort2} from "../../../../../common/utils/YHTimeUtil";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {isEmpty} from "../../../../../common/utils/Utils";

export default class HBDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                userinfo: {

                }
            },
            list: [

            ]
        }
    }

    render() {
        return (
            <View style={[CommonStyles.container, {marginTop: Const.isIos ? 0 : INSETS.top,backgroundColor: Colors.white}]}>
                <StatusBar backgroundColor="#F25542"
                           barStyle='light-content'
                           translucent={true}
                           hidden={false}
                           animated={true}/>
                {Const.isIos ? (<View style={{width: Const.screenWidth,height: INSETS.top,backgroundColor:'#F25542'}}>

                </View>) : null}
               <View style={{width:Const.screenWidth,height:88}} >
                   <XImage resizeMode='stretch' style={{width:Const.screenWidth,height:88,position:'absolute'}} icon={require('../../../../resource/index/chat/wx_hbxq_bg.png')}/>
                   <View style={{paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                       <XImage style={{width:15,height:22}} icon={require('../../../../resource/index/chat/back_white_yy.png')} onPress={this.props.closeHB}/>
                       <XImage style={{width:24,height:19.3}} icon={require('../../../../resource/index/chat/hbxq_more.png')}/>
                   </View>
               </View>
                <FlatList
                    data={this.state.list}
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
        const isGroup = this.state.data.totalhongbaoCount > 0;
        return (
            <View style={{alignItems:'center',marginTop:27,paddingBottom:67}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <XImage style={{borderRadius:2}} icon={this.state.data.userinfo.avatar} iconSize={21}/>
                    <XText style={{fontSize:18,color:'#191919',marginLeft:7}} text={this.state.data.userinfo.user_name + '的红包'}/>
                    {isGroup ? (<XText style={{width:17,height: 17,lineHeight:17,fontSize:11,color:Colors.white,backgroundColor:'#CFAC74',textAlign:'center',marginLeft:7}} text='拼' onPress={()=>{}}/>):null}
                </View>
                <XText style={{color:'#B3B3B3',fontSize:13,marginTop:7}} text={this.state.data.hongbaoText}/>
                {!isGroup && (this.state.data.send_id == RNStorage.user_id) ? null : (
                    <>
                    <View style={{marginTop:15,flexDirection:'row',alignItems:'flex-end'}}>
                        <XText style={{color:'#CFAC74',fontSize:54,fontWeight:'bold'}} text={!isEmpty(this.state.list)?this.state.list[0].money:''}/>
                        <XText style={{color:'#C2A472',fontSize:14,marginLeft:8,marginBottom:12,}} text='元'/>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <XText style={{color:'#CFAC74',fontSize:13,}} text='已存入零钱，可直接提现'/>
                    <XImage style={{width: 6.31,height: 11.19,marginLeft:3}} icon={require('../../../../resource/index/chat/hbxq_more_jt.png')}/>
                    </View>
                    </>
                ) }
            </View>
        )
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        },()=>{
            // console.log('data====',this.state.data);
            queryFilterFromRealm(WXHBLQListTableName,'isLq=true AND msg_id='+ this.state.data.id).then((data1)=>{
                console.log('data1====',data1);
                this.setState({
                    list:data1
                })
            })
        })

    }

    _renderCell(item,index) {
        return (
            <View style={{flexDirection:'row',alignItems:'center',paddingVertical:11,paddingHorizontal:15,}}>
                <XImage style={{borderRadius:4}} icon={item.avatar} iconSize={45}/>
                <View style={{marginLeft:10,flex:1}}>
                    <XText style={{color:'#191919',fontSize:19}} text={item.user_name}/>
                    <XText style={{color:'#B3B3B3',fontSize:13,}} text={_getTimeStringAutoShort2(parseInt(item.lqTime),true)}/>
                </View>
                <XText style={{color:'#191919',fontSize:16}} text={item.money + '元'}/>
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
