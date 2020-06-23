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
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Colors, Const} from "../../common/storage/Const";

export default class LoginTF extends Component {

    constructor() {
        super();
        this.state = {
            rightimg: require('../resource/login/login_denglu_a.png'),
            sel: false,
            bottom_color: '#DDDDDD'
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    {this.props.lefticon ? <Image
                        style={styles.left_icon}
                        source={this.props.lefticon}
                    /> : null}

                    <TextInput
                        {...this.props}
                        placeholder={this.props.placeholder}
                        secureTextEntry={this.props.showIcon ? (this.state.sel ? false : true) : false}
                        style={[styles.tf, {marginLeft: this.props.lefticon ? 10 : 28}]}
                        underlineColorAndroid="transparent"
                        onEndEditing={() => {
                            this.setState({bottom_color: '#DDDDDD'})
                        }}
                        onFocus={() => {
                            this.setState({bottom_color: Colors.blue})
                        }}
                    />
                    {this.props.showIcon ?
                        <TouchableOpacity style={styles.eyes} onPress={() => {
                            this.setState({sel: !this.state.sel})
                        }}>
                            <Image
                                source={this.state.sel ? require('../resource/login/login_denglu_m.png') : require('../resource/login/login_denglu_a.png')}
                                style={styles.right_icon}
                            />
                        </TouchableOpacity> : null}
                </View>
                <View style={[styles.line, {backgroundColor: this.state.bottom_color}]}></View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        height: 51,
        width: Const.screenWidth,
    },
    top: {
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
    },
    left_icon: {
        width: 14,
        height: 20,
        marginLeft: 27,
    },
    tf: {
        height: 20,
        fontSize: 15,
        width: Const.screenWidth - 104,
        padding: 0,

    },
    right_icon: {
        width: 20,
        height: 10,

    },
    eyes: {
        position: 'absolute',
        right: 27
    },
    line: {
        marginLeft: 27,
        marginRight: 27,
        height: 0.5,

    }
});

