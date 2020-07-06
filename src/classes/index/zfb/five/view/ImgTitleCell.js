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

export default class ImgTitleCell extends Component {

    render() {
        let data = this.props.data;
        return (
            <YHTouchableOpacity style={[styles.container, {marginTop: this.props.marginTop || 0}]}
                                onPress={this.props.itemClick}>
                <Image source={data.icon} style={{position:'absolute',left:20,width: data.icon_width || 26, height: data.icon_height ||26, marginRight: 19}}/>
                <Text style={{flex: 1, fontSize: 16,marginLeft:45}}>{data.title}</Text>
                {data.right_icon ? <Image source={data.right_icon} style={{width: 30, height: 30}}/> : null}
                {data.rightText ? (
                    <Text style={{fontSize: 14, color: this.props.sub_color || '#9A9A9A'}}>
                        {data.rightText}
                    </Text>
                ) : null}
                <Image source={require('../../../../resource/common/right.png')}
                       style={{width: 7, height: 14, marginLeft: 11}}/>
                {this.props.hasLine ? <YHDividingLine left={65}/> : null}
            </YHTouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 11,
        height:48,
    },
});
