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
            place_view_bg_color: Colors.zfb_theme_color
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={this.state.place_view_bg_color}
                           barStyle='light-content'
                           translucent={true}/>
                <View style={{backgroundColor:this.state.place_view_bg_color,height:INSETS.top}}/>
                {this._addSubView()}
            </View>
        );
    }
    _addSubView() {}

    _setPlaceViewBackgroundColor(color) {

        showToast('_setPlaceViewBackgroundColor')
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
