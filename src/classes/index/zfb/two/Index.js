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
import SyanImagePicker from "react-native-syan-image-picker";
import {RNStorage} from "../../../../common/storage/AppStorage";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import ZFBBaseVC from "../Common/ZFBBaseVC";
import {queryFilterFromRealm, ZFBUserTableName} from "../../../../common/utils/RealmUtil";

export default class Index extends ZFBBaseVC {
    constructor() {
        super();
        this.state = {
            icon:RNStorage.zfb_bg_two,
            zzc: '',
            zrsy: '',
        }
    }


    _chooseImg() {
        SyanImagePicker.showImagePicker({
            imageCount: 1,
            isCamera: false,
            enableBase64: true,
            allowPickingOriginalPhoto: true
        }, (err, selectedPhotos) => {
            if (err) {
                // 取消选择
                return;
            }

            RNStorage.zfb_bg_two = selectedPhotos[0].uri;
            // 选择成功，渲染图片
            this.setState({
                icon:selectedPhotos[0].uri
            })
        })
    }

    componentDidMount() {
        super.componentDidMount();
        this._requestData()
    }


    _requestData() {

        queryFilterFromRealm(ZFBUserTableName, 'id=' + RNStorage.user_id).then((res) => {
            const model = res[0];
            var zzc = parseFloat(model.zfb_ye) + parseFloat(model.zfb_yeb);
            let zrsy = parseFloat(model.zfb_yeb_lx) + parseFloat(model.zcc_lccp_lx) + parseFloat(model.zcc_jj_lx) + parseFloat(model.zcc_hj_lx) + parseFloat(model.zcc_ylb_lx);
            if (model.lccp_sel == 2) {
                zzc += parseFloat(model.zcc_lccp)
            }
            if (model.jj_sel == 2) {
                zzc += parseFloat(model.zcc_jj)
            }
            if (model.hj_sel == 2) {
                zzc += parseFloat(model.zcc_hj)
            }
            if (model.ylb_sel == 2) {
                zzc += parseFloat(model.zcc_ylb)
            }

            this.setState({
                zzc: zzc.toFixed(2),
                zrsy: zrsy.toFixed(2),
            })
        })
    }

    _addSubView() {
        return (
            <>

                <TouchableOpacity style={{top:0,position:'absolute'}} onPress={()=> {
                    this._chooseImg()
                }}>
                    <XImage resizeMode='stretch' style={{minWidth:Const.screenWidth,minHeight:Const.screenHeight}} icon={this.state.icon}/>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <View style={{height: 129, backgroundColor: Colors.zfb_theme_color}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10,}}>
                            <Text style={{flex: 1, color: Colors.white, fontSize: 18.5}}>财富</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <XImage style={{width: 21.37, height: 23.42, marginRight: 20,}}
                                        icon={require('../../../resource/zfb/two/zfb_cf_icon_xy.png')}/>
                                <XImage style={{width: 22.65, height: 20.17, marginRight: 20,}}
                                        icon={require('../../../resource/zfb/two/zfb_cf_icon_b.png')}/>
                                <XImage style={{width: 20.5, height: 19.75}}
                                        icon={require('../../../resource/zfb/four/zfb_py_search.png')}/>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                            marginTop: 19,
                        }}>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color: '#84C3F6', marginRight: 13, fontSize: 12}}>总资产(元)</Text>
                                    <XImage icon={require('../../../resource/zfb/two/cf_icon_eye.png')}
                                            style={{width: 15.47, height: 11.1, marginRight: 11,}}/>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 6,
                                        borderRadius: 8,
                                        height: 16,
                                        backgroundColor: '#167BCB',
                                        justifyContent: 'center'
                                    }}>
                                        <XImage icon={require('../../../resource/zfb/two/cf_icon_bzz.png')}
                                                style={{width: 8.4, height: 9.77}}/>
                                        <Text style={{color: '#84C3F6', fontSize: 10, marginLeft: 5}}>保障中</Text>
                                    </View>
                                </View>
                                <Text style={{color: Colors.white, fontSize: 27}}>{this.state.zzc}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={{color: '#84C3F6', fontSize: 12}}>昨日收益</Text>
                                <Text style={{color: Colors.white, fontSize: 27}}>+{this.state.zrsy}</Text>
                            </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <XImage icon={require('../../../resource/zfb/two/zfb_cf_icon_xl.png')}
                                    style={{width: 14.26, height: 5.68}}/>
                        </View>
                    </View>

                    {RNStorage.zfb_bg_two != undefined ? null :(<YHTouchableOpacity style={{flex:1,}} text='上传' onPress={()=>{
                        this._chooseImg()
                    }}/>)}
                </View>

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
