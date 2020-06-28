import React, {Component} from "react";
import Global from "../../../../common/utils/Global";
import {Dimensions, Keyboard, PixelRatio, StyleSheet, View,} from "react-native";
import {NavigationBar} from "../../../../common/widgets/WidgetNavigation";
import HongBaoCell from "./views/HongBaoCell";
import {XFlatList} from "react-native-easy-app";
import MsgListCell from "./views/MsgListCell";
import {Colors} from "../../../../common/storage/Const";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {
    WXMSGSchema,
    queryAllFromRealm,
    writeToRealm,
    WXConversationSchema,
    WXConversationTableName, instance, MSGTableName, UsersTableName
} from "../../../../common/utils/RealmUtil";
import {showMsg} from "react-native-debug-tool/lib/utils/DebugUtils";
import {getNow} from "../../../../common/utils/DateUtils";
import {RNStorage} from "../../../../common/storage/AppStorage";

const {width} = Dimensions.get("window");
const Realm = require('realm');
export default class ConversationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        this.realm = instance;
        var objects = this.realm.objects(WXConversationTableName);
        var data = [];
        for (const objectsKey in objects) {
            let model = objects[objectsKey];
            let user = this.realm.objects(UsersTableName).filtered('id=' + model.user_id);
            if (user != null) {
                model.userinfo = user[0];
            }
            data.push(model);
        }
        this.setState({
            data:data,
        })
    }

    componentWillUnmount() {
        // if (this.realm !== null && !this.realm.isClosed) {
        //     this.realm.close();
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='微信' hideBack={true} rightText='添加' clickRText={()=>{
                    instance.write(() => {
                        instance.create(WXConversationTableName, {
                            id: getNow(),
                            user_id: 1,
                            df_user_id: 1,
                        }, Realm.UpdateMode.Never);
                    });
                    this.requestData();
                    console.log(Realm.defaultPath);

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
