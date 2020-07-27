import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';
import {Colors} from "../../../../../common/storage/Const";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import {XImage} from "react-native-easy-app";
import {RNStorage} from "../../../../../common/storage/AppStorage";

export default class Title2TF extends Component {
    constructor() {
        super();
        this.state = {
            select: 1,
            one:'',
            two:'',
            three:'',
        }
    }

    componentDidMount() {
        if (this.props.select == 1) {
            this.setState({
                select:this.props.select,
                one:this.props.one,
            })
        } else {
            this.setState({
                select:this.props.select,
                two:this.props.one,
                three:this.props.two,
            })
        }
    }

    render() {
        const data = this.props.data;
        return (
            <View style={styles.container}>
                <Text>{data.title}</Text>
                <YHDividingLine isBottom={false} top={40}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <XImage style={{marginRight: 5,}}
                            icon={this.state.select == 1 ? require('../../../../resource/index/chat/hb_send_select.png') : require('../../../../resource/index/chat/hb_send_normal.png')}
                            iconSize={18} onPress={() => {
                        this.setState({
                            select: 1,
                        },()=>{

                            this.callBlock()
                        })
                    }}/>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 14}}>自定义文字</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder={this.state.select == 1?'请输入':''}
                            value={this.state.one}
                            onChangeText={(text) => {
                                this.setState({
                                    one: text
                                },()=>{

                                    this.callBlock()
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <XImage style={{marginRight: 5,}}
                            icon={this.state.select == 2 ? require('../../../../resource/index/chat/hb_send_select.png') : require('../../../../resource/index/chat/hb_send_normal.png')}
                            iconSize={18} onPress={() => {
                        this.setState({
                            select: 2,
                        },()=>{

                            this.callBlock()
                        })

                    }}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>

                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1,}}>
                            <Text style={{fontSize: 14}}>自定义金额</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                keyboardType={'numeric'}
                                placeholder={this.state.select == 2?'请输入':''}
                                value={this.state.two}
                                onChangeText={(text) => {
                                    this.setState({
                                        two: text
                                    },()=>{

                                        this.callBlock()
                                    })
                                }}
                            />
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <Text style={{fontSize: 14}}>利息</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                keyboardType={'numeric'}
                                placeholder={this.state.select == 2?'请输入':''}
                                value={this.state.three}
                                onChangeText={(text) => {
                                    this.setState({
                                        three: text
                                    },()=>{
                                        this.callBlock()
                                    })
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    callBlock() {
        this.props.block(this.state.select,this.state.one,this.state.two,this.state.three,)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.white,
        marginTop:10,
    },
});
