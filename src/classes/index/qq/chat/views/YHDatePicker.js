import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {DatePickerView} from "@ant-design/react-native";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {Const} from "../../../../../common/storage/Const";
import Button from "teaset/components/Button/Button";

export default class YHDatePicker extends Component {
    constructor() {
        super();
        this.state = {
            time: new Date()
        }
    }
    render() {
        return (
            <View>
                <DatePickerView
                    style={{width:Const.screenWidth}}
                    value={this.state.time}
                    onChange={(value)=>{
                        this.setState({
                            time:value
                        })
                    }}
                    onValueChange={(vals)=>{
                        // console.log(vals);
                    }}
                />
                <Button style={{marginTop:10}} type={"primary"} title='确定' onPress={()=>{
                    this.props.confirmDate(this.state.time)
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});
