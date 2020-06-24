import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class YHTouchableOpacity extends Component {
    render() {
        return (
            this.props.text ? (
                <TouchableOpacity activeOpacity={1} {...this.props} style={[this.props.style,{alignItems:'center',justifyContent:'center'}]}>
                    <Text style={this.props.textStyle}>{this.props.text}</Text>
                </TouchableOpacity>
            ): (
                <TouchableOpacity activeOpacity={1} {...this.props}>

                </TouchableOpacity>
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
