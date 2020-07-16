import React, {Component} from 'react';
import {StyleSheet, Text, View, Image,Clipboard} from 'react-native';
import {XImage} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";
import TouchableOpacity from "teaset/components/ListRow/TouchableOpacity";
import {showOperationItems} from "../../../../../compoments/YHUtils";
import {clearRowFromRealm, MSGTableName} from "../../../../../common/utils/RealmUtil";

export default class ChatListCell extends Component {
    render() {
        const data = this.props.data;
        let isSelf = this.props.isSelf;
        return (
            <TouchableOpacity style={styles.container} ref={ref => {
                this.ref = ref;
            }} onLongPress={this.props.drag != null ? this.props.drag : () => {
                let items = [
                    // {
                    //     title: '修改', onPress: () => {
                    //
                    //     }
                    // },
                    {
                        title: '复制', onPress: () => {
                            Clipboard.setString(data.text);
                        }
                    },
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
            }}>
                <View style={{flexDirection: 'row', paddingTop: 11, paddingHorizontal: 11, alignItems: 'center'}}>
                    {isSelf ? null : (
                        <XImage style={{borderRadius: 5, alignSelf: 'flex-start'}} icon={{uri: data.userinfo.avatar}}
                                iconSize={38}
                                onPress={() => {
                                }}/>)}
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 5,
                        flex: 1,
                        marginRight: 5,
                        justifyContent: isSelf ? 'flex-end' : 'flex-start'
                    }}>
                        {isSelf ? null : <Image style={{width: 5, height: 12, marginTop: 10}}
                                                source={require('../../../../resource/index/chat_qp_right.png')}/>}
                        <View style={{
                            backgroundColor: isSelf ? Colors.qipao_background_color : Colors.white,
                            paddingHorizontal: 9,
                            paddingVertical: 8,
                            borderRadius: 3,
                            marginLeft: -0.5,
                            marginRight: -0.5
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: Colors.black_text_color,
                                maxWidth: Const.screenWidth - 38 - 22 - 20 - 18 - 38
                            }}>{data.text}</Text>
                        </View>
                        {isSelf ? <Image style={{width: 5, height: 12, marginTop: 10}}
                                         source={require('../../../../resource/index/chat_qp_left.png')}/> : null}

                    </View>

                    {isSelf ? (
                        <XImage style={{borderRadius: 5, alignSelf: 'flex-start'}} icon={{uri: data.userinfo.avatar}}
                                iconSize={38}
                                onPress={() => {
                                }}/>) : null}
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
