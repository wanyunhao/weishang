import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar, ScrollView, TouchableOpacity,
} from 'react-native';
import BaseVC from "../../Common/BaseVC";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {ZFBNavigationBar} from "../../../../../common/widgets/ZFBNavigation";
import ImgTitleCell from "../view/ImgTitleCell";
import {XImage, XView} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import SyanImagePicker from "react-native-syan-image-picker";
import ZFBBaseVC from "../../Common/ZFBBaseVC";
import {queryFilterFromRealm, ZFBUserTableName} from "../../../../../common/utils/RealmUtil";
import {isEmpty} from "../../../../../common/utils/Utils";

export default class ZZCIndex extends ZFBBaseVC {
    constructor() {
        super();
        this.state = {
            icon: RNStorage.zfb_bg_zzc,
            zcc: '0.00',
            zrsy: '0.00',
            yue: '0.00',
            yueb: '0.00',
            yueb_lx: '0.00',
            lccp: '0.00',
            lccp_lx: '0.00',
            jj: '',
            jj_lx: '',
            hj: '',
            hj_lx: '',
            ylb: '',
            ylb_lx: '',
            huabei: '',
            wangshangdai: '',
            jiebei: '',
            beiyongjin: '',
            items: [
                {name: '余额', left: this.state.yue},
                {name: '余额宝', left: this.state.yueb, right: this.state.yueb_lx},
                {name: '理财产品', left: this.state.lccp, right: this.state.lccp_lx},
                {name: '基金', left: this.state.jj, right: this.state.jj_lx},
                {name: '黄金', left: this.state.hj, right: this.state.hj_lx},
                {name: '余利宝', left: this.state.ylb, right: this.state.ylb_lx},
            ],
            items2: [],
            lccp_sel:1,
            jj_sel:1,
            hj_sel:1,
            ylb_sel:1,
        }
        // this.items = [
        //     {name: '余额', left: this.state.yue},
        //     {name: '余额宝', left: this.state.yueb, right: this.state.yueb_lx},
        //     {name: '理财产品', left: this.state.lccp, right: this.state.lccp_lx},
        //     {name: '基金', left: this.state.jj, right: this.state.jj_lx},
        //     {name: '黄金', left: this.state.hj, right: this.state.hj_lx},
        //     {name: '余利宝', left: this.state.ylb, right: this.state.ylb_lx},
        // ]
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

            RNStorage.zfb_bg_zzc = selectedPhotos[0].base64;
            // 选择成功，渲染图片
            this.setState({
                icon: selectedPhotos[0].base64
            })
        })
    }

    _addSubView() {
        return (
            <>

                {/*<TouchableOpacity style={{top:0,position:'absolute'}} onPress={()=> {*/}
                {/*    this._chooseImg()*/}
                {/*}}>*/}
                {/*    <XImage style={{minWidth:Const.screenWidth,minHeight:Const.screenHeight}} icon={this.state.icon}/>*/}
                {/*</TouchableOpacity>*/}

                {/*{RNStorage.zfb_bg_zzc != undefined ? null :(<YHTouchableOpacity style={{width:Const.screenWidth,height:Const.screenHeight}} text='上传' onPress={()=>{*/}
                {/*    this._chooseImg()*/}
                {/*}}/>)}*/}

                <YHTouchableOpacity style={{top: 0,bottom:0,left:0,right:0, position: 'absolute'}} onPress={() => {
                    this._chooseImg()
                }}>
                    <XImage resizeMode='stretch' style={{width: '100%', height: '100%'}}
                            icon={this.state.icon}
                    />
                    <View style={{backgroundColor:'rgb(242,242,242)',top: 300,bottom:0,left:0,right:0, position: 'absolute'}}/>
                </YHTouchableOpacity>
                <View>
                    <ZFBNavigationBar title='总资产' noLine={true} rightText='服务' nav_bg_color={'rgb(21,120,255)'}/>
                    <XView onPress={() => {
                        navigation.push('EditMoney',{refreshData: ()=>{
                                this._requestData()
                            }})
                    }} style={{
                        borderRadius: 4,
                        marginLeft: 11,
                        width: Const.screenWidth - 22,
                        backgroundColor: Colors.white,
                        paddingVertical: 15,
                        marginTop: 70,
                        height: 381
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 22,
                            paddingHorizontal: 15,
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#000000', fontSize: 16}}>我的资产</Text>
                                <XImage icon={require('../../../../resource/zfb/five/zzc/zfb_zzc_eye.png')}
                                        style={{width: 16.89, height: 11.5, marginLeft: 10}}/>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <XImage icon={require('../../../../resource/zfb/five/zzc/zfb_zzc_bzz.png')}
                                        style={{width: 10.23, height: 11.74}}/>
                                <Text style={{
                                    color: '#279C93',
                                    fontSize: 12,
                                    marginLeft: 4,
                                    marginRight: 6
                                }}>账户安全保障中</Text>
                                <XImage icon={require('../../../../resource/zfb/five/zzc/zfb_zzc_more2.png')}
                                        style={{width: 6.05, height: 9.55}}/>
                            </View>
                        </View>
                        <YHDividingLine isBottom={false} top={52}/>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 26,
                            paddingHorizontal: 15,
                        }}>
                            <View>
                                <Text style={{color: '#999999', marginRight: 14, fontSize: 12}}>总资产(元)</Text>
                                <Text style={{color: '#333333', fontSize: 23, marginTop: 4}}>{this.state.zzc}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={{color: '#999999', fontSize: 14}}>昨日收益</Text>
                                <Text style={{color: '#E7541E', fontSize: 23, marginTop: 4}}>+{this.state.zrsy}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 15}}>
                            {this.state.items.map((value, index,) => {
                                return (
                                    <View style={{
                                        width: (Const.screenWidth - 22) / 2,
                                        height: 68,
                                        justifyContent: 'center',
                                    }}>
                                        {index < 2 ? <YHDividingLine isBottom={false} top={0}/> : null}
                                        <View style={{paddingHorizontal: 15,}}>

                                            <Text style={{
                                                color: '#333333',
                                                marginRight: 15,
                                                fontSize: 12
                                            }}>{value.name}</Text>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={{
                                                    color: '#999999',
                                                    fontSize: 14,
                                                    marginTop: 1
                                                }}>{value.left}</Text>
                                                {isEmpty(value.right) ? null : (
                                                    <Text style={{
                                                        color: '#E7541E',
                                                        fontSize: 14,
                                                        marginTop: 1
                                                    }}>+{value.right}</Text>
                                                )}
                                            </View>
                                        </View>
                                        <YHDividingLine left={0}/>
                                        <View style={[{
                                            position: 'absolute',
                                            backgroundColor: '#eeeeee',
                                            width: 0.5,
                                            right: 0,
                                            top: 0,
                                            bottom: 0
                                        },]}>

                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 12,
                            justifyContent: 'center'
                        }}>
                            <Text style={{fontSize: 14, color: '#999999'}}>优选理财，去财富看看</Text>
                            <XImage icon={require('../../../../resource/images/ic_right_arrow.png')}
                                    style={{width: 7.15, height: 13.05, marginLeft: 9}}/>
                        </View>
                    </XView>

                    <View style={{
                        borderRadius: 4,
                        marginLeft: 11,
                        width: Const.screenWidth - 22,
                        backgroundColor: Colors.white,
                        marginTop: 12,
                        height: 188,
                        paddingVertical: 15
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 22,
                            marginLeft: 15
                        }}>
                            <Text style={{color: '#000000', fontSize: 16}}>我的额度</Text>
                        </View>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 15}}>
                            {this.state.items2.map((value, index,) => {
                                return (
                                    <View style={{
                                        width: (Const.screenWidth - 22) / 2,
                                        height: 68,
                                        justifyContent: 'center',
                                    }}>
                                        {index < 2 ? <YHDividingLine isBottom={false} top={0}/> : null}
                                        <View style={{paddingHorizontal: 15,}}>

                                            <Text style={{color: '#333333', marginRight: 15, fontSize: 12}}>{value.name}</Text>
                                            <Text style={{color: '#999999', fontSize: 14, marginTop: 1}}>{value.left}</Text>
                                        </View>
                                        <YHDividingLine left={0}/>
                                        <View style={[{
                                            position: 'absolute',
                                            backgroundColor: '#eeeeee',
                                            width: 0.5,
                                            right: 0,
                                            top: 0,
                                            bottom: 0
                                        },]}>

                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </>
        )
    }

    componentDidMount() {
        super._setPlaceViewBackgroundColor('#0A62A1')
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
                zrsy: zrsy,
                yue: model.zfb_ye,
                yueb: model.zfb_yeb,
                yueb_lx: model.zfb_yeb_lx,
                lccp: model.zcc_lccp,
                lccp_lx: model.zcc_lccp_lx,
                jj: model.zcc_jj,
                jj_lx: model.zcc_jj_lx,
                hj: model.zcc_hj,
                hj_lx: model.zcc_hj_lx,
                ylb: model.zcc_ylb,
                ylb_lx: model.zcc_ylb_lx,
                huabei: model.zcc_huabei,
                wangshangdai: model.zcc_wangshangdai,
                jiebei: model.zcc_jiebei,
                beiyongjin: model.zcc_beiyongjin,
                lccp_sel: model.lccp_sel,
                hj_sel: model.hj_sel,
                jj_sel: model.jj_sel,
                ylb_sel: model.ylb_sel,
            },()=>{
                // console.log(this.state.items)
                this.setState({
                    items: [
                        {name: '余额', left: this.state.yue},
                        {name: '余额宝', left: this.state.yueb, right: this.state.yueb_lx},
                        {name: '理财产品', left: this.state.lccp, right: this.state.lccp_sel == 1 ? '' : this.state.lccp_lx},
                        {name: '基金', left: this.state.jj, right: this.state.jj_sel == 1 ? '' : this.state.jj_lx},
                        {name: '黄金', left: this.state.hj, right: this.state.hj_sel == 1 ? '' : this.state.hj_lx},
                        {name: '余利宝', left: this.state.ylb, right: this.state.ylb_sel == 1 ? '' : this.state.ylb_lx},
                    ],
                    items2: [
                        {name: '花呗', left: this.state.huabei},
                        {name: '借呗', left: this.state.jiebei},
                        {name: '网商贷', left: this.state.wangshangdai},
                        {name: '备用金', left: this.state.beiyongjin},
                    ]
                },()=>{
                })
            })
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
