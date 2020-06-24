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

export default class DiscoveryListCell extends Component {

    render() {
        let data = this.props.data;
        return (
            <YHTouchableOpacity style={[styles.container, {marginTop: this.props.marginTop || 0}]} onPress={this.props.itemClick}>
                <Image source={data.icon} style={{width:22,height:22,marginRight:15}}/>
                <Text style={{flex:1,fontSize:16}}>{data.title}</Text>
                {data.right_icon ? <Image source={data.right_icon} style={{width:30,height:30}}/> : null}
                {data.rightText ? (
                    <Text style={{fontSize:16,fontWeight:'bold'}}>
                        {data.rightText}
                    </Text>
                ) : null}
                <Image source={require('../../../../resource/common/right.png')} style={{width:7,height:14,marginLeft:11}}/>
                {this.props.hasLine ? <YHDividingLine left={53}/> : null}
            </YHTouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding:15,
        alignItems: 'center',
        backgroundColor: Colors.white
    },
});
