import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {XImage} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";

export default class ChatTonghHuaCell extends Component {
    render() {
        const data = this.props.data;
        let isSelf = this.props.isSelf;
        return (
            <YHTouchableOpacity style={styles.container}>
                <View style={{flexDirection: 'row', paddingTop: 11, paddingHorizontal: 11, alignItems:'center'}}>
                    {isSelf? null:(<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={{uri:data.userinfo.avatar}} iconSize={38}
                                           onPress={() => {
                                           }}/>)}
                            <View style={{flexDirection:'row',marginLeft:5,flex: 1,marginRight:5,justifyContent:isSelf ? 'flex-end': 'flex-start' }}>
                                {isSelf ? null : <Image style={{width:5,height:12,marginTop:10}} source={require('../../../../resource/index/chat_qp_right.png')}/>}
                                <View style={{justifyContent:'center',minHeight:38,minWidth:75.45,backgroundColor:isSelf ? Colors.qipao_background_color : Colors.white,paddingHorizontal:9,paddingVertical:8,borderRadius:3,marginLeft:-0.5,marginRight:-0.5}}>
                                    {/*<Text style={{fontSize:16,color:Colors.black_text_color,maxWidth: Const.screenWidth - 38-22 - 20 - 18-38}}>{data.text}</Text>*/}
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:isSelf ? 'flex-end': 'flex-start'}}>
                                        {isSelf?null:<XImage icon={data.type == 8? require('../../../../resource/index/chat/chat_list_th.png'):require('../../../../resource/index/chat/chat_list_lyj_r.png')} style={{width:48,height:20,marginRight:5}}/>}
                                        <Text style={{fontSize:13,color:Colors.black_text_color,maxWidth: Const.screenWidth - 38-22 - 20 - 18-38}}>聊天时长{ '  ' +data.yuyintonghua}</Text>
                                        {isSelf?<XImage icon={data.type == 8? require('../../../../resource/index/chat/chat_list_th.png'):require('../../../../resource/index/chat/chat_list_lyj_r.png')} style={{width:20,height:16,marginLeft:5}}/>:null}

                                    </View>
                                </View>
                                {isSelf ? <Image style={{width:5,height:12,marginTop:10}} source={require('../../../../resource/index/chat_qp_left.png')}/> : null}

                            </View>

                    {isSelf ? (<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={{uri:data.userinfo.avatar}} iconSize={38}
                                       onPress={() => {
                                       }}/>): null}
                </View>
            </YHTouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
