import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import ZFBBaseVC from "../../Common/ZFBBaseVC";
import {ZFBNavigationBar} from "../../../../../common/widgets/ZFBNavigation";
import TitleAndSubCell from "../../../wx/me/pay/views/TitleAndSubCell";
import Title2TF from "./Title2TF";
import {isEmpty} from "../../../../../common/utils/Utils";
import {queryFilterFromRealm, writeToRealm, ZFBUserTableName} from "../../../../../common/utils/RealmUtil";
import {RNStorage} from "../../../../../common/storage/AppStorage";

export default class EditMoney extends ZFBBaseVC {

    constructor() {
        super();
        this.state = {
            zrsy: '',
            ye: '',
            yeb: '',
            yeb_lx: '',
            lccp: '',
            lccp_lx: '',
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
            lccp_sel:1,
            jj_sel:1,
            hj_sel:1,
            ylb_sel:1,

        }
    }

    componentDidMount() {
        queryFilterFromRealm(ZFBUserTableName, 'id=' + RNStorage.user_id).then((res) => {
            const model = res[0];
            let zrsy = parseFloat(model.zfb_yeb_lx) + parseFloat(model.zcc_lccp_lx) + parseFloat(model.zcc_jj_lx) + parseFloat(model.zcc_hj_lx) + parseFloat(model.zcc_ylb_lx);
            this.setState({
                zrsy: zrsy,
                ye: model.zfb_ye,
                yeb: model.zfb_yeb,
                yeb_lx: model.zfb_yeb_lx,
                lccp: model.zcc_lccp,
                lccp_lx: model.zcc_lccp_lx,
                jj: model.zcc_jj,
                jj_lx: model.zcc_jj_lx,
                hj: model.zcc_hj,
                hj_lx: model.zcc_hj_lx,
                ylb: model.zcc_ylb,
                ylb_lx: model.zcc_ylb_lx,
                huabei: model.zcc_huabei,
                lccp_sel: model.lccp_sel,
                hj_sel: model.hj_sel,
                jj_sel: model.jj_sel,
                ylb_sel: model.ylb_sel,
                wangshangdai: model.zcc_wangshangdai,
                jiebei: model.zcc_jiebei,
                beiyongjin: model.zcc_beiyongjin,
            })
        })
    }
    _addSubView() {
        return (
            <>
                <ZFBNavigationBar title='编辑金额' noLine={true} rightText='保存' clickRText={() => {
                    writeToRealm({
                        id: RNStorage.zfb_user_id,
                        zfb_ye: this.state.ye,
                        zfb_yeb: this.state.yeb,
                        zfb_yeb_lx: this.state.yeb_lx,
                        zcc_lccp: this.state.lccp,
                        zcc_lccp_lx: this.state.lccp_lx,
                        zcc_jj: this.state.jj,
                        zcc_jj_lx: this.state.jj_lx,
                        zcc_hj: this.state.hj,
                        zcc_hj_lx: this.state.hj_lx,
                        zcc_ylb: this.state.ylb,
                        zcc_ylb_lx: this.state.ylb_lx,
                        zcc_huabei: this.state.huabei,
                        lccp_sel: this.state.lccp_sel,
                        hj_sel: this.state.hj_sel,
                        jj_sel: this.state.jj_sel,
                        ylb_sel: this.state.ylb_sel,
                        zcc_wangshangdai: this.state.wangshangdai,
                        zcc_jiebei: this.state.jiebei,
                        zcc_beiyongjin: this.state.beiyongjin,
                    },ZFBUserTableName).then(()=>{
                        navigation.goBack()
                        this.props.route.params.refreshData();
                    })
                }}/>
                <ScrollView>

                    <TitleAndSubCell value={this.state.zrsy} isEdit={false} title='昨日收益' onChangeText={(text) => {
                        this.setState({
                            zrsy: text
                        })
                    }}/>
                    <TitleAndSubCell value={this.state.ye} isEdit={true} title='余额' onChangeText={(text) => {
                        this.setState({
                            ye: text
                        })
                    }}/>
                    <TitleAndSubCell value={this.state.yeb} isEdit={true} title='余额宝' onChangeText={(text) => {
                        this.setState({
                            yeb: text
                        })
                    }}/>
                    <TitleAndSubCell value={this.state.yeb_lx} isEdit={true} title='余额宝利息' onChangeText={(text) => {
                        this.setState({
                            yeb_lx: text
                        })
                    }}/>
                    <Title2TF data={{
                        title: '理财产品',
                        select: this.state.lccp_sel,
                        one: this.state.lccp,
                        two: this.state.lccp_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                lccp: one,
                                lccp_lx: '0',
                                lccp_sel: select
                            })
                        } else {
                            this.setState({
                                lccp: two,
                                lccp_lx: three,
                                lccp_sel: select
                            })
                        }
                    }}/>
                    <Title2TF data={{
                        title: '基金',
                        select: this.state.jj_sel,
                        one: this.state.jj,
                        two: this.state.jj_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                jj: one,
                                jj_lx: '0',
                                jj_sel: select
                            })
                        } else {
                            this.setState({
                                jj: two,
                                jj_lx: three,
                                jj_sel: select
                            })
                        }
                    }}/>
                    <Title2TF data={{
                        title: '黄金',
                        select: this.state.hj_sel,
                        one: this.state.hj,
                        two: this.state.hj_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                hj: one,
                                hj_lx: '0',
                                hj_sel: select
                            })
                        } else {
                            this.setState({
                                hj: two,
                                hj_lx: three,
                                hj_sel: select
                            })
                        }
                    }}/>
                    <Title2TF data={{
                        title: '余利宝',
                        select: this.state.ylb_sel,
                        one: this.state.ylb,
                        two: this.state.ylb_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                ylb: one,
                                ylb_lx: '0',
                                ylb_sel: select
                            })
                        } else {
                            this.setState({
                                ylb: two,
                                ylb_lx: three,
                                ylb_sel: select
                            })
                        }
                    }}/>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
