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
        }
    }

    _addSubView() {
        return (
            <>
                <ZFBNavigationBar title='编辑金额' noLine={true} rightText='保存' clickRText={() => {

                }}/>
                <ScrollView>

                    <TitleAndSubCell value={this.state.zrsy} isEdit={true} title='昨日收益' onChangeText={(text) => {
                        this.setState({
                            zrsy: text
                        })
                    }}/>
                    <TitleAndSubCell value={this.state.ye} isEdit={true} title='余额' onChangeText={(text) => {
                        this.setState({
                            ye: text
                        })
                    }}/>
                    <TitleAndSubCell value={this.state.zrsy} isEdit={true} title='余额宝' onChangeText={(text) => {
                        this.setState({
                            zrsy: text
                        })
                    }}/>
                    <Title2TF data={{
                        title: '理财产品',
                        select: isEmpty(this.state.lccp_lx) ? 1 : 2,
                        one: this.state.lccp,
                        two: this.state.lccp_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                lccp: one,
                                lccp_lx: '',
                            })
                        } else {
                            this.setState({
                                lccp: two,
                                lccp_lx: three,
                            })
                        }
                    }}/>
                    <Title2TF data={{
                        title: '基金',
                        select: isEmpty(this.state.jj_lx) ? 1 : 2,
                        one: this.state.jj,
                        two: this.state.jj_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                jj: one,
                                jj_lx: '',
                            })
                        } else {
                            this.setState({
                                jj: two,
                                jj_lx: three,
                            })
                        }
                    }}/>
                    <Title2TF data={{
                        title: '黄金',
                        select: isEmpty(this.state.hj_lx) ? 1 : 2,
                        one: this.state.hj,
                        two: this.state.hj_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                hj: one,
                                hj_lx: '',
                            })
                        } else {
                            this.setState({
                                hj: two,
                                hj_lx: three,
                            })
                        }
                    }}/>
                    <Title2TF data={{
                        title: '余利宝',
                        select: isEmpty(this.state.ylb_lx) ? 1 : 2,
                        one: this.state.ylb,
                        two: this.state.ylb_lx
                    }} block={(select, one, two, three) => {
                        if (select == 1) {
                            this.setState({
                                ylb: one,
                                ylb_lx: '',
                            })
                        } else {
                            this.setState({
                                ylb: two,
                                ylb_lx: three,
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
