import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {XFlatList, XHttp, XImage, XText} from "react-native-easy-app";
import {Colors, Const} from "../../../../common/storage/Const";
import MsgListCell from "../chat/views/MsgListCell";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {Api} from "../../../../common/http/Api";
import {deepClone} from "../../../../common/utils/Utils";
import {UsersTableName, writeToRealm} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import {Button, Label, Menu, Overlay} from "teaset";
import {showToast} from "../../../../common/widgets/Loading";

export default class WXNewFriendScreen extends WXBaseVC {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._requestData();
    }

    _requestData(type) {
        XHttp().url(Api.Usercenter_getUserlist)
            .param({token: '123456'})
            .post((success, json) => {
                if (success) {
                    this.setState({
                        data: json.data || []
                    })
                }
            })
    }


    showRight() {
        let items = [
            {
                title: '新建列表', onPress: () => {
                    this._requestData(1)
                }
            },
            {
                title: '添加列表', onPress: () => {
                    this._requestData(2)
                }
            },
            {
                title: '刷新列表', onPress: () => {
                    this._requestData(3)
                }
            },
        ];
        Menu.show({x: Const.screenWidth - 50, y: INSETS.top + 52, width: 0, height: 0}, items, 'end');
    }

    _addSubView() {
        return (
            <>
                <WXNavigationBar noLine title='新的朋友' rightText='添加朋友' clickRText={() => {
                    this.showRight();
                }}/>

                <View style={{backgroundColor: '#EDEDED', paddingVertical: 7, paddingHorizontal: 11}}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3,
                        height: 30
                    }}>
                        <XImage icon={require('../../../resource/index/wx/lxr/xdpy_icon_search.png')} iconSize={15.6}/>
                        <Text style={{color: '#B2B2B2', fontSize: 15, marginLeft: 7}}>微信号/手机号</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingVertical: 17,
                    backgroundColor: Colors.white
                }}>
                    <XImage icon={require('../../../resource/index/wx/lxr/tel.png')} iconSize={18.3}/>
                    <Text style={{color: '#171717', fontSize: 15, marginLeft: 17}}>添加手机联系人</Text>
                </View>
                <View style={{paddingLeft: 15, backgroundColor: '#EDEDED'}}>
                    <Text style={{color: '#171717', fontSize: 13, marginVertical: 8}}>近三天</Text>
                </View>
                <FlatList data={this.state.data}
                          renderItem={({item, index}) => {
                              return (
                                  <View style={{
                                      flexDirection: 'row',
                                      paddingHorizontal: 15,
                                      paddingVertical: 11,
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      backgroundColor: Colors.white
                                  }}>
                                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                          <XImage style={{borderRadius: 4}} icon={item.img} iconSize={45}/>
                                          <View style={{marginLeft: 15,}}>
                                              <Text style={{color: '#1C1C1C', fontSize: 16,}}>{item.name}</Text>
                                              <Text style={{color: '#7F7F7F', fontSize: 13}}>我是{item.name}</Text>
                                          </View>
                                      </View>

                                      {item.isTY ? (
                                          <Text style={{color: '#B2B2B2', fontSize: 14}}>已添加</Text>
                                      ) : (
                                          <XText onPress={() => {
                                              item.isTY = true;
                                              let data = deepClone(this.state.data);
                                              this.setState({
                                                  data
                                              })
                                              writeToRealm({
                                                  id: getNow(),
                                                  user_name: item.name,
                                                  avatar: item.img,
                                              }, UsersTableName).then((res) => {
                                                  this.props.route.params.refreshList();
                                              })
                                          }} text='接受' style={{
                                              width: 63,
                                              height: 34,
                                              backgroundColor: '#F3F3F3',
                                              color: '#07C160',
                                              borderRadius: 5,
                                              fontSize: 14,
                                              textAlign: 'center',
                                              lineHeight: 34
                                          }}/>

                                      )}

                                      <YHDividingLine left={76}/>
                                  </View>
                              )
                          }}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
