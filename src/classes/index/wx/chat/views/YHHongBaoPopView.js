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
    LayoutAnimation,
    Image, Animated, Easing
} from 'react-native';
import {Const} from "../../../../../common/storage/Const";
import {showToast} from "../../../../../common/widgets/Loading";

export default class YHHongBaoPopView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            keyboardSpace: 0,
            text: '',
            animatedValue: new Animated.Value(0),
            color: 'red',
            top1: 0,
            top2: 350,
            showKai: true,
        };
        this.springValue = new Animated.Value(1)

        this.rotateAnimated = Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.in,
            }
        );

        this.animatedValue1 = new Animated.Value(0)
        this.animatedValue2 = new Animated.Value(0)
    }

    spring() {
        this.springValue.setValue(1.1)
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start()
    }

    hbxsdonghua() {
        this.animatedValue1.setValue(0)
        Animated.timing(
            this.animatedValue1,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start(() => this.finishAnimation())

        this.animatedValue2.setValue(0)
        Animated.timing(
            this.animatedValue2,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start(() => this.finishAnimation())
    }

    finishAnimation() {
        this.props.finishAnimation()
    }

    componentWillUnmount() {

    }

    _startAnimated() {
        this.state.animatedValue.setValue(0);
        this.rotateAnimated.start(() => {
            if (!this.stopA) {
                this.stopA = true;
                this.state.animatedValue.setValue(0);
                this.rotateAnimated.start(() => {
                    this.stopA = false;
                    this.setState({
                        showKai: false,
                    })
                    this.hbxsdonghua();
                });
            }
        });

    }

    render() {
        const rotateY = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '90deg', '0deg']
        });

        // const translateY = this.animatedValue1.interpolate({
        //     inputRange: [0, 0],
        //     outputRange: [0, -300]
        // })
        const marginTop = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -Const.screenHeight]
        })
        const marginTop2 = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Const.screenHeight]
        })
        return (
            <TouchableOpacity activeOpacity={1} {...this.props} style={{
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => {
                this.spring();
            }}>
                <View style={{alignItems: 'center'}}>
                    <Animated.View style={{width: 266.22, height: 440.44, transform: [{scale: this.springValue}]}}>
                        <Animated.Image source={require('../../../../resource/index/hb_bg_top.jpg')}
                                        style={{
                                            width: '100%',
                                            height: 350,
                                            marginTop,
                                            position: 'absolute'
                                        }}/>
                        <Animated.Image source={require('../../../../resource/index/hb_bg_bottom.jpg')}
                                        style={{
                                            width: '100%',
                                            height: 110.44,
                                            marginTop: marginTop2,
                                            position: 'absolute',
                                            top:350
                                        }}/>

                        {this.state.showKai ? (
                            <TouchableOpacity style={{position: 'absolute', left: 88.11, bottom: 50}} activeOpacity={1}
                                              onPress={() => {
                                                  this._startAnimated();
                                              }}>
                                <Animated.Image source={require('../../../../resource/index/hb_kai.png')} style={{
                                    transform: [
                                        {rotateY: rotateY},
                                    ],
                                    width: 90,
                                    height: 90
                                }}/>
                            </TouchableOpacity>
                        ): null}
                    </Animated.View>
                    <Image source={require('../../../../resource/index/hbxq_x.png')}
                           style={{width: 37.46, height: 37.46, marginTop: 59}}/>
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

