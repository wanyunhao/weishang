import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Theme} from "teaset";
import {XText} from "react-native-easy-app";
import SliderAntm from "@ant-design/react-native/es/slider";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";

export default class SliderView extends PureComponent {
    constructor() {
        super();
        this.state = {
            silderValue:30,
        }
    }

    render() {
        return (
            <View style={{
                backgroundColor: Theme.defaultColor,
                minWidth: 260,
                minHeight: 100,
                padding: 0,
                borderRadius:5
            }}>
                <View style={{paddingHorizontal:10,paddingVertical:20}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                        <XText style={{fontSize:12}} text='编辑语音时长'/>
                        <XText style={{fontSize:12}} text={this.state.silderValue + 's'}/>
                    </View>
                    <SliderAntm min={0} max={60} step={1} defaultValue={30} onChange={(value)=>{
                        this.setState({
                            silderValue:value
                        })
                    }}/>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <YHTouchableOpacity text='取消' style={{flex:1}} onPress={this.props.cancelClick}/>
                        <YHTouchableOpacity text='确定' style={{flex:1}} onPress={()=>{
                            this.props.confirmClick(this.state.silderValue)
                        }}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
