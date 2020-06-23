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
            <TouchableOpacity activeOpacity={1} {...this.props}>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
