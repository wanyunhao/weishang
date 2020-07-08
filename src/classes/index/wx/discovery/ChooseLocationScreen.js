import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import TitleAndSubCell from "../me/pay/views/TitleAndSubCell";
import BaseVC from "../../zfb/Common/BaseVC";

export default class ChooseLocationScreen extends BaseVC {
    constructor() {
        super();
        this.state = {
            city: '',
            detail: '',
        }
    }
    componentDidMount() {
        this.setState({
            city: this.props.route.params.city,
            detail: this.props.route.params.didian,
        })

        this._setBarStyle(2);
        this._setPlaceViewBackgroundColor('#EDEDED')
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='朋友圈位置' rightText='完成' clickRText={()=>{
                    this.props.route.params.getLocation(this.state.city,this.state.detail)
                    navigation.goBack();
                }}/>
                <TitleAndSubCell isEdit={true} title='输入城市' sub_title='请输入' value={this.state.city} onChangeText={(text) => this.setState({city: text})}/>
                <TitleAndSubCell isEdit={true} title='输入地址' sub_title='请输入' value={this.state.detail} onChangeText={(text) => this.setState({detail: text})}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
