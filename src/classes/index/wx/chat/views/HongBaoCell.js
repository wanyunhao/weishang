import React, { Component } from "react";

import {
  Animated,
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import {NavigationBar} from "../../../../../common/widgets/WidgetNavigation";
import {XImage} from "react-native-easy-app";
import {Colors} from "../../../../../common/storage/Const";
import YHHongBaoPopView from "./YHHongBaoPopView";

export default class HongBaoCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',paddingHorizontal:10,paddingTop:10,alignItems:'flex-start'}}>
          <XImage style={{borderRadius:5}} icon={require('../../.././../resource/images/avatar.png')} iconSize={40}
                  onPress={() => {
                  }}/>
          <View style={{marginLeft:5}}>
            <Image source={require('../../../../resource/index/wx_hbzz_bg.png')} style={{width:221,height:81}}/>
            <Image source={require('../../../../resource/index/wx_hb.png')} style={{width:30.12,height:37.68,position: 'absolute',left:23,top:12}}/>
            <Text style={{color:Colors.white,fontWeight:'bold',fontSize:14,position: 'absolute',left:62,top:21}}>恭喜发财,大吉大利</Text>
          </View>
        </View>
        <YHHongBaoPopView finishAnimation={this.props.finishAnimation}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
