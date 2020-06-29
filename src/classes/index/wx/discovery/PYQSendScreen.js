import React, {Component} from "react";

import {Text, StyleSheet, View,ScrollView,Image,TextInput} from "react-native";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors, Const} from "../../../../common/storage/Const";
import {XFlatList, XImage, XText} from "react-native-easy-app";
import {RNStorage} from "../../../../common/storage/AppStorage";
import MsgListCell from "../chat/views/MsgListCell";
import {PYQListTableName, queryAllFromRealm} from "../../../../common/utils/RealmUtil";
import DiscoveryListCell from "./view/DiscoveryListCell";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import {NavigationPage, ActionPopover, Button,ActionSheet} from 'teaset';
export default class PYQSendScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            city: null,
            didian: null,
            userinfo: {},
            date:"2016-05-15",
            datetime1: '2016-05-05 20:00'
        };
        this.imgWidth = (Const.screenWidth - 38) / 4;
    }


    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar noLine nav_bg_color={Colors.white} rightText='完成' clickRText={()=>{

                }}/>
                <View style={{paddingHorizontal:15,marginTop:20}}>
                    <TextInput style={{fontSize:16,color:'#7E7E7E',maxHeight:100,}} placeholder='这一刻的想法…' multiline={true}/>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', marginTop:8}}>
                        {[1,2,3,4,5,7].map((value)=>{
                            return (
                                <View style={{width:this.imgWidth,height:this.imgWidth,backgroundColor: 'blue',marginRight:2,marginTop:2}}/>
                            )
                        })}
                    </View>
                    <YHTouchableOpacity style={{flexDirection:'row',alignItems:'center',height:50,justifyContent:'space-between'}} onPress={()=>{
                        navigation.push('ChooseLocationScreen',{city:this.state.city,didian:this.state.didian,getLocation:(city,detail)=>{
                            this.setState({
                                city,
                                didian:detail
                            })
                            }});
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage style={{width:14.11,height:16.53,marginRight:8}} icon={require('../../../resource/index/wx/fx/fb_icon_adress.png')}/>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>所在位置</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>{(this.state.city || '') + (this.state.didian || '')}</Text>
                            <XImage style={{marginLeft:10}} icon={require('../../../resource/common/right.png')} iconSize={17}/>
                        </View>
                    </YHTouchableOpacity>
                    <YHTouchableOpacity style={{flexDirection:'row',alignItems:'center',height:50,justifyContent:'space-between'}} onPress={()=>{
                        navigation.push('ContactScreen',{fromChoose:true,chooseItem:(item)=>{
                            this.setState({
                                userinfo:item,
                            })
                        }})
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage style={{marginRight:8}} icon={require('../../../resource/index/wx/fx/fb_icon_fbz.png')} iconSize={17.5}/>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>发布者</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>{this.state.userinfo.title}</Text>
                            <XImage style={{marginLeft:10}} icon={require('../../../resource/common/right.png')} iconSize={17}/>
                        </View>
                    </YHTouchableOpacity>
                    <YHTouchableOpacity ref='apButton' style={{flexDirection:'row',alignItems:'center',height:50,justifyContent:'space-between'}} onPress={()=>{
                        navigation.push('Home');
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage style={{marginRight:8}} icon={require('../../../resource/index/wx/fx/fb_icon_time.png')} iconSize={17.5}/>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>发布时间</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>

                            {/*<Label size='xl' text='Hello world!' />*/}
                            <XImage style={{marginLeft:10}} icon={require('../../../resource/common/right.png')} iconSize={17}/>
                        </View>
                    </YHTouchableOpacity>

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
