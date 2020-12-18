import React, { Component } from "react";
import ListItem from "../../../../views/ListItem";
import Global from "../../../../common/utils/Global";
import Utils from "../../../../common/utils/WXUtils";
import PinyinUtil from "../../../../common/utils/PinyinUtil";
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
  FlatList
} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import SideBar from "./views/SideBar";
import {showToast} from "../../../../common/widgets/Loading";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {
  clearAllFromRealm, MSGTableName,
  queryAllFromRealm,
  queryFilterFromRealm,
  UsersTableName, writeToRealm,
  WXConversationTableName, WXGroupMemberTableName
} from "../../../../common/utils/RealmUtil";
import {XImage} from "react-native-easy-app";
import BaseVC from "../../zfb/Common/BaseVC";
import {isEmpty} from "../../../../common/utils/Utils";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {Notify} from "../../../../common/events/Notify";
import {showModalOperation, showOverlayModal} from "../../../../compoments/YHUtils";
import NewPersonView, {TwoInputView} from "../chat/views/NewPersonView";
import Overlay from "teaset/components/Overlay/Overlay";

const { width } = Dimensions.get("window");

export default class ContactScreen extends BaseVC {

  constructor(props) {
    super(props);
    this.state = {
      contactData: [], // 联系人数据
      listData: null, // 整个列表的数据
      hideBack: true
    };
  }

  componentDidMount() {

    this._setBarStyle(2);
    this._setPlaceViewBackgroundColor('#EDEDED')
    this._requestData()
    if (this.props.route.params != null) {

      this.setState({
        hideBack: false
      })
      this.chooseItem = this.props.route.params.chooseItem;
    }
  }

  _requestData() {
    queryAllFromRealm(UsersTableName).then((data)=>{
      this.setState({
        contactData:data,
      })
    })
  }

