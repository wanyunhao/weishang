import React from "react";
import {SectionList, StyleSheet, View,Text} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import {Colors} from "../../../../../common/storage/Const";
import WXBaseVC from "../../../zfb/Common/WXBaseVC";
import {showModalOperation, showOverlayModal} from "../../../../../compoments/YHUtils";
import {AddBillView} from "../../chat/views/NewPersonView";
import Overlay from "teaset/components/Overlay/Overlay";
import {XHttp, XImage} from "react-native-easy-app";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import {Api} from "../../../../../common/http/Api";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import {showLoading} from "../../../../../common/widgets/Loading";


export default class BillsScreen extends WXBaseVC {

    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
        };
        this.billType = 0
    }

    divMessage(hasAvatar,hasCheck,infoText,tiXian,hasName) {
        const key = showOverlayModal('zoomOut', true, <AddBillView hasName={hasName} tiXian={tiXian} infoText={infoText} hasAvatar={hasAvatar} hasCheck={hasCheck} cancelClick={() => {
            Overlay.hide(key);
        }} confirmClick={(value) => {
            this._submit(value)
            Overlay.hide(key);
        }}/>);
    }


    _submit(value) {
        const obj = {
            ...value,
            token: '123456',
            user_id: RNStorage.user_id,//当前用户
            plat: '2',//发送平台（1：支付宝2：微信） 默认为支付宝
            type: this.billType
        }
        console.log(obj);
        XHttp().url(Api.Api_Gift_addRecord)
            .loadingFunc(loading => showLoading('请稍等',loading))
            .param(obj)
            .post((success, json) => {
                console.log(json);
                if (success) {
                    this._requestData()
                }
            })
    }

    componentDidMount() {
        super.componentDidMount();
        this._requestData()
    }

    _requestData() {
        XHttp().url(Api.Api_Gift_getRecord)
            .param({
                token: '123456',
                plat: '2',
                user_id: RNStorage.user_id,//当前用户
                // month: RNStorage.user_id,//当前用户
            })
            .post((success, json) => {
                console.log(json);
                this.setState({
                    data:json.data
                })
            })
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='账单' left_img={require('../../../../resource/common/wx_close.png')} left_img_size={13} rightImage={require('../../../../resource/common/wx_more.png')} clickRImage={()=>{
                    let items = [
                        {
                            text: '添加自定义消息', onPress: () => {
                                this.billType = 1
                                this.divMessage(true,true,[],false,true)
                            }
                        },
                        {
                            text: '添加转账消息', onPress: () => {
                                this.billType = 2
                                this.divMessage(true,true,['转账-转给','转账-来自'],false,true)
                            }
                        },
                        {
                            text: '添加红包消息', onPress: () => {
                                this.billType = 3
                                this.divMessage(false,true,['微信红包-发给','微信红包-来自'],false,true)
                            }
                        },
                        {
                            text: '添加提现消息', onPress: () => {
                                this.billType = 4
                                this.divMessage(false,false,['零钱提现-到'],true,false)
                            }
                        },
                        {
                            text: '添加充值消息', onPress: () => {
                                this.billType = 5
                                this.divMessage(false,false,['零钱充值-来自'],true,false)
                            }
                        },
                        {
                            text: '添加零钱通消息', onPress: () => {

                                this.billType = 6
                                this.divMessage(false,true,['零钱通转出-到','转入零钱通-来自'],false,true)
                            }
                        },
                        {
                            text: '二维码收付款', onPress: () => {
                                this.billType = 7
                                this.divMessage(false,true,['扫二维码付款-给','扫二维码付款-来自'],false,true)
                            }
                        },
                    ];
                    showModalOperation(items);
                }}/>
                <SectionList
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => this._renderCell(item)}
                    renderSectionHeader={({ section: { count } }) => (
                        this._renderSectionView(count)
                    )}
                />
            </View>
        );
    }

    _renderSectionView(section) {
        return (
            <View style={{padding:20,backgroundColor: '#F6F6F6'}}>
                <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                    <Text style={{color:'#353535',fontSize:18}}>
                        {section.date}
                    </Text>
                    <XImage style={{marginLeft:6,marginBottom:4}} icon={require('../../../../resource/common/zd_icon_more_x.png')} iconSize={11.37}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:4}}>
                    <Text style={{color:'#989898',fontSize:14}}>
                        支出 ￥{section.red} 收入￥{section.add}
                    </Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={{width:0.5,height:19,backgroundColor: '#D8D8D8'}}/>
                        <Text style={{color:'#989898',fontSize:14,marginLeft:24,marginRight:7}}>
                            统计
                        </Text>
                        <XImage icon={require('../../../../resource/common/zd_icon_more_right.png')} iconSize={11.37}/>
                    </View>
                </View>
            </View>
        )
    }
    _renderCell(item) {
        return (
            <View style={{padding:20, flexDirection:'row',alignItems:'center',flex:1,backgroundColor: 'white'}}>
                <View style={{alignSelf:'flex-start',borderRadius:22,width:44,height:44,overflow:'hidden'}}>
                    <XImage icon={item.operation_atavtar} iconSize={44}/>
                </View>
                <View style={{flex:1,marginLeft:11}}>
                    <Text style={{fontSize:18, color:'#353535'}}>
                        {item.desc}
                    </Text>
                    <Text style={{fontSize:13, color:'#B8B8B8',marginTop:3}}>
                        {item.add_time_date}
                    </Text>
                </View>

                <Text style={{fontSize:18, color:item.is_add == '+' ? 'rgb(231,84,30)':'#363636',marginTop:3,alignSelf:'flex-start'}}>
                    {item.is_add + item.amount}
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
