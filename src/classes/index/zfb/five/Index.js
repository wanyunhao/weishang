import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "../../../../common/storage/Const";
import {XImage, XView} from "react-native-easy-app";
import ImgTitleCell from "./view/ImgTitleCell";
import ZFBBaseVC from "../Common/ZFBBaseVC";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {queryFilterFromRealm, ZFBUserTableName} from "../../../../common/utils/RealmUtil";

export default class Index extends ZFBBaseVC {
    constructor() {
        super();
        this.state = {
            user_name:RNStorage.zfb_user_name,
            avatar:RNStorage.zfb_avatarUrl,
            account:RNStorage.zfb_account,
            level:RNStorage.zfb_account_level,
            zzc: '',
            yue: '',
            yueb: '',
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._requestData()
    }

    _requestData() {
        this.setState({
            user_name:RNStorage.zfb_user_name,
            avatar:RNStorage.zfb_avatarUrl,
            account:RNStorage.zfb_account,
            level:RNStorage.zfb_account_level,
        })
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
                zzc: zzc,
                yue: model.zfb_ye,
                yueb: model.zfb_yeb,
            })
        })
    }

    _addSubView() {
        return (
            <>
                <View style={{
                    backgroundColor: Colors.zfb_theme_color,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                }}>
                    <Text style={{color: Colors.white, fontSize: 18.5}}>我的</Text>
                    <Text style={{color: Colors.white, fontSize: 18.5}}>设置</Text>
                </View>
                <ScrollView>
                    <XView style={{
                        backgroundColor: Colors.zfb_theme_color,
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                          onPress={()=>{
                              navigation.push('PersonInfoScreen',{refreshUserInfo:()=>{
                                  this._requestData();
                                  }})
                          }}>
                        <View>
                            <View
                                style={{flexDirection: 'row', alignItems: 'center', paddingTop: 4, paddingBottom: 14}}>
                                <XImage style={{borderRadius: 2, borderWidth: 2, borderColor: '#6DAFE2'}}
                                        icon={this.state.avatar} iconSize={53}/>
                                <View style={{marginLeft: 7}}>
                                    <Text style={{color: Colors.white, fontSize: 18.5}}>{this.state.user_name}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 11,
                                        borderRadius: 10,
                                        height: 20,
                                        backgroundColor: 'rgb(37,127,254)',
                                        justifyContent: 'center',
                                        marginTop: 5
                                    }}>
                                        <Text style={{color: '#CFEBFF', fontSize: 14}}>{this.state.account}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <XImage style={{width: 9.5, height: 17,}}
                                icon={require('../../../resource/zfb/five/zfb_me_icon_more.png')}/>
                    </XView>
                    <ImgTitleCell data={{
                        title: '支付宝会员',
                        icon: require('../../../resource/zfb/five/zfb_me_zfbhy.png'),
                        icon_width: 22.72,
                        icon_height: 26.9,
                        rightText: '15个积分待领取',
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine marginTop={9} data={{
                        title: '账单',
                        icon: require('../../../resource/zfb/five/zfb_me_btn1.png'),
                    }} itemClick={() => {
                        navigation.push('ZFBBillsScreen')
                    }}/>
                    <ImgTitleCell hasLine sub_color='#0EA095' data={{
                        title: '总资产',
                        icon: require('../../../resource/zfb/five/zfb_me_btn2.png'),
                        rightText:'账户安全保障中',
                    }} itemClick={() => {
                        navigation.push('ZZCIndex');
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '余额',
                        icon: require('../../../resource/zfb/five/zfb_me_btn3.png'),
                        rightText: this.state.yue + ' 元',
                    }} itemClick={() => {
                        navigation.push('YueIndex')
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '余额宝',
                        icon: require('../../../resource/zfb/five/zfb_me_btn4.png'),
                    }} itemClick={() => {
                        navigation.push('YueBaoIndex');
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '花呗',
                        icon: require('../../../resource/zfb/five/zfb_me_btn6.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '余利宝',
                        icon: require('../../../resource/zfb/five/zfb_me_btn5.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '银行卡',
                        icon: require('../../../resource/zfb/five/zfb_me_btn7.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine marginTop={9} data={{
                        title: '芝麻信用',
                        icon: require('../../../resource/zfb/five/zfb_me_btn8.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '蚂蚁保险',
                        icon: require('../../../resource/zfb/five/zfb_me_btn9.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '借呗',
                        icon: require('../../../resource/zfb/five/zfb_me_btn10.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '网商银行',
                        icon: require('../../../resource/zfb/five/zfb_me_btn11.png'),
                    }} itemClick={() => {
                    }}/>

                    <ImgTitleCell hasLine marginTop={9} data={{
                        title: '支付宝公益',
                        icon: require('../../../resource/zfb/five/zfb_me_btn12.png'),
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '我的客服',
                        icon: require('../../../resource/zfb/five/zfb_me_btn13.png'),
                    }} itemClick={() => {
                    }}/>
                </ScrollView>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
