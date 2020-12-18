import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, ScrollView,
} from 'react-native';
import {Const} from "../../../../../../common/storage/Const";

export default class ChangYongView extends Component {
    render() {
        return (
            <View style={{width: Const.screenWidth,alignItems:'center',position:'absolute',bottom:22,left:0}}>
                <Text style={{color:'#5C6B8C',fontSize:13}}>帮助中心</Text>
                <Text style={{color:'#7F7F7F',fontSize:13,marginTop:7}}>本服务由财付通提供</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
