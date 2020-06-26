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
    WXConversationTableName, instance, MSGTableName
} from "../../../../common/utils/RealmUtil";
import {showMsg} from "react-native-debug-tool/lib/utils/DebugUtils";

const {width} = Dimensions.get("window");
const Realm = require('realm');
export default class ConversationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            data:[],
        };
    }

    componentDidMount() {
        queryAllFromRealm(WXConversationTableName)
            .then((data)=>{
                // showMsg(data)
                console.log(data);
                // this.setState({
                //     data:data,
                // })
            })
    }

    componentWillUnmount() {
        // Close the realm if there is one open.
        // const {realm} = this.state;
        // if (realm !== null && !realm.isClosed) {
        //     realm.close();
        // }
    }
    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar title='微信' hideBack={true} rightText='添加' clickRText={()=>{
                    let realm = instance;

                    let conversation = realm.objects(WXConversationTableName).filtered('id=1')
                    // showMsg(conversation);
                    let msgs = conversation.msgs || [];
                    msgs.push({id:101,other: true,type:1,text:'垃圾试试水'})
                    realm.write(() => {
                        realm.create(WXConversationTableName, {id: 1,msgs: msgs}, Realm.UpdateMode.Modified);
                    });
                    // realm.write(()=>{
                    //     let conversation =
                    // })

                }}/>

                <XFlatList data={this.state.data}
                           style={{backgroundColor: Colors.white}}
                           renderItem={({item, index}) => <MsgListCell itemClick={() => {
                               navigation.push('ChattingScreen');
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
