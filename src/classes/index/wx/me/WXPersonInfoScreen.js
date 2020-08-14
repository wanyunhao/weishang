import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ZFBNavigationBar} from "../../../../common/widgets/ZFBNavigation";
import Input from "teaset/components/Input/Input";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {XImage, XView} from "react-native-easy-app";
import {showActionSheet} from "../../../../compoments/YHUtils";
import {queryAllFromRealm, SelfTableName, writeToRealm, ZFBUserTableName} from "../../../../common/utils/RealmUtil";
import YHDividingLine from "../../../../common/widgets/YHDividingLine";
import {Colors, Const} from "../../../../common/storage/Const";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import WXBaseVC from "../../zfb/Common/WXBaseVC";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {NewPersonIconView} from "../chat/views/NewPersonView";

export default class WXPersonInfoScreen extends WXBaseVC {
    constructor() {
        super();
        this.state = {
            id:RNStorage.user_id,
            avatar:RNStorage.avatarUrl,
            nickname:RNStorage.user_name,
            account:RNStorage.account,
            data: [],
        }
    }

    componentDidMount() {
        super.componentDidMount();
        // queryFilterFromRealm(ZFBUserTableName,'id !=' + RNStorage.zfb_user_id).then((res)=>{
        //     console.log(res);
        // })
        // this._requestData()
    }

    _requestData() {

        queryAllFromRealm(SelfTableName).then((res)=>{
            this.setState({
                data:res
            })
        })
    }

    _addSubView() {
        return (
            <>
                <WXNavigationBar title='编辑个人资料' rightText={'完成'} clickRText={()=>{

                    writeToRealm({
                        id: parseInt(this.state.id),
                        user_name: this.state.nickname,
                        avatar: this.state.avatar,
                        account:this.state.account,
                    },SelfTableName).then(()=>{
                        RNStorage.avatarUrl = this.state.avatar;
                        RNStorage.user_name = this.state.nickname;
                        RNStorage.account = this.state.account;
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
                        onChangeText={text => this.setState({nickname: text})}
                    />
                    <Input
                        style={{width: 200, marginTop: 10,}}
                        size='md'
                        value={this.state.account}
                        placeholder='请输入账号'
                        onChangeText={text => this.setState({account: text})}
                    />

                </View>
                {/*<FlatList*/}
                {/*    data={this.state.data}*/}
                {/*    renderItem={({item, index}) => {*/}
                {/*        return this._renderCell(item,index);*/}
                {/*    }}*/}
                {/*    ListHeaderComponent={() => {*/}
                {/*        return this._renderHeader();*/}
                {/*    }}*/}
                {/*/>*/}
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
