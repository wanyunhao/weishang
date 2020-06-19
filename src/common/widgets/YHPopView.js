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
    TouchableOpacity,
    Keyboard,
    TextInput,
    LayoutAnimation
} from 'react-native';
import YHDividingLine from './YHDividingLine';
import {Const} from "../storage/Const";

export default class YHPopView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            keyboardSpace: 0,
            text: ''
        };
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }


    _keyboardDidShow(frames) {
        let keyboardSpace = frames.endCoordinates.height;//获取键盘高度
        LayoutAnimation.spring();
        this.setState({
            keyboardSpace: 125 + keyboardSpace - (Const.screenHeight / 2)
        })
    }

    _keyboardDidHide() {
        LayoutAnimation.spring();
        this.setState({
            keyboardSpace: 0
        })
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    static defaultProps = {}


    render() {
        return (
            <TouchableOpacity {...this.props} style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={[{
                    backgroundColor: 'white',
                    width: Const.screenWidth - 100,
                    height: 250,
                    borderRadius: 10,
                    bottom: this.state.keyboardSpace
                },]}>
                    <Text style={styles.title}>讨论</Text>
                    <TextInput
                        style={styles.textView}
                        placeholder='请输入您的想法'
                        multiline={true}
                        placeholderTextColor='#AAAAAA'
                        onChangeText={this.props.getText}
                        underlineColorAndroid="transparent"

                    />
                    <YHDividingLine/>
                    <View style={styles.bottom_view}>
                        <Text style={{
                            width: (Const.screenWidth - 100) / 2,
                            lineHeight: 44,
                            textAlign: 'center',
                            color: '#666666',
                            fontSize: 17
                        }}>取消</Text>
                        <Text style={{
                            width: (Const.screenWidth - 100) / 2,
                            lineHeight: 44,
                            textAlign: 'center',
                            color: '#32A8FC',
                            fontSize: 17
                        }} onPress={this.props.queding}>确定</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )

    }
}

const styles = StyleSheet.create({
    title: {
        height: 44,
        textAlign: 'center',
        lineHeight: 44,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    textView: {
        backgroundColor: '#F6F6F6',
        height: 161,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        fontSize: 14,
        padding: 0,
        textAlignVertical: 'top'
    },
    bottom_view: {
        height: 44,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0)'
    }
});

