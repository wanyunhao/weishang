import React, { Component } from "react";
import ListItem from "../../../../views/ListItem";
import Global from "../../../../common/utils/Global";
import Utils from "../../../../common/utils/WXUtils";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";
import ListItemDivider from "../../../../views/ListItemDivider";
import ImageAdapter from "../../../../views/ImageAdapter";

import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";

const { width } = Dimensions.get("window");

export default class ContactScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title='通讯录' hideBack={true}/>
      </View>
    );
  }

  turnOnPage(pageName, params) {
    // if (Utils.isEmpty(params)) {
    //   this.props.navigation.navigate(pageName);
    // } else {
    //   this.props.navigation.navigate(pageName, params);
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
