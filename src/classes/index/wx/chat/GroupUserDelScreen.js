import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BaseVC from "../../zfb/Common/BaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors} from "../../../../common/storage/Const";
import {clearRowFromRealm, queryFilterFromRealm, WXGroupMemberTableName} from "../../../../common/utils/RealmUtil";
import MsgListCell from "./views/MsgListCell";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {XImage, XText, XView} from "react-native-easy-app";

export default class GroupUserDelScreen extends BaseVC {
    constructor() {
        super();

        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        this._setPlaceViewBackgroundColor(Colors.white)
        this._setBarStyle(2);
        this._requestData();
        //this.props.route.params.c_id
    }

    _requestData() {
        queryFilterFromRealm(WXGroupMemberTableName, 'group_id=' + this.props.route.params.group_id).then(data => {
            this.setState({
                data
            })
            // console.log(data);
        })
    }

    _addSubView() {

        return (
            <>
                <WXNavigationBar title='成员列表' rightText='完成' nav_bg_color={Colors.white} noLine clickRText={() => {
                    for (const dataKey in this.state.data) {
                        let model = this.state.data[dataKey];
                        if (model.sel) {
                            clearRowFromRealm(model.id,WXGroupMemberTableName).then(this.props.route.params.refreshList)
                        }
                    }
                    navigation.goBack();
                }}/>

                <FlatList data={this.state.data}
                          style={{backgroundColor: Colors.white}}
                          renderItem={({item, index}) => this._renderCell(item)

                              //     <MsgListCell data={item} itemClick={() => {
                              //     navigation.push('ChattingScreen', {c_id: item.id});
                              // }}/>
                          }
                />
            </>
        )
    }

    _renderCell(item) {
        return (
            <XView onPress={()=>{
                item.sel = !item.sel;
                this.setState({
                    data:this.state.data
                })
            }} style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                paddingHorizontal: 15,
                justifyContent: 'space-between'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <XImage icon={item.user_avatar} iconSize={40}/>
                    <XText style={{marginLeft: 10,}} text={item.user_name}/>
                </View>

                <XImage style={{marginLeft: 5,}}
                        icon={item.sel ? require('../../../resource/index/chat/hb_send_select.png') : require('../../../resource/index/chat/hb_send_normal.png')}
                        iconSize={18}
                />
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
