import React, { Component } from "react";
import ListItem from "../../../../views/ListItem";
import Global from "../../../../common/utils/Global";
import Utils from "../../../../common/utils/WXUtils";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";
import ListItemDivider from "../../../../views/ListItemDivider";
import ImageAdapter from "../../../../views/ImageAdapter";
import Emoticons from "react-native-emoticons";

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
  Keyboard,
} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import HongBaoCell from "./views/HongBaoCell";
import YHHongBaoPopView from "./views/YHHongBaoPopView";
import {showToast} from "../../../../common/widgets/Loading";
import ChatBottomBar from "../../../../views/ChatBottomBar";
import MoreView from "../../../../views/MoreView";

const { width } = Dimensions.get("window");

export default class ChattingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      showHongbao: false,
      showEmojiView: false,
      showMoreView: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          // 键盘显示，则隐藏底部View
          this.updateView(false, false);
        }
    );
  }

  updateView = (emoji, more) => {
    this.setState(
        {
          showEmojiView: emoji,
          showMoreView: more
        },
        () => {
          if (emoji || more) {
            Keyboard.dismiss();
          }
        }
    );
  };

  render() {
    var moreView = [];
    if (this.state.showEmojiView) {
      moreView.push(
          <View key={"emoji-view-key"}>
            <View
                style={{
                  width: width,
                  height: 1 / PixelRatio.get(),
                  backgroundColor: Global.dividerColor
                }}
            />
            <View style={{ height: Global.emojiViewHeight }}>
              {/* <EmojiView /> */}
              <Emoticons
                  onEmoticonPress={this._onEmoticonPress}
                  onBackspacePress={this._onBackspacePress}
                  show={this.state.showEmojiView}
                  concise={false}
                  showHistoryBar={false}
                  showPlusBar={false}
              />
            </View>
          </View>
      );
    }
    if (this.state.showMoreView) {
      moreView.push(
          <View key={"more-view-key"}>
            <View
                style={{
                  width: width,
                  height: 1 / PixelRatio.get(),
                  backgroundColor: Global.dividerColor
                }}
            />
            <View style={{ height: Global.addViewHeight }}>
              <MoreView sendImageMessage={this.sendImageMessage.bind(this)} />
            </View>
          </View>
      );
    }
    return (
      <View style={styles.container}>
        <NavigationBar title='我的' onBack={()=>{
          this.setState({
            showHongbao: !this.state.showHongbao
          })
        }}/>

        {this.state.showHongbao? (
            <HongBaoCell finishAnimation={()=>{
              this.setState({
                showHongbao: false
              })
            }}/>
        ): null}
        <ChatBottomBar/>
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
