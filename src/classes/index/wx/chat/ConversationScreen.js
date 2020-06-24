import React, {Component} from "react";
import Global from "../../../../common/utils/Global";
import {Dimensions, Keyboard, PixelRatio, StyleSheet, View,} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import HongBaoCell from "./views/HongBaoCell";
import {XFlatList} from "react-native-easy-app";
import MsgListCell from "./views/MsgListCell";
import {Colors} from "../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";

const {width} = Dimensions.get("window");

export default class ConversationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }

    render() {
        let data = ['1', '2']
        return (
            <View style={styles.container}>
                <WXNavigationBar title='微信' hideBack={true}/>
                <XFlatList data={data}
                           style={{backgroundColor: Colors.white}}
                           renderItem={({item, index}) => <MsgListCell itemClick={() => {
                               navigation.push('ChattingScreen');
                           }}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
