import React from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../../../../common/storage/Const";
import {showModalOperation, showOverlayModal} from "../../../../../compoments/YHUtils";
import Overlay from "teaset/components/Overlay/Overlay";
import {XHttp, XImage, XText, XView} from "react-native-easy-app";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import ZFBBaseVC from "../../Common/ZFBBaseVC";
import {AddBillView} from "../../../wx/chat/views/NewPersonView";
import {ZFBNavigationBar} from "../../../../../common/widgets/ZFBNavigation";
import {Api} from "../../../../../common/http/Api";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {showLoading} from "../../../../../common/widgets/Loading";


export default class ZFBBillsScreen extends ZFBBaseVC {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: "Main dishes",
                    data: ["Pizza", "Burger", "Risotto"]
                },
                {
                    title: "Sides",
                    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
                },
            ]
        };
    }

    divMessage(hasAvatar, hasCheck, infoText, tiXian, hasName, hasCategory, hasComment) {
        const key = showOverlayModal('zoomOut', true,
            <AddBillView hasComment={hasComment}
                         hasCategory={hasCategory}
                         hasName={hasName}
                         tiXian={tiXian}
                         infoText={infoText}
                         hasAvatar={hasAvatar}
                         hasCheck={hasCheck}
                         cancelClick={() => {
                             Overlay.hide(key);
                         }}
                         confirmClick={(value) => {
                             this._submit(value)
                             Overlay.hide(key);
                         }}/>);
    }

    _submit(value) {
        let url = '';
        url = Api.Api_Gift_addRecordForadd
        const obj = {
            ...value,
            token: '123456',
            user_id: RNStorage.zfb_user_id,//当前用户
            plat: '1',//发送平台（1：支付宝2：微信） 默认为支付宝
        }
        XHttp().url(url)
            .loadingFunc(loading => showLoading('请稍等',loading))
            .param(obj)
            .post((success, json) => {
                console.log(json);
                if (success) {

                }
            })
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <ZFBNavigationBar title='账单' rightImage={require('../../../../resource/common/wx_more.png')}
                                  clickRImage={() => {
                                      let items = [
                                          {
                                              text: '自定义账单', onPress: () => {
                                                  this.divMessage(true, true, [], false, true, true)
                                              }
                                          },
                                          {
                                              text: '添加转账消息', onPress: () => {
                                                  this.divMessage(true, true, ['转账-转给', '转账-来自'], false, true, true, true)
                                              }
                                          },
                                          {
                                              text: '添加红包消息', onPress: () => {
                                                  this.divMessage(false, true, ['发送普通红包', '收到普通红包'], false, false, true)
                                              }
                                          },
                                          {
                                              text: '二维码收付款', onPress: () => {
                                                  this.divMessage(true, true, ['扫付款码付款-给', '收款码收款-来自'], false, true, true)
                                              }
                                          },
                                          {
                                              text: '收款', onPress: () => {
                                                  this.divMessage(true, true, [], false, true, true, true)
                                              }
                                          },
                                          {
                                              text: '余额提现', onPress: () => {

                                                  this.divMessage(false, false, ['余额提现'], false, false, true)
                                              }
                                          },
                                          {
                                              text: '余额充值', onPress: () => {
                                                  this.divMessage(false, false, ['余额充值'], false, false, true)
                                              }
                                          },
                                      ];
                                      showModalOperation(items);
                                  }}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    height: 35,
                    backgroundColor: Colors.white
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>筛选</Text>
                            <XImage style={{marginLeft: 6}}
                                    icon={require('../../../../resource/common/shixin_down.png')} iconSize={11.37}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
                            <Text>分类</Text>
                            <XImage style={{marginLeft: 6}}
                                    icon={require('../../../../resource/common/shixin_down.png')} iconSize={11.37}/>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 0.5, height: 19, backgroundColor: '#D8D8D8'}}/>
                        <Text style={{fontSize: 14, marginLeft: 10}}>
                            统计
                        </Text>
                    </View>
                </View>
                <SectionList
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => this._renderCell(item)}
                    renderSectionHeader={({section: {title}}) => (
                        this._renderSectionView(title)
                    )}
                />
            </View>
        );
    }

    _renderSectionView(section) {
        return (
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                backgroundColor: '#EDEDED',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <XView style={{
                    color: '#3b3b3b',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    height: 30,
                    borderRadius: 15
                }}>
                    <Text style={{color: '#3b3b3b'}}>本月</Text>
                    <XImage style={{marginLeft: 6}} icon={require('../../../../resource/common/shixin_down.png')}
                            iconSize={11.37}/>
                </XView>
                <View>
                    <Text style={{color: '#989898'}}>支出 100</Text>
                    <Text style={{color: '#989898', marginTop: 3}}>支出 100</Text>
                </View>
            </View>
        )
    }

    _renderCell(item) {
        return (
            <View style={{padding: 20, flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: 'white'}}>
                <XImage icon={require('../../../../resource/images/avatar.png')} iconSize={44}/>
                <View style={{flex: 1, marginLeft: 11}}>
                    <Text style={{fontSize: 18, color: '#353535'}}>
                        {item}
                    </Text>
                    <Text style={{fontSize: 13, color: '#B8B8B8', marginTop: 3}}>
                        {item}
                    </Text>
                </View>

                <Text style={{fontSize: 18, color: '#363636', marginTop: 3}}>
                    {item}
                </Text>
                <YHDividingLine left={75}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg,
    },
});
