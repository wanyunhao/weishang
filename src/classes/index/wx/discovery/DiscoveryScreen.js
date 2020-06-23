import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";

const { width } = Dimensions.get("window");

export default class DiscoveryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title='发现' hideBack={true}/>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
