import React, {Component} from "react";
import Global from "../../../../common/utils/Global";
import {Dimensions, Keyboard, PixelRatio, StyleSheet, View,} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import HongBaoCell from "./views/HongBaoCell";
import {Colors} from "../../../../common/storage/Const";
import MsgListCell from "./views/MsgListCell";
import {XFlatList} from "react-native-easy-app";
import ChatListCell from "./views/ChatListCell";
import ChatZhuanZhangListCell from "./views/ChatZhuanZhangListCell";
import ChatBottomBar from "../../../../views/ChatBottomBar";
import ChatBottomBarView from "./views/ChatBottomBarView";
import MoreView from "../../../../views/MoreView";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {instance, MSGTableName, queryFilterFromRealm, UsersTableName} from "../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {isEmpty} from "../../../../common/utils/Utils";

const { width } = Dimensions.get("window");

export default class ChattingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      showHongbao: false,
      showEmojiView: false,
      showMoreView: false,
      c_data: {},
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      c_data: this.props.route.params.data
    },()=>{
      this.queryChat();
    })
  }

  queryChat() {
    queryFilterFromRealm(MSGTableName,'c_id='+this.state.c_data.id).then((data)=>{
      let dataArray = [];
      for (const dataKey in data) {
        let model = data[dataKey];
        queryFilterFromRealm(UsersTableName,'id=' + model.send_id).then((data1)=>{
          if (!isEmpty(data1)) {
            model.userinfo = data1[0];
            dataArray.push(model);
          }
        })
      }
      this.setState({
        data:dataArray
      })
    });
  }

  componentWillMount() {
  }

  render() {
    let data = ['1', '2','3',4,1,6,7,7,1,1,1,1]
    return (
      <View style={styles.container}>
        <WXNavigationBar title='消息'/>
        {/*<NavigationBar title='消息' onBack={()=>{*/}
        {/*  this.setState({*/}
        {/*    showHongbao: !this.state.showHongbao*/}
        {/*  })*/}
        {/*}}/>*/}

        <XFlatList data={this.state.data}
                   style={{marginBottom:52}}
                   renderItem={({item, index}) => {
                    switch (item.type) {
                      case 1:
                        return (
                            <ChatListCell isSelf={RNStorage.user_id == item.send_id} data={item}/>
                        )
                      case 2:
                        return (
                            <ChatListCell isSelf={RNStorage.user_id == item.send_id}/>
                        )
                      case 3:
                        return (
                            <ChatListCell/>
                        )
                      case 4:
                        return (
                            <ChatZhuanZhangListCell isSelf={RNStorage.user_id == item.send_id}/>
                        )
                      case 5:
                        return (
                            // <ChatZhuanZhangListCell/>
                            <HongBaoCell isSelf={RNStorage.user_id == item.send_id} isReceived={item.isReceived}/>
                        )
                      case 6:
                        return (
                            <ChatZhuanZhangListCell isSelf={RNStorage.user_id == item.send_id} isReceived={item.isReceived}/>
                        )
                      default:
                        break;
                    }
                   }}
        />
        <ChatBottomBarView bottom={220} c_id={this.state.c_data.id} refrshChat={()=>{
          this.queryChat();
        }}/>
        <MoreView/>
        {/*{this.state.showHongbao? (*/}
        {/*    <HongBaoCell finishAnimation={()=>{*/}
        {/*      this.setState({*/}
        {/*        showHongbao: false*/}
        {/*      })*/}
        {/*    }}/>*/}
        {/*): null}*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg
  },
});
