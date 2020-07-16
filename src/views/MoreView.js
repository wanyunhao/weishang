import React, {Component} from 'react';
import Global from '../common/utils/Global';
import Utils from '../common/utils/WXUtils';
// import ImagePicker from 'react-native-image-crop-picker';

import {Dimensions, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Colors} from "../common/storage/Const";

const {width} = Dimensions.get('window');

const icons = [
  require('../classes/resource/index/chat/wxlt_icon_xc.png'),
  require('../classes/resource/index/chat/wxlt_icon_ps.png'),
  require('../classes/resource/index/chat/wxlt_icon_spth.png'),
  require('../classes/resource/index/chat/wxlt_icon_wz.png'),
  require('../classes/resource/index/chat/wxlt_icon_hb.png'),
  require('../classes/resource/index/chat/wxlt_icon_zz.png'),
  require('../classes/resource/index/chat/wxlt_icon_yysr.png'),
  require('../classes/resource/index/chat/wxlt_icon_wdsc.png'),
];

const iconTexts = [
  "相册", "拍摄", "视频通话", "发送时间",
  "红包", "转账", "语音输入", "我的收藏"
];

export default class MoreView extends Component {
  render() {
    var page = [];
    for (var i = 0; i < 2; i++) {
      var row = [];
      for (var j = 0; j < 4; j++) {
        let indd = i * 4 + j;
        row.push(
          <Cell
            itemClick={()=>{
              this.props.itemClick(indd)
            }}
            key={"row" + i + "col" + j}
            icon={icons[i * 4 + j]}
            text={iconTexts[i * 4 + j]}
            index={indd}
            sendImageMessage={this.props.sendImageMessage}
          />
        );
      }
      page.push(
        <View key={"page" + i} style={styles.rowContainer}>{row}</View>
      );
    }
    return (
      <View style={[styles.moreViewContainer,{paddingBottom:INSETS.bottom}]}>
        {page}
      </View>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.cellContainer} activeOpacity={0.6} onPress={this.props.itemClick}>
        <View style={styles.cellContainer}>
          <View style={styles.cellImgContainer}>
            <Image style={styles.cellImage} source={this.props.icon}/>
          </View>
          <Text numberOfLines={1} style={styles.cellText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  moreViewContainer: {
    width: width,
    height: Global.addViewHeight,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F4F4F4'
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: Global.addViewHeight / 2 - 20,
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cellImgContainer: {
    width: 53,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
  cellImage: {
    width: 53,
    height: 53,
  },
  cellText: {
    fontSize: 10,
    width: 55,
    textAlign: 'center',
    marginTop: 6,
    color:'#787878'
  }
});
