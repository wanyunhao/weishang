import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    NativeModules,
} from 'react-native';
import {Colors, CommonStyles, Const} from "../../../common/storage/Const";

import {showToast} from '../../../common/widgets/Loading';
import {XHttp, XView} from "react-native-easy-app";
import {Api} from "../../../common/http/Api";

export default class IndexVC extends PureComponent {
    constructor() {
        super();
        this.state = {
            floors: [],
            itemTag_dic: {}
        }
    }

    componentDidMount() {
        this._requestData();
    }

    _requestData() {
        // XHttp().url(Api.course_home)
        //     .param({devUuid: '123', devType: 'ios', devOs: 'ios', pageNo: 1, pageSize: 10})
        //     .post((success, json) => {
        //
        //         console.log(json);
        //         if (success) {
        //             this.setState({
        //                 floors: json.data.floors || [],
        //             })
        //         }
        //     })
    }

    render() {
        return (
            <View style={[CommonStyles.container, {marginTop: INSETS.top}]}>
                <TouchableOpacity onPress={()=>{
                    navigation.push('WX');
                }}><Text>111111</Text></TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    top_container: {//默认页面背景样式
        flex: 1,
        height: 200,
    },
    wrapper: {
        height: 220
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide1_img: {
        width: Const.screenWidth,
        height: 200,
    }
});
