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
        // console.log('componentDidMount',this.props.data)
        // if (this.props.data.select == 1) {
        //     this.setState({
        //         select:this.props.data.select,
        //         one:this.props.data.one,
        //     })
        // } else {
        //     this.setState({
        //         select:this.props.data.select,
        //         two:this.props.data.one,
        //         three:this.props.data.two,
        //     })
        // }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('nextProps===',nextProps)
        console.log('this.props===',this.props.data)
        if (nextProps.data.select == 1) {
            this.setState({
                select:nextProps.data.select,
                one:nextProps.data.one,
            })
        } else {
            this.setState({
                select:nextProps.data.select,
                two:nextProps.data.one,
                three:nextProps.data.two,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('prevProps===',prevProps)
        // console.log('prevState===',prevState)
        // console.log('this.props===',this.props.data)
        // console.log('prevProps', prevProps)
        // console.log('this.props', this.props.data)
        //
        // if (prevState.select != this.props.data.select) {
        //     if (this.props.data.select == 1) {
        //         this.setState({
        //             select:this.props.data.select,
        //             one:this.props.data.one,
        //         })
        //     } else {
        //         this.setState({
        //             select:this.props.data.select,
        //             two:this.props.data.one,
        //             three:this.props.data.two,
        //         })
        //     }
        // }
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
                            editable={this.state.select == 1}
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
                                editable={this.state.select == 2}
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
                                editable={this.state.select == 2}
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
