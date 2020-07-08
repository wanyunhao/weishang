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
            hiddenSafe: false,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'transparent'}
                           barStyle={ this.state.barStyle == 1 ? 'light-content' : 'dark-content'}
                           translucent={true}/>
                {this.state.hiddenSafe ? null : <View style={{backgroundColor:this.state.place_view_bg_color,height:INSETS.top}}/>}
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
    _setTopSafeView(isHidden) {
        this.setState({
            hiddenSafe: isHidden,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
