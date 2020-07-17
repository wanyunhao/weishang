import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, ScrollView,
    TextInput,
} from 'react-native';
import {Colors, Const} from "../../../../../../common/storage/Const";
import {XImage} from "react-native-easy-app";
import YHDividingLine from "../../../../../../common/widgets/YHDividingLine";

export default class TitleAndSubCell extends Component {
    render() {
        return (
            <View style={[{backgroundColor:Colors.white,width: Const.screenWidth,alignItems:'center',justifyContent:'space-between',flexDirection:'row',height:50,paddingHorizontal:15},this.props.viewStyle]}>
                <Text style={{color:'#5C6B8C',fontSize:13}}>{this.props.title}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput {...this.props} style={{color:'#7F7F7F',fontSize:13,textAlign:'right'}} placeholder={this.props.sub_title} editable={this.props.isEdit}/>
                    {this.props.isEdit? null : (<XImage iconSize={17} icon={require('../../../../../resource/common/right.png')}/>)}
                </View>
                <YHDividingLine/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
