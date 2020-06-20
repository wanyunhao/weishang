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
            color:'red',
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
    }

    spring () {
        this.springValue.setValue(1.1)
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start()
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    _startAnimated() {
        this.timer = setTimeout(
            () => {
                this._startAnimated();
                this.timer && clearTimeout(this.timer);
                // showToast("去你骂的")
            },//延时操作
            500       //延时时间
        );
        this.state.animatedValue.setValue(0);
        this.rotateAnimated.start();

    }
    render() {
        const rotateY = this.state.animatedValue.interpolate({
            inputRange: [0,0.5,1,1.5,2],
            outputRange: ['0deg', '90deg','0deg','90deg', '0deg']
        });
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
            }} onPress={()=>{
                this.spring();
            }}>
                <View style={{alignItems:'center'}}>
                    <Animated.Image source={require('../../../../resource/index/hbxq_bg.png')} style={{width:266.22,height:440.44,transform: [{scale: this.springValue}]}}/>
                    <Image source={require('../../../../resource/index/hbxq_x.png')} style={{width:37.46,height:37.46,marginTop:59}}/>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        this._startAnimated();
                    }}>
                        <Animated.Image source={require('../../../../resource/index/hb_kai.png')} style={{
                            transform: [
                                {rotateY:rotateY},
                            ],
                            width:90,
                            height:90
                        }}/>
                    </TouchableOpacity>
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

