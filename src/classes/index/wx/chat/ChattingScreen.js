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
  View,
  LayoutAnimation,
} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import HongBaoCell from "./views/HongBaoCell";
import YHHongBaoPopView from "./views/YHHongBaoPopView";

const { width } = Dimensions.get("window");

export default class ChattingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      showHongbao: false
      // avatar: UserInfoUtil.getUserAvatar()
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title='我的' onBack={()=>{
          this.setState({
            showHongbao: !this.state.showHongbao
          })
        }}/>

        {this.state.showHongbao? (
            <HongBaoCell/>
        ): null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: "#D3D3D3"
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: "column",
    backgroundColor: Global.pageBackgroundColor
  },
  meInfoContainer: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 10
  },
  meInfoAvatar: {
    width: 60,
    height: 60
  },
  meInfoTextContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  meInfoNickName: {
    color: "#000000",
    fontSize: 16
  },
  meInfoWeChatId: {
    color: "#999999",
    fontSize: 14,
    marginTop: 5
  },
  meInfoQRCode: {
    width: 25,
    height: 25
  }
});
