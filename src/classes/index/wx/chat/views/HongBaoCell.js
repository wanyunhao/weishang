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
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";

export default class HongBaoCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    let isSelf = this.props.isSelf;
    let isReceived = this.props.isReceived;
    return (
      <YHTouchableOpacity style={styles.container}>
        <View style={{flexDirection: 'row', paddingTop: 11, paddingHorizontal: 11, alignItems:'center'}}>
          {isSelf? null:(<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={require('../../../../resource/images/avatar.png')} iconSize={38}
                                 onPress={() => {
                                 }}/>)}
          <View style={{flexDirection:'row',marginLeft:5,flex: 1,marginRight:5,justifyContent:isSelf ? 'flex-end' : 'flex-start' }}>
            <View>
              <Image source={isSelf ?
                  (isReceived ? require('../../../../resource/index/wx_hb_opened_bg_right.png') : require('../../../../resource/index/wx_hb_no_open_bg_right.png')) :
                  (isReceived ? require('../../../../resource/index/wx_hb_opened_bg_left.png') : require('../../../../resource/index/wx_hb_no_open_bg_left.png'))}
                     style={{width:221.62,height:81.52}}/>
              <Image source={isReceived ? require('../../../../resource/index/wx_hb_opened_icon.png') : require('../../../../resource/index/wx_hb_no_open_icon.png')} style={{width:30.12,height:37.68,position: 'absolute',left:23,top:12}}/>
              {isReceived ? (<View style={{position: 'absolute',left:62,top:13}}>
                <Text style={{color:Colors.white,fontWeight:'bold',fontSize:14,}}>恭喜发财,大吉大利</Text>
                <Text style={{color:Colors.white,fontWeight:'bold',fontSize:11,}}>已领取</Text>
              </View>) : (<Text style={{color:Colors.white,fontWeight:'bold',fontSize:14,position: 'absolute',left:62,top:21}}>恭喜发财,大吉大利</Text>)}
              <Text style={{color: isReceived ? '#FFF4E4' : '#FFAF54',fontSize:9,position: 'absolute',left:16,bottom:2}}>微信红包</Text>
              {isReceived ? null : <YHDividingLine left={15} line_color={'#FFAF54'} bottom={20} right={11}/>}
            </View>
          </View>

          {isSelf ? (<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={require('../../../../resource/images/avatar.png')} iconSize={38}
                             onPress={() => {
                             }}/>): null}
        </View>
        {/*<YHHongBaoPopView finishAnimation={this.props.finishAnimation}/>*/}
      </YHTouchableOpacity>
    );
  }

}
/*
* <View style={{marginLeft:5}}>
            <Image source={require('../../../../resource/index/wx_hbzz_bg.png')} style={{width:221,height:81}}/>
            <Image source={require('../../../../resource/index/wx_hb.png')} style={{width:30.12,height:37.68,position: 'absolute',left:23,top:12}}/>
            <Text style={{color:Colors.white,fontWeight:'bold',fontSize:14,position: 'absolute',left:62,top:21}}>恭喜发财,大吉大利</Text>
            <Text style={{color:'#FFAF54',fontSize:9,position: 'absolute',left:16,bottom:2}}>微信红包</Text>
            <YHDividingLine left={15} line_color={'#FFAF54'} bottom={20} right={11}/>
          </View>
* */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
