import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,

} from 'react-native';
import {XImage} from "react-native-easy-app";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {Colors, Const} from "../../../../../common/storage/Const";
import {_getTimeStringAutoShort2, updateTimeShow} from "../../../../../common/utils/YHTimeUtil";
import TouchableOpacity from "teaset/components/ListRow/TouchableOpacity";
import {showOperationItems} from "../../../../../compoments/YHUtils";
import {clearRowFromRealm, MSGTableName} from "../../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../../common/storage/AppStorage";

export default class MsgSystemCell extends Component {

    render() {
        const data = this.props.data || {};
        return (
            <TouchableOpacity style={styles.container}  ref={ref => {
                this.ref = ref;
            }} onLongPress={this.props.drag == null ? ()=>{

                let items = [
                    {
                        title: '删除', onPress: () => {
                            clearRowFromRealm(data.id,MSGTableName).then(()=>{
                                this.props.refreshChat()
                            })
                        }
                    },
                    {
                        title: '切换角色', onPress: () => {

                            this.props.changeUser()
                        }
                    },
                    {
                        title: '排序', onPress: () => {
                            this.props.orderClick();
                        }
                    },
                ];
                showOperationItems(this.ref, items)
            } : this.props.drag}>
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:Colors.white,paddingVertical:5,paddingHorizontal:5,borderRadius:3}}>
                        <XImage icon={require('../../../../resource/index/wx_hb_no_open_icon.png')} iconSize={15}/>
                        <Text style={{fontSize:11,marginLeft:3,}}>{data.hongbaoReceiveName}领取了{data.hongbaoSendName}的<Text style={{fontSize:11,color:'#FA9E3B'}}>红包</Text></Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export class MsgSystemDefaultCell extends Component {

    render() {
        const data = this.props.data || {};
        const isSelf = RNStorage.user_id == data.send_id;
        const text = isSelf? "你撤回了一条消息": '"' + data.user_name +'" 撤回了一条消息'
        return (
            <TouchableOpacity style={styles.container}  ref={ref => {
                this.ref = ref;
            }} onLongPress={this.props.drag == null ? ()=>{

                let items = [
                    {
                        title: '删除', onPress: () => {
                            clearRowFromRealm(data.id,MSGTableName).then(()=>{
                                this.props.refreshChat()
                            })
                        }
                    },
                    {
                        title: '切换角色', onPress: () => {

                            this.props.changeUser()
                        }
                    },
                    {
                        title: '排序', onPress: () => {
                            this.props.orderClick();
                        }
                    },
                ];
                showOperationItems(this.ref, items)
            } : this.props.drag}>
                <View style={{alignItems:'center'}}>
                    {this.props.isCheHui ? (
                        <Text style={{color:'#A5A5A5',fontSize:11}}>{text}
                            {isSelf ? (<Text style={{color:'rgb(101,129,127)',fontSize:11}}>  重新编辑</Text>): null}
                        </Text>
                    ):null}
                    {this.props.isOnlyText ? (
                        <Text style={{color:'#A5A5A5',fontSize:11}}>{data.xitongText}</Text>
                    ):null}
                    {this.props.isTime ? (
                        <Text style={{color:'#A5A5A5',fontSize:11}}>{_getTimeStringAutoShort2(parseInt(data.xitongText),true)}</Text>
                    ):null}

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:Const.screenWidth,
        marginTop:10,
    },
});
