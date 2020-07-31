import React from 'react';
import {StyleSheet, View, FlatList, Image, Text} from 'react-native';
import ZFBBaseVC from "../Common/ZFBBaseVC";
import {ZFBNavigationBar} from "../../../../common/widgets/ZFBNavigation";
import {NewPersonIconView} from "../../wx/chat/views/NewPersonView";
import Input from "teaset/components/Input/Input";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {showToast} from "../../../../common/widgets/Loading";
import {XFlatList, XImage, XText, XView} from "react-native-easy-app";
import {showActionSheet} from "../../../../compoments/YHUtils";
import {
    queryAllFromRealm,
    queryFilterFromRealm,
    writeToRealm,
    ZFBUserTableName
} from "../../../../common/utils/RealmUtil";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {Colors, Const} from "../../../../common/storage/Const";
import {_getTimeStringAutoShort2} from "../../../../common/utils/YHTimeUtil";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import {getNow} from "../../../../common/utils/DateUtils";

export default class PersonInfoScreen extends ZFBBaseVC {
    constructor() {
        super();
        this.state = {
            id:RNStorage.zfb_user_id,
            avatar:RNStorage.zfb_avatarUrl,
            nickname:RNStorage.zfb_user_name,
            account:RNStorage.zfb_account,
            level:RNStorage.zfb_account_level,
            ye:RNStorage.zfb_ye,
            yeb:RNStorage.zfb_yeb,
            data: [],
        }
    }

    componentDidMount() {
        super.componentDidMount();
        // queryFilterFromRealm(ZFBUserTableName,'id !=' + RNStorage.zfb_user_id).then((res)=>{
        //     console.log(res);
        // })
        this._requestData()
    }

    _requestData() {

        queryAllFromRealm(ZFBUserTableName).then((res)=>{
            this.setState({
                data:res
            })
        })
    }

    _addSubView() {
        return (
            <>
                <ZFBNavigationBar title='编辑个人资料' rightText={'完成'} clickRText={()=>{

                    writeToRealm({
                        id: parseInt(this.state.id),
                        user_name: this.state.nickname,
                        avatar: this.state.avatar,
                        account:this.state.account,
                        level:this.state.level,
                    },ZFBUserTableName).then(()=>{
                        RNStorage.zfb_user_id = this.state.id;
                        RNStorage.zfb_avatarUrl = this.state.avatar;
                        RNStorage.zfb_user_name = this.state.nickname;
                        RNStorage.zfb_account = this.state.account;
                        RNStorage.zfb_account_level = this.state.level;
                        RNStorage.zfb_ye = this.state.ye;
                        RNStorage.zfb_yeb = this.state.yeb;
                        this.props.route.params.refreshUserInfo && this.props.route.params.refreshUserInfo()
                        navigation.goBack()
                    })
                }}/>
                <NewPersonIconView icon={this.state.avatar} getImage={(img)=>{
                    this.setState({
                        avatar:img,
                    })
                }}/>
                <View style={{alignItems:'center'}}>

                    <Input
                        style={{width: 200, marginTop: 10,}}
                        size='md'
                        value={this.state.nickname}
                        placeholder='请输入昵称'
                        onChangeText={text => this.setState({name: text})}
                    />
                    <Input
                        style={{width: 200, marginTop: 10,}}
                        size='md'
                        value={this.state.account}
                        placeholder='请输入账号'
                        onChangeText={text => this.setState({account: text})}
                    />
                    <XView onPress={()=>{
                        let items = [
                            {title: '大众会员', onPress: () => {
                                    this.setState({
                                        level:'大众会员'
                                    })

                                }},
                            {title: '黄金会员', onPress: () => {
                                    this.setState({
                                        level:'黄金会员'
                                    })
                                }},
                            {title: '铂金会员', onPress: () => {
                                    this.setState({
                                        level:'铂金会员'
                                    })
                                }},
                            {title: '钻石会员', onPress: () => {
                                    this.setState({
                                        level:'钻石会员'
                                    })
                                }},
                        ];
                        showActionSheet(items);
                    }}>

                        <Input
                            style={{width: 200, marginTop: 10,}}
                            size='md'
                            editable={false}
                            value={this.state.level}
                            placeholder='请选择'
                        />
                    </XView>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item, index}) => {
                        return this._renderCell(item,index);
                    }}
                    ListHeaderComponent={() => {
                        return this._renderHeader();
                    }}
                />
            </>
        )
    }
    _renderHeader() {
        return (
            <View style={{padding:10,backgroundColor:'#EDEDED'}}>
                <Text style={{fontSize:12}}>其他用户</Text>
            </View>
        )
    }
    _renderCell(item,index) {
        return (
            <YHTouchableOpacity onPress={()=>{
                this.setState({
                    id:item.id,
                    nickname:item.user_name,
                    account:item.account,
                    level:item.level,
                    avatar:item.avatar,
                    ye:item.zfb_ye,
                    yeb:item.zfb_yeb,
                })
            }}>
                <View style={{flexDirection: 'row', paddingVertical: 11, paddingHorizontal: 15, alignItems: 'center'}}>
                    <XImage style={{borderRadius: 5}} icon={{uri: item.avatar}} iconSize={45}/>
                    <View style={{flex: 1, marginLeft: 11,}}>
                        <Text style={{fontSize: 16, color: Colors.black_text_color}}>{item.user_name}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: Colors.gray_text_color,
                            marginTop: 5,
                            height: 15,
                            maxWidth: Const.screenWidth - 150
                        }}>{item.account}</Text>
                    </View>
                </View>
                <YHDividingLine left={78}/>
            </YHTouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
