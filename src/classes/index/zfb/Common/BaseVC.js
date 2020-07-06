import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar,
} from 'react-native';
import {Colors, Const} from "../../../../common/storage/Const";

export default class BaseVC extends Component {
    constructor() {
        super();
        this.state = {
            nav_color: Colors.zfb_theme_color,
            place_view_bg_color: Colors.zfb_theme_color
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={this.state.nav_color}
                           barStyle='light-content'
                           translucent={true}/>
                <View style={{backgroundColor:Colors.zfb_theme_color,height:INSETS.top}}/>
                {this._addSubView()}
            </View>
        );
    }
    _addSubView() {}

    _setNavColor(color) {
        this.setState({
            nav_color: color,
        })
    }

    _setPlaceViewBackgroundColor(color) {

        this.setState({
            place_view_bg_color: color,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
