import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Theme, Wheel} from "teaset";
import {Const} from "../../../../../common/storage/Const";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";

export default class Wheel3View extends PureComponent {
    constructor() {
        super();
        this.state = {
            one:0,
            two:0,
            three:0,
        }
        this.oneList = [];
        this.twoList = [];
        this.threeList = [];
        for (let i = 0; i < 24; i++) {
            this.oneList.push(i + '时');
        }
        for (let i = 0; i < 60; i++) {
            this.twoList.push(i + '分');
        }
        for (let i = 0; i < 60; i++) {
            this.threeList.push(i + '秒');
        }
        this.widd = Const.screenWidth / 3 - 1;
        this.params = {

        }
    }

    render() {
        return (
            <>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:Const.screenWidth,padding:15}}>
                <Text>{this.state.one + '时' + this.state.two + '分' + this.state.three + '秒'}</Text>
                <YHTouchableOpacity text='完成' onPress={()=>{
                    this.props.time(this.state.one,this.state.two,this.state.three)
                }}/>
            </View>
            <View style={{backgroundColor: Theme.defaultColor, padding: 20, flexDirection: 'row', justifyContent: 'center'}}>

                <Wheel
                    style={{height: 200, width: this.widd}}
                    itemStyle={{textAlign: 'center'}}
                    items={this.oneList}
                    onChange={index => {
                        this.setState({
                            one:index,
                        })
                    }}
                />
                <Wheel
                    style={{height: 200, width: this.widd}}
                    itemStyle={{textAlign: 'center'}}
                    items={this.twoList}
                    onChange={index => {
                        this.setState({
                            two:index,
                        })
                    }}
                />
                <Wheel
                    style={{height: 200, width: this.widd}}
                    itemStyle={{textAlign: 'center'}}
                    items={this.twoList}
                    onChange={index => {
                        this.setState({
                            three:index,
                        })
                    }}
                />
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
