import React from "react";
import {Dimensions, StyleSheet, View,DeviceEventEmitter } from "react-native";
import {XFlatList} from "react-native-easy-app";
import MsgListCell from "./views/MsgListCell";
import {Colors} from "../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {
    instance,
    queryFilterFromRealm,
    UsersTableName,
    WXConversationTableName
} from "../../../../common/utils/RealmUtil";
import {getNow} from "../../../../common/utils/DateUtils";
import BaseVC from "../../zfb/Common/BaseVC";

const {width} = Dimensions.get("window");
const Realm = require('realm');
export default class ConversationScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount() {
        this.requestData();
        this.changeStatus();
    }

    changeStatus() {
        super._setBarStyle(2);
        super._setPlaceViewBackgroundColor('#EDEDED')
    }

    requestData() {
        this.realm = instance;
        var objects = this.realm.objects(WXConversationTableName);
        var data = [];
        for (const objectsKey in objects) {
            let model = objects[objectsKey];
            queryFilterFromRealm(UsersTableName,'id=' + model.df_user_id).then((user)=>{
                if (user != null) {
                    model.userinfo = user[0];
                }
                data.push(model);

                this.setState({
                    data:data,
                })
            })
        }
    }

    _addSubView() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='微信' hideBack={true} rightText='添加' clickRText={()=>{
                    instance.write(() => {
                        instance.create(WXConversationTableName, {
                            id: getNow(),
                            user_id: 1,
                            df_user_id: 9527,
                        }, Realm.UpdateMode.Never);
                    });
                    this.requestData();

                }}/>

                <XFlatList data={this.state.data}
                           style={{backgroundColor: Colors.white}}
                           renderItem={({item, index}) => <MsgListCell data={item} itemClick={() => {
                               navigation.push('ChattingScreen',{data:item});
                           }}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
