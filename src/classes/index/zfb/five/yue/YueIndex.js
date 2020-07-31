import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, StatusBar, ScrollView,
} from 'react-native';
import BaseVC from "../../Common/BaseVC";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {ZFBNavigationBar} from "../../../../../common/widgets/ZFBNavigation";
import ImgTitleCell from "../view/ImgTitleCell";
import {showModalPrompt} from "../../../../../compoments/YHUtils";
import {isEmpty} from "../../../../../common/utils/Utils";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {Notify} from "../../../../../common/events/Notify";
import {queryFilterFromRealm, writeToRealm, ZFBUserTableName} from "../../../../../common/utils/RealmUtil";

export default class YueIndex extends BaseVC {
    constructor() {
        super();
        this.state = {
            yue:RNStorage.zfb_ye
        }
    }

    _addSubView() {
        return (
            <View>
                <ZFBNavigationBar title='余额' nav_bg_color='#118EEA' noLine={true} rightImage={require('../../../../resource/zfb/common/zfb_ye_more_dian.png')}/>
                <View style={{backgroundColor:'#118EEA',padding:17}}>
                    <Text style={{color:'#ACE0FF',fontSize:14}}>余额(元)</Text>
                    <Text style={{color:'#FFFFFF',fontSize:55}}>{this.state.yue}</Text>
                </View>

                <ScrollView>
                    <ImgTitleCell hasLine data={{
                        title: '充值',
                        icon: require('../../../../resource/zfb/five/yue/zfb_ye_icon_cz.png'),
                        icon_width: 28,
                        icon_height: 28,
                    }} itemClick={() => {
                        showModalPrompt('充值','',(text)=>{
                            if (!isEmpty(text) && parseFloat(text)>0) {
                                RNStorage.zfb_ye = (parseFloat(RNStorage.zfb_ye ) + parseFloat(text)).toFixed(2);
                                writeToRealm({id:parseInt(RNStorage.zfb_user_id),zfb_ye:RNStorage.zfb_ye},ZFBUserTableName)
                                this.setState({
                                    yue: RNStorage.zfb_ye,
                                })
                                Notify.Refresh_ZFB_YE.sendEvent({})
                            }
                        },'请输入金额')
                    }}/>
                    <ImgTitleCell data={{
                        title: '提现',
                        icon: require('../../../../resource/zfb/five/yue/zfb_ye_icon_tx.png'),
                        icon_width: 28,
                        icon_height: 28,
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine marginTop={17} data={{
                        title: '转账',
                        icon: require('../../../../resource/zfb/five/yue/zfb_ye_icon_zz.png'),
                        icon_width: 28,
                        icon_height: 28,
                        rightText: '支持批量转钱',
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '转入余额宝',
                        icon: require('../../../../resource/zfb/five/yue/zfb_ye_icon_zryeb.png'),
                        icon_width: 28,
                        icon_height: 28,
                        rightText: '自动赚受益',
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell hasLine data={{
                        title: '集分宝',
                        icon: require('../../../../resource/zfb/five/yue/zfb_ye_icon_jfb.png'),
                        icon_width: 28,
                        icon_height: 28,
                    }} itemClick={() => {
                    }}/>
                    <ImgTitleCell data={{
                        title: '备用金',
                        icon: require('../../../../resource/zfb/five/yue/zfb_ye_icon_byj.png'),
                        icon_width: 28,
                        icon_height: 28,
                        rightText: '500元用7天',
                    }} itemClick={() => {
                    }}/>
                </ScrollView>
            </View>
        )
    }
    componentDidMount() {
        super._setPlaceViewBackgroundColor('#0A62A1')
        queryFilterFromRealm(ZFBUserTableName,'id='+RNStorage.user_id).then((res)=>{
            const model = res[0];
            this.setState({
                yue: model.zfb_ye,
            })
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
