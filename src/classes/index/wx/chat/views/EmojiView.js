import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import {XImage} from "react-native-easy-app";
import {Const} from "../../../../../common/storage/Const";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import Smiley from '../uril/Smiley'
export default class EmojiView extends Component {

    constructor() {
        super();
        this.emojis = [];
        for (let i = 0; i < 113; i++) {
            this.emojis.push(i);
        }
    }

    render() {

        return (
            <View style={[styles.container,{paddingBottom:INSETS.bottom,}]}>
                <View style={{height: 57, backgroundColor: '#F7F7F7', flexDirection: 'row', alignItems: 'center'}}>
                    <XImage style={{marginLeft: 17}} icon={require('../../../../resource/index/chat/dd_icon1.png')}
                            iconSize={21.85}/>
                    <XImage style={{marginLeft: 29}} icon={require('../../../../resource/index/chat/dd_icon2.png')}
                            iconSize={17.5}/>
                    <XImage style={{marginLeft: 29}} icon={require('../../../../resource/index/chat/dd_icon1.png')}
                            iconSize={21.85}/>
                    <XImage style={{marginLeft: 29, width: 20.11, height: 17.55}}
                            icon={require('../../../../resource/index/chat/dd_icon4.png')}/>
                    <XImage style={{marginLeft: 29, width: 18.62, height: 23.04}}
                            icon={require('../../../../resource/index/chat/dd_icon5.png')} iconSize={21.85}/>
                </View>
                <ScrollView style={{padding: 15, backgroundColor: '#EDEDED'}}>
                    <Text style={{color: '#000000', fontSize: 13}}>
                        最近使用
                    </Text>
                    <View style={{marginTop: 15, flexDirection: 'row', flexWrap: 'wrap'}}>
                        {[12, 3, 4, 5, 6, 3, 3, 3].map((value, index) => {
                            return (
                                <YHTouchableOpacity style={{
                                    paddingRight: (index > 0 && (index +1) % 8 == 0) ? 0 : ((Const.screenWidth - 270) / 7 - 1),
                                    paddingBottom: 15,
                                }}>
                                    <XImage icon={Smiley.data[index]} iconSize={30}/>
                                </YHTouchableOpacity>

                            )
                        })}
                    </View>
                    <Text style={{color: '#000000', fontSize: 13}}>
                        所有表情
                    </Text>
                    <View style={{marginTop: 15, flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            this.emojis.map((value, index) => {
                                return (
                                    <YHTouchableOpacity style={{
                                        paddingRight: (index > 0 && (index +1) % 8 == 0) ? 0 : ((Const.screenWidth - 270) / 7 - 1),
                                        paddingBottom: 15,
                                    }}>
                                        <XImage icon={Smiley.data[index]}
                                                iconSize={30}/>
                                    </YHTouchableOpacity>

                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Const.screenWidth,
        height: 341,
        position: 'absolute',
        bottom: 0,

    },
});
