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
import moment from 'moment';
import {_getTimeStringAutoShort2} from "../../../../../common/utils/YHTimeUtil";

export default class MsgListCell extends Component {

    computedAvatar(avatarList) {
        if (avatarList.length > 4) {
            return styles.avatarItem_3
        } else if (avatarList.length > 1) {
            return styles.avatarItem_2
        } else {
            return styles.avatarItem_1
        }
    }

    render() {
        const data = this.props.data || {};
        const isGroup = data.type == 2;
        // console.log(data.group_info.length);
        if (isGroup && data.group_info.length > 9) {
            data.group_info.splice(9);
        }
        return (
            <YHTouchableOpacity style={styles.container} onPress={this.props.itemClick}>
                <View style={{flexDirection: 'row', paddingVertical: 11, paddingHorizontal: 15, alignItems: 'center'}}>
                    {!isGroup ?
                        <XImage style={{borderRadius: 5}} icon={{uri: data.userinfo.avatar}} iconSize={45}/> : (
                            <View style={styles.avatarF}>
                                {data.group_info.map((value, index) => {
                                    return (<XImage style={this.computedAvatar(data.group_info)} icon={value.avatar}/>)
                                })}
                            </View>
                        )}

                    <View style={{flex: 1, marginLeft: 11,}}>
                        <Text style={{fontSize: 16, color: Colors.black_text_color}}>{isGroup?data.group_name:data.userinfo.user_name}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: Colors.gray_text_color,
                            marginTop: 5,
                            height: 15,
                            maxWidth: Const.screenWidth - 150
                        }}>{data.last_type}</Text>
                    </View>
                    <Text style={{
                        position: 'absolute',
                        right: 17,
                        top: 13,
                        color: Colors.gray_text_color,
                        fontSize: 11
                    }}>{
                        // moment(data.last_time).startOf('hour').fromNow()
                        // moment(data.last_time).format('a h:mm')
                        _getTimeStringAutoShort2(data.last_time, false)
                    }</Text>
                </View>
                <YHDividingLine left={78}/>
            </YHTouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarF: {
        width: 45,
        flexDirection:'row',
        height: 45,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap-reverse',
        backgroundColor: '#EDEDED',
        borderRadius:4,
        padding:1,
        // border: #000 1px solid;
        // margin: 30px;
    },

    avatarItem_1: {
        width: '98%',
        height: '98%',
    },

    avatarItem_2: {
        width: '47%',
        height: '47%',
        margin: '1%',
    },

    avatarItem_3: {
        width: '30%',
        height: '30%',
        margin: '1%',
    }
});
