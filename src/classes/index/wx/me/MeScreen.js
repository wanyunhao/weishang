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
} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import {Colors} from "../../../../common/storage/Const";
import {XImage} from "react-native-easy-app";
import DiscoveryListCell from "../discovery/view/DiscoveryListCell";

const { width } = Dimensions.get("window");

export default class MeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      // avatar: UserInfoUtil.getUserAvatar()
    };
  }

  refreshUserInfo() {
    this.setState({
      // userInfo: UserInfoUtil.userInfo
    });
  }

  componentWillMount() {
    // CountEmitter.addListener(
    //   "notifyUserInfoUpdated",
    //   this.notifyUserInfoUpdatedListener
    // );
  }

  componentWillUnmount() {
    // CountEmitter.removeListener(
    //   "notifyUserInfoUpdated",
    //   this.notifyUserInfoUpdatedListener
    // );
  }

  notifyUserInfoUpdatedListener = () => {
    // this.refreshUserInfo();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{backgroundColor: Colors.white}}>
            <View style={{marginTop: INSETS.top,height:161.71}}>
              <XImage icon={require('../../../resource/images/avatar.png')} iconSize={58} style={{position:'absolute',left:24,top:65}}/>
              <Text style={{position:'absolute',left:98,top:65,fontSize:20,fontWeight:'bold',color:Colors.black_text_color}}>用户名</Text>
              <XImage icon={require('../../../resource/index/wx/me/xiagnj.png')} style={{position:'absolute',right:16,top:16,width:18.5,height:15}}/>
              <XImage icon={require('../../../resource/index/wx/me/ewm.png')} iconSize={11.32} style={{position:'absolute',bottom:44,right:38}}/>
              <XImage icon={require('../../../resource/common/right.png')} style={{position:'absolute',bottom:40,right:15,width:10,height:20}}/>
            </View>
          </View>
          <DiscoveryListCell marginTop={8} data={{
            title: '支付',
            icon: require('../../../resource/index/wx/me/wd_icon_zf.png'),
          }} itemClick={() => {
            navigation.push('PayScreen');
          }}/>
          <DiscoveryListCell hasLine marginTop={8} data={{
            title: '收藏',
            icon: require('../../../resource/index/wx/me/wd_icon_sc.png'),
          }} itemClick={() => {

          }}/>
          <DiscoveryListCell hasLine data={{
            title: '相册',
            icon: require('../../../resource/index/wx/me/wd_icon_xc.png'),
          }} itemClick={() => {

          }}/>
          <DiscoveryListCell hasLine data={{
            title: '卡包',
            icon: require('../../../resource/index/wx/me/wd_icon_kb.png'),
          }} itemClick={() => {

          }}/>
          <DiscoveryListCell data={{
            title: '表情',
            icon: require('../../../resource/index/wx/me/wd_icon_bq.png'),
          }} itemClick={() => {

          }}/>
          <DiscoveryListCell marginTop={8} data={{
            title: '设置',
            icon: require('../../../resource/index/wx/me/wd_icon_sz.png'),
          }} itemClick={() => {

          }}/>
        </ScrollView>
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
    backgroundColor:Colors.page_bg
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
