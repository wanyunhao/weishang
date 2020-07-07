import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar,
} from 'react-native';
import {Colors, Const} from "../../../../common/storage/Const";
import {showToast} from "../../../../common/widgets/Loading";

export default class BaseVC extends Component {
    constructor() {
        super();
        this.state = {
            place_view_bg_color: Colors.zfb_theme_color,
            barStyle: 1,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={this.state.place_view_bg_color}
                           barStyle={ this.state.barStyle == 1 ? 'light-content' : 'dark-content'}
                           translucent={true}/>
                <View style={{backgroundColor:this.state.place_view_bg_color,height:INSETS.top}}/>
                {this._addSubView()}
            </View>
        );
    }
    _addSubView() {}

    _setPlaceViewBackgroundColor(color) {

        this.setState({
            place_view_bg_color: color,
        })
    }
    _setBarStyle(barStyle) {

        this.setState({
            barStyle: barStyle,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
