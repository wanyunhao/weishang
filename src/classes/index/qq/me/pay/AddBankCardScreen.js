import React, {Component} from "react";
// import UserInfoUtil from "../utils/UserInfoUtil";
// import CountEmitter from "../event/CountEmitter";
// import TabConfig from "../configs/TabNavConfigs";

import {Dimensions, StyleSheet, View,ScrollView,Text,TextInput,FlatList} from "react-native";
import {WXNavigationBar} from "../../../../../common/widgets/WXNavigation";
import DiscoveryListCell from "../../discovery/view/DiscoveryListCell";
import {Colors, Const} from "../../../../../common/storage/Const";
import {XHttp, XImage, XText} from "react-native-easy-app";
import {showToast} from "../../../../../common/widgets/Loading";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import TitleAndSubCell from "./views/TitleAndSubCell";
import BaseVC from "../../../zfb/Common/BaseVC";
import MsgListCell from "../../chat/views/MsgListCell";
import {Api} from "../../../../../common/http/Api";
import {isEmpty} from "../../../../../common/utils/Utils";
import {writeToRealm, WXQB_BankTableName} from "../../../../../common/utils/RealmUtil";
import {getNow} from "../../../../../common/utils/DateUtils";

const {width} = Dimensions.get("window");

export default class AddBankCardScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            inputMsg:'',
            data:[],
            bank_name:'',
            bank_num:''
        };
    }

    componentDidMount() {
        XHttp().url(Api.api_Usercenter_getBank)
            .param({token:123456})
            .post((success, json) => {
                if (success) {
                    this.setState({
                        data:json.data || []
                    })
                }
            })
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='新增银行卡' rightText='完成' clickRText={()=>{
                    if (isEmpty(this.state.bank_name) || isEmpty(this.state.bank_num)) {
                        showToast('请选择')
                        return;
                    }
                    let obj = {id:getNow(),bank_name: this.state.bank_name,bank_num: this.state.bank_num,bank_icon: this.state.bank_icon}
                    writeToRealm(obj,WXQB_BankTableName).then(()=>{
                        this.props.route.params.refreshBankList();
                        navigation.goBack();
                    })

                }}/>
                <TitleAndSubCell isEdit={false} title='银行名称' sub_title={this.state.bank_name}/>
                <TitleAndSubCell isEdit={true} title='银行卡四位尾号' onChangeText={(text)=>{
                    this.setState({
                        bank_num:text
                    })
                }}/>
                <FlatList data={this.state.data}
                          style={{backgroundColor: Colors.white}}
                          renderItem={({item, index}) => {
                              return (
                                  <YHTouchableOpacity style={{flexDirection:'row',padding:15}} onPress={()=>{
                                      this.setState({
                                          bank_name:item.bank_name,
                                          bank_icon:item.bank_ico,
                                      })
                                  }}>
                                      <XImage icon={item.bank_ico} iconSize={25}/>
                                      <XText style={{marginLeft:15}} text={item.bank_name}/>
                                      <YHDividingLine/>
                                  </YHTouchableOpacity>
                              )
                          }}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg,
    },
});
