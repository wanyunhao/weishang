import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import {XImage, XText, XView} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";
import {RNStorage} from "../../../../../common/storage/AppStorage";

export default class ChooseMemberView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{width: 80,backgroundColor: Colors.white}}>
                    <ScrollView>
                        {this.props.data && this.props.data.map((value,index) => {
                            if (value.user_id == RNStorage.user_id) {
                                return null;
                            }
                            return (
                                <XView onPress={()=>{
                                    this.props.itemClick(index)
                                }} style={{alignItems:'center',marginTop:8}}>
                                    <XImage icon={value.avatar} iconSize={50}/>
                                    <XText style={{fontSize:11,height:13}} text={value.user_name}/>
                                </XView>
                            )
                        })}
                    </ScrollView>
                </View>
                <XView onPress={this.props.selfClick} style={{alignItems:'center',marginTop:8,backgroundColor: Colors.white}}>
                    <XImage icon={this.props.data &&this.props.data[0].avatar} iconSize={50}/>
                    <XText style={{fontSize:11,height:13}} text={this.props.data &&this.props.data[0].user_name}/>
                </XView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        maxHeight:Const.screenWidth,
        width:Const.screenWidth,
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
});
