import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar,
} from 'react-native';
import {Colors, CommonStyles, Const, ImageRes} from "../../../../common/storage/Const";
import {XImage} from "react-native-easy-app";
import BaseVC from "../Common/BaseVC";

export default class Index extends BaseVC {
    constructor() {
        super();
        this.imgs = [
            {img: require('../../../resource/zfb/four/zfb_fw_icon_gzh.png'), title: '生活号',subTitle:'余额宝收益到账…'},
            {img: require('../../../resource/zfb/four/zfb_fw_icon_xcx.png'), title: '小程序',subTitle:'天天可领福利…'},
            {img: require('../../../resource/zfb/four/zfb_fw_icon_shq.png'), title: '生活圈',subTitle:'你有朋…更新动态'},
        ]
    }

    _addSubView() {
        return (
            <View>
                <View style={{height:46,backgroundColor:Colors.zfb_theme_color,flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:15,alignItems:'center'}}>
                    <XImage style={{width:20.5,height:19.75,marginRight:20,}} icon={require('../../../resource/zfb/four/zfb_py_search.png')}/>
                    <XImage style={{width: 23.19, height: 19.16,marginRight:20,}} icon={require('../../../resource/zfb/one/zfb_icon_txl.png')}/>
                    <XImage style={{width: 19.19, height: 19.19}} icon={require('../../../resource/zfb/one/zfb_btn_add.png')}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:Colors.white,paddingTop:16,paddingBottom:12}}>
                    {this.imgs.map(value => {

                        return (
                            <View style={{alignItems:'center'}}>
                                <XImage icon={value.img} iconSize={41.77}/>
                                <Text style={{color:'#333333',fontSize:16}}>{value.title}</Text>
                                <Text style={{color:'#999999',fontSize:13}}>{value.subTitle}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    // render() {
    //     return (
    //         <View style={[CommonStyles.container, {marginTop: Const.isIos ? 0 : INSETS.top,paddingTop: Const.isAndroid ? 0 : INSETS.top,}]}>
    //             <StatusBar backgroundColor={Colors.zfb_theme_color}
    //                        barStyle='light-content'
    //                        translucent={true}/>
    //             <View style={{height: 119, backgroundColor: Colors.zfb_theme_color,}}>
    //
    //                 <View style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     justifyContent: 'space-between',
    //                     paddingHorizontal: 12,
    //                     marginTop: 6
    //                 }}>
    //                     <View style={{
    //                         backgroundColor: Colors.white,
    //                         height: 30,
    //                         flexDirection: 'row',
    //                         alignItems: 'center',
    //                         justifyContent: 'space-between',
    //                         flex: 1
    //                     }}>
    //                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //                             <XImage style={{width: 12.5, height: 12.5, marginLeft: 11, marginRight: 6}}
    //                                     icon={require('../../../resource/zfb/one/zfb_search_gray.png')}/>
    //                             <Text style={{color: '#666666', fontSize: 13}}>搜索最新</Text>
    //                         </View>
    //                         <XImage style={{width: 9.39, height: 13.56, marginRight: 13,}}
    //                                 icon={require('../../../resource/zfb/one/zfb_voice.png')}/>
    //                     </View>
    //                     <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 18}}>
    //                         <XImage style={{width: 23.19, height: 19.16}}
    //                                 icon={require('../../../resource/zfb/one/zfb_icon_txl.png')}/>
    //                         <XImage style={{width: 19.19, height: 19.19, marginLeft: 17}}
    //                                 icon={require('../../../resource/zfb/one/zfb_btn_add.png')}/>
    //                     </View>
    //                 </View>
    //
    //                 <View style={{flexDirection:'row',marginTop:17,justifyContent:'space-around'}}>
    //                     {this.imgs.map(value => {
    //                         return (
    //                             <View style={{alignItems:'center'}}>
    //                                 <XImage icon={value.img}
    //                                         iconSize={32}/>
    //                                 <Text style={{color:Colors.white,fontSize:14,marginTop:3,}}>{value.title}</Text>
    //                             </View>
    //                         )
    //                     })}
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
