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
import {Colors} from "../../../../../common/storage/Const";

export default class MsgListCell extends Component {
    render() {
        return (
            <YHTouchableOpacity style={styles.container} onPress={this.props.itemClick}>
                <View style={{flexDirection: 'row', paddingVertical: 11, paddingHorizontal: 15, alignItems:'center'}}>
                    <XImage style={{borderRadius: 5}} icon={require('../../../../resource/images/avatar.png')} iconSize={45}
                            onPress={() => {
                            }}/>
                    <View style={{flex: 1,marginLeft:11,}}>
                        <Text style={{fontSize:16,color:Colors.black_text_color}}>名称</Text>
                        <Text style={{fontSize:12,color:Colors.gray_text_color,marginTop:5}}>[语音消息]</Text>
                    </View>
                    <Text style={{position:'absolute',right:17,top:13,color:Colors.gray_text_color,fontSize:11}}>上午 10:09</Text>
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
});