  _renderItem = item => {
    var msgDotView = null;
    if (
        item.item.key == 0 &&
        item.item.title == "消息" &&
        this.state.unreadMsgCount > 0
    ) {
      msgDotView = (
          <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: "#FF0000",
                borderRadius: 90,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 18
              }}
          >
            <Text style={{ fontSize: 10, color: "#FFFFFF" }}>
              {"" + this.state.unreadMsgCount}
            </Text>
          </View>
      );
    }
    var section = [];
    if (item.item.sectionStart) {
      section.push(
          <Text key={"section" + item.item.key} style={listItemStyle.sectionView}>
            {item.item.firstLetter}
          </Text>
      );
    }
    // if (item.item.firstLetter && item.item.title) {
    //   this.downloadUserAvatarThumb(item.item.title);
    // }
    return (
        <View>
          {section}
          <TouchableHighlight
              underlayColor={Global.touchableHighlightColor}
              onPress={() => {
                this.onListItemClick(item);
              }}
          >
            <View style={listItemStyle.container} key={"item" + item.item.key}>
              <View style={listItemStyle.image}>
                {/*<ImageAdapter path={item.item.icon} width={35} height={35} />*/}
                <XImage icon={item.item.icon} iconSize={35}/>
              </View>
              {/* <Image style={listItemStyle.image} source={item.item.icon} /> */}
              <Text style={listItemStyle.itemText}>{item.item.title}</Text>
              {msgDotView}
            </View>
          </TouchableHighlight>
          {/*<YHDividingLine left={65}/>*/}
          <View
              key={"divider-" + item.item.key}
              style={{
                width: width,
                height: 1 / PixelRatio.get(),
                backgroundColor: Global.dividerColor,
                marginLeft: 68,
              }}
          />
        </View>
    );
  };


  onListItemClick(item) {
    let index = item.item.key;
    if (index == 0) {
      // 新的朋友
      // this.props.navigation.navigate("FriendMsg", {
      //   title: "新的朋友",
      //   data: item.item
      // });
      navigation.push('WXNewFriendScreen',{refreshList:()=>{
        this._requestData()
        }});
    } else if (index >= 1 && index <= 3) {
      showToast("没东西")
    } else {
      if (this.chooseItem != null) {
        this.chooseItem(item.item);
        navigation.goBack();
      } else {
        queryFilterFromRealm(WXConversationTableName,'df_user_id=' + item.item.id).then((res)=>{
          if (isEmpty(res)) {
            let pra_id = getNow();
            writeToRealm({
              id: pra_id,
              app: 1,//1 单聊 2 群聊
              type: 1,//1 单聊 2 群聊
              user_id: parseInt(RNStorage.user_id),
              df_user_id: item.item.id,
              last_time:pra_id,
            },WXConversationTableName).then((res)=>{
              navigation.push('ChattingScreen',{c_id:pra_id});//1594277045186,
              Notify.Refresh_conversation_list.sendEvent({})
            })
          } else {
            navigation.push('ChattingScreen',{c_id:res[0].id});//1594277045186,
          }
        })
      }
      // this.props.navigation.navigate("ContactDetail", {
      //   title: "详细资料",
      //   data: item.item
      // });
    }
  }

  _getItemLayout = (data, index) => {
    let len = data.sectionStart ? 58 : 51;
    let dividerHeight = 1 / PixelRatio.get();
    return {
      length: len,
      offset: (len + dividerHeight) * index,
      index
    };
  };


  _addSubView() {
    var listData = [];
    var headerListData = [];
    var headerImages = [
      require("../../../resource/index/wx/lxr/wx_icon_xdpy.png"),
      require("../../../resource/index/wx/lxr/wx_icon_ql.png"),
      require("../../../resource/index/wx/lxr/wx_icon_bq.png"),
      require("../../../resource/index/wx/lxr/wx_icon_gzh.png"),
    ];
    var headerTitles = ["新的朋友", "群聊", "标签", "公众号"];
    var index = 0;
    for (var i = 0; i < headerTitles.length; i++) {
      headerListData.push({
        key: index++,
        title: headerTitles[i],
        nick: "",
        icon: headerImages[i],
        sectionStart: false
      });
    }
    var contacts = this.state.contactData;
    for (var i = 0; i < contacts.length; i++) {
      var item = contacts[i];
      var name = item.user_name;
      var pinyin = PinyinUtil.getFullChars(item.user_name).toUpperCase();
      // var pinyin = contacts[i].pinyin.toUpperCase();
      var firstLetter = pinyin.substring(0, 1);
      if (firstLetter < "A" || firstLetter > "Z") {
        firstLetter = "#";
      }
      let icon = item.avatar || require("../../../resource/images/avatar.png");
      // if (!Utils.isEmpty(item.avatarThumbPath)) {
      //   icon = item.avatarThumbPath;
      //   // if (Platform.OS === "android") {
      //   //   icon = { uri: "file://" + item.avatarThumbPath };
      //   // } else {
      //   //   icon = { uri: item.avatarThumbPath };
      //   // }
      // }
      listData.push({
        key: index++,
        icon: icon,
        title: item.user_name,
        nick: name,
        id:item.id,
        pinyin: pinyin,
        firstLetter: firstLetter,
        sectionStart: false
      });
    }
    // 按拼音排序
    listData.sort(function(a, b) {
      if (a.pinyin === undefined || b.pinyin === undefined) {
        return 1;
      }
      if (a.pinyin > b.pinyin) {
        return 1;
      }
      if (a.pinyin < b.pinyin) {
        return -1;
      }
      return 0;
    });
    listData = headerListData.concat(listData);
    // 根据首字母分区
    for (var i = 0; i < listData.length; i++) {
      var obj = listData[i];
      if (obj.pinyin === undefined) {
        continue;
      }
      if (i > 0 && i < listData.length) {
        var preObj = listData[i - 1];
        if (preObj.pinyin === undefined && obj.pinyin !== undefined) {
          obj.sectionStart = true;
        } else if (
            preObj.pinyin !== undefined &&
            obj.pinyin !== undefined &&
            preObj.firstLetter !== obj.firstLetter
        ) {
          obj.sectionStart = true;
        }
      }
    }
    this.listData = listData;
    return (
      <View style={styles.container}>
        <WXNavigationBar title='通讯录' hideBack={this.state.hideBack} rightText='添加' clickRText={() => {
          let items = [
            {
              text: '添加好友', onPress: () => {
                const key = showOverlayModal('zoomOut', true, <NewPersonView cancelClick={() => {
                  Overlay.hide(key);
                }} confirmClick={(value) => {

                  let pra_id = getNow();
                  writeToRealm({
                    id: pra_id,
                    user_name: value.name,
                    avatar: value.icon,
                  }, UsersTableName).then((res) => {
                    this._requestData();
                  })
                  Overlay.hide(key);
                }}/>);
              }
            },
            {
              text: '退出小微', onPress: () => {
                navigation.goBack();
              }
            },
          ];
          showModalOperation(items);

        }}/>
        <View style={styles.content}>
          <FlatList
              ref={"list"}
              data={listData}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => "list-item-" + index}
              getItemLayout={this._getItemLayout}
          />
          <SideBar
              onLetterSelectedListener={this.onSideBarSelected.bind(this)}
          />
        </View>
      </View>
    );
  }

  onSideBarSelected(letter) {
    if (this.listData) {
      for (let i = 0; i < this.listData.length; i++) {
        let item = this.listData[i];
        if (item.firstLetter == letter && item.sectionStart) {
          showToast(letter)
          this.refs.list.scrollToIndex({ viewPosition: 0, index: i });
          break;
        }
      }
    }
  }
  turnOnPage(pageName, params) {
    // if (Utils.isEmpty(params)) {
    //   this.props.navigation.navigate(pageName);
    // } else {
    //   this.props.navigation.navigate(pageName, params);
    // }
  }
}


const listItemStyle = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  image: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8
  },
  itemText: {
    fontSize: 15,
    color: "#000000"
  },
  subText: {
    fontSize: 15,
    color: "#999999",
    flex: 1
  },
  sectionView: {
    width: width,
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    color: "#999999"
  }
});

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
    flexDirection: "row",
    backgroundColor: Global.pageBackgroundColor
  }
});
