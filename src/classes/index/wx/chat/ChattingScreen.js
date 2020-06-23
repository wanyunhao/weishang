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
  }

  render() {

    let data = ['1', '2','3',4,1,6,7,7,1,1,1,1]
    return (
      <View style={styles.container}>
        <NavigationBar title='消息' onBack={()=>{
          this.setState({
            showHongbao: !this.state.showHongbao
          })
        }}/>

        <XFlatList data={data}
                   renderItem={({item, index}) => {
                    switch (index) {
                      case 0:
                        return (
                            <HongBaoCell/>
                        )
                      case 1:
                        return (
                            <HongBaoCell/>
                        )
                      case 2:
                        return (
                            <ChatListCell isSelf/>
                        )
                      case 3:
                        return (
                            <ChatListCell/>
                        )
                      case 4:
                        return (
                            <ChatZhuanZhangListCell isSelf/>
                        )
                      case 5:
                        return (
                            <ChatZhuanZhangListCell/>
                        )
                      case 6:
                        return (
                            <ChatZhuanZhangListCell isSelf isReceived/>
                        )
                      case 7:
                        return (
                            <ChatZhuanZhangListCell isReceived/>
                        )
                      case 8:
                        return (
                            <HongBaoCell isSelf/>
                        )
                      case 9:
                        return (
                            <HongBaoCell/>
                        )
                      case 10:
                        return (
                            <HongBaoCell isSelf isReceived/>
                        )
                      case 11:
                        return (
                            <HongBaoCell isReceived/>
                        )
                      default:
                        break;
                    }
                   }}
        />

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
