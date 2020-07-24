import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar, TouchableOpacity,
} from 'react-native';
import {Colors, CommonStyles, Const, ImageRes} from "../../../../common/storage/Const";
import {XImage} from "react-native-easy-app";
import BaseVC from "../Common/BaseVC";
import {RNStorage} from "../../../../common/storage/AppStorage";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import SyanImagePicker from "react-native-syan-image-picker";
import ZFBBaseVC from "../Common/ZFBBaseVC";

export default class Index extends ZFBBaseVC {
    constructor() {
        super();
        this.state = {
            icon:RNStorage.zfb_bg_three
        }
    }
    _chooseImg() {
        SyanImagePicker.showImagePicker({
            imageCount: 1,
            isCamera: false,
            enableBase64: true
        }, (err, selectedPhotos) => {
            if (err) {
                // 取消选择
                return;
            }

            RNStorage.zfb_bg_three = selectedPhotos[0].base64;
            // 选择成功，渲染图片
            this.setState({
                icon:selectedPhotos[0].base64
            })
        })
    }
    _addSubView() {
        return (
            <>

                <TouchableOpacity style={{top:0,position:'absolute'}} onPress={()=> {
                    this._chooseImg()
                }}>
                    <XImage style={{minWidth:Const.screenWidth,minHeight:Const.screenHeight}} icon={this.state.icon}/>
                </TouchableOpacity>

                {RNStorage.zfb_bg_two != undefined ? null :(<YHTouchableOpacity style={{width:Const.screenWidth,height:Const.screenHeight}} text='上传' onPress={()=>{
                    this._chooseImg()
                }}/>)}
            </>
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
