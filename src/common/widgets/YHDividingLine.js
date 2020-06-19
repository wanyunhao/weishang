/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class YHDividingLine extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    static defaultProps = {
        left: 0,
        right: 0,
        isBottom: true
    }

    render() {

        return (
            <View style={[{
                position: 'absolute',
                left: this.props.left,
                backgroundColor: this.props.line_color || '#eeeeee',
                height: 0.5,
                right: this.props.right,
            }, this.props.isBottom ? styles.bottom_line : styles.top_line]}>

            </View>

        )

    }
}

const styles = StyleSheet.create({
    bottom_line: {

        bottom: 0,
    },
    top_line: {

        top: 0,
    }

});

