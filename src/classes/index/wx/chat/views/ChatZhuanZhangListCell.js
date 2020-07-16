import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {XImage} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import TouchableOpacity from "teaset/components/ListRow/TouchableOpacity";
import {showOperationItems} from "../../../../../compoments/YHUtils";

export default class ChatZhuanZhangListCell extends Component {
    render() {
        const data = this.props.data;
        let isSelf = this.props.isSelf;
        let isReceived = this.props.isReceived;
        return (
            <TouchableOpacity style={styles.container} {...this.props} ref={ref => {
                this.ref = ref;
            }} onLongPress={this.props.drag != null ? this.props.drag : () => {
                let items = [
                    {
                        title: '删除', onPress: () => {

                        }
                    },
                    {
                        title: '切换角色', onPress: () => {

                        }
                    },
                    {
                        title: '排序', onPress: () => {
                            this.props.orderClick();
                        }
                    },
                ];
                showOperationItems(this.ref, items)
            }}>
                <View style={{flexDirection: 'row', paddingTop: 11, paddingHorizontal: 11, alignItems:'center'}}>
                    {isSelf? null:(<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={data.userinfo.avatar} iconSize={38}
                                           onPress={() => {
                                           }}/>)}
                            <View style={{flexDirection:'row',marginLeft:5,flex: 1,marginRight:5,justifyContent:isSelf ? 'flex-end' : 'flex-start' }}>
                                <View>
                                    {/*{isReceived ? require('../../../../resource/index/wx_zzyl_bg_left.png') : require('../../../../resource/index/wx_zzyl_bg_right.png')}*/}
                                    <Image source={isSelf ? (isReceived ?require('../../../../resource/index/wx_zzyl_bg_right.png') : require('../../../../resource/index/wx_zz_bg_right.png')) :
                                        (isReceived ? require('../../../../resource/index/wx_zzyl_bg_left.png') : require('../../../../resource/index/wx_zz_bg_left.png'))} style={{width:221.62,height:78.52}}/>
                                    <XImage style={{position:'absolute',left:15,top:14}} icon={isReceived ? require('../../../../resource/index/zz_lt_yes.png') : require('../../../../resource/index/wx_zz_icon.png')} iconSize={32}/>
                                    <View style={{position:'absolute',left:49,top:11}}>
                                        <Text style={{fontSize:16,color:Colors.white,fontWeight:'bold'}} >￥{data.zhuanzhangMoney}</Text>
                                        <Text style={{fontSize:12,color:Colors.white,marginLeft:4}} >{isReceived ? (data.received_id == RNStorage.user_id)?'已收款':'已被领取' : data.zhuanzhangText}</Text>
                                    </View>
                                    <Text style={{fontSize:9.5,position:'absolute',left:13,bottom:3,color: isReceived ? '#B0B0B0' : '#999999'}}>微信转账</Text>
                                </View>
                            </View>

                    {isSelf ? (<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={data.userinfo.avatar} iconSize={38}
                                       onPress={() => {
                                       }}/>): null}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
