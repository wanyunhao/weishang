import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BaseVC from "../../zfb/Common/BaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors} from "../../../../common/storage/Const";
import {
    clearRowFromRealm,
    clearRowFromRealmFiltered, instance, MSGTableName,
    queryFilterFromRealm,
    WXGroupMemberTableName
} from "../../../../common/utils/RealmUtil";
import MsgListCell from "./views/MsgListCell";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {XImage, XText, XView} from "react-native-easy-app";

export default class GroupUserDelScreen extends BaseVC {
    constructor() {
        super();

        this.state = {
            data: {},
            isChoose: false,
        }
    }

    componentDidMount() {
        this._setPlaceViewBackgroundColor(Colors.white)
        this._setBarStyle(2);
        this._requestData();
        this.setState({
            isChoose: this.props.route.params.fromChoose,
        })
        //this.props.route.params.c_id
    }

    _requestData() {
        queryFilterFromRealm(WXGroupMemberTableName, 'isDelete = false AND group_id=' + this.props.route.params.group_id).then(data => {
            this.setState({
                data
            })
            // console.log(data);this.props.route.params.fromChoose
        })
    }

    _addSubView() {

        return (
            <>
                <WXNavigationBar title='成员列表' rightText={this.state.isChoose ? null:'完成'} nav_bg_color={Colors.white} noLine clickRText={() => {
                    for (const dataKey in this.state.data) {
                        let model = this.state.data[dataKey];
                        if (model.sel) {
                            console.log(1)

                            instance.write(() => {
                                let arrays1 = instance.objects(MSGTableName);
                                let row1 = arrays1.filtered('send_id=' + model.user_id);
                                instance.delete(row1);

                                console.log(3)
                            })
                            instance.write(() => {
                                let arrays = instance.objects(WXGroupMemberTableName);
                                let row = arrays.filtered('id=' + model.id);
                                instance.delete(row);
                                console.log(2)
                            })
                            console.log(4)
                            // clearRowFromRealm(model.id,WXGroupMemberTableName).then(this.props.route.params.refreshList)
                            // clearRowFromRealmFiltered(MSGTableName,'send_id='+ model.user_id).then(()=>{
                            //     console.log('删消息成功')
                            //     clearRowFromRealm(model.id,WXGroupMemberTableName).then(()=>{
                            //         console.log('删ren 成功')
                            //         this.props.route.params.refreshList();
                            //         navigation.goBack();
                            //     })
                            // });
                        }
                    }
                    navigation.goBack();
                }}/>

                <FlatList data={this.state.data}
                          style={{backgroundColor: Colors.white}}
                          renderItem={({item, index}) => this._renderCell(item)
                          }
                />
            </>
        )
    }

    _renderCell(item) {
        return (
            <XView onPress={()=>{
                if (this.state.isChoose) {
                    this.props.route.params.refreshList(item)
                    navigation.goBack();
                } else {
                    item.sel = !item.sel;
                    this.setState({
                        data:this.state.data
                    })
                }
            }} style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                paddingHorizontal: 15,
                justifyContent: 'space-between'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <XImage icon={item.avatar} iconSize={40}/>
                    <XText style={{marginLeft: 10,}} text={item.user_name}/>
                </View>

                {this.state.isChoose ? null : <XImage style={{marginLeft: 5,}}
                                                      icon={item.sel ? require('../../../resource/index/chat/hb_send_select.png') : require('../../../resource/index/chat/hb_send_normal.png')}
                                                      iconSize={18}
                />}
                <YHDividingLine/>
            </XView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
