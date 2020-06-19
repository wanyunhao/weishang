import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView, TouchableOpacity,
} from 'react-native';
import {Colors, CommonStyles, Const} from "../../../common/storage/Const";
import {NavigationBar} from "../../../common/widgets/WidgetNavigation";
import {showToast} from "../../../common/widgets/Loading";
import {RNStorage} from "../../../common/storage/AppStorage";
import {Notify} from "../../../common/events/Notify";
import {XHttp} from "react-native-easy-app";
import {Api} from "../../../common/http/Api";

export default class MineVC extends PureComponent {
    constructor() {
        super();
        this.state = {
            isLogin: false,
            nickname: '',
            avatarUrl: '',
            openId: '',
        }
    }

    componentDidMount() {
        // this.setState({
        //     isLogin: (RNStorage.token != null && RNStorage.token.length > 15),
        // }, () => {
        //     console.log(RNStorage.token);
        //     console.log(this.state.isLogin);
        //     if (this.state.isLogin) {
        //         this._requestUerinfo();
        //     }
        // })
        //
        // Notify.LOGIN_SUCCESS.register(this.loginOpeartion);
    }

    _requestUerinfo() {
        // XHttp()
        //     .url(Api.user_info)
        //     .post((success, json, message) => {
        //         if (success) {
        //             console.log(json);
        //             const model = json.data;
        //             this.setState({
        //                 nickname: model.nickname,
        //                 avatarUrl: model.avatarUrl,
        //                 openId: model.openId,
        //             })
        //             RNStorage.avatarUrl = model.avatarUrl;
        //         } else {
        //             showToast(message);
        //         }
        //     })
    }

    loginOpeartion = (result) => {
        // if (result.isLogin == true) {
        //     this.setState({
        //         isLogin: true,
        //     })
        //     this._requestUerinfo();
        // }
    }

    componentWillUnmount() {
        // Notify.LOGIN_SUCCESS.unRegister(this.loginOpeartion);
    }

    render() {
        return (
                <View style={[CommonStyles.container]}>
                    <NavigationBar title='我的' hideBack={true}/>
                    {/*<ScrollView>*/}
                    {/*    {this.state.isLogin ? (*/}
                    {/*        <View style={styles.container_person_info}>*/}
                    {/*            <Image style={styles.container_person_info_img} source={{uri: this.state.avatarUrl}}/>*/}
                    {/*            <View style={styles.container_person_info_text}>*/}
                    {/*                <Text style={styles.container_person_info_name}>{this.state.nickname}</Text>*/}
                    {/*                <Text style={styles.container_person_info_id}>{this.state.openId}</Text>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    ) : (*/}
                    {/*        <TouchableOpacity onPress={() => {*/}
                    {/*            navigation.push('Login');*/}
                    {/*        }} activeOpacity={1}>*/}
                    {/*            <Image style={{width: Const.screenWidth}}*/}
                    {/*                   source={require('../../resource/mine/nologinperson.png')}/>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    )}*/}

                    {/*    <MineIndexTableCell*/}
                    {/*        title="我的关注"*/}
                    {/*        sub_title="我关注的院校"*/}
                    {/*        onPress={() => {*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*    <MineIndexTableCell*/}
                    {/*        title="我的讨论"*/}
                    {/*        sub_title="参与的讨论帖都在这里"*/}
                    {/*        onPress={() => {*/}

                    {/*        }}*/}
                    {/*    />*/}
                    {/*    <MineIndexTableCell*/}
                    {/*        title="绑定手机"*/}
                    {/*        sub_title="全绑定"*/}
                    {/*        onPress={() => {*/}

                    {/*        }}*/}
                    {/*    />*/}
                    {/*    <MineIndexTableCell*/}
                    {/*        title="个人资料"*/}
                    {/*        sub_title="姓名/学校等信息"*/}
                    {/*        onPress={() => {*/}
                    {/*            if (!this.state.isLogin) {*/}
                    {/*                showToast('您还没有登录')*/}
                    {/*                return;*/}
                    {/*            }*/}
                    {/*            navigation.push('PersonInfo');*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*    {this.state.isLogin ? (*/}

                    {/*        <TouchableOpacity activeOpacity={1} style={styles.login_out_btn} onPress={() => {*/}
                    {/*            Modal.alert('温馨提示', '是否确定退出登录', [*/}
                    {/*                {*/}
                    {/*                    text: '取消',*/}
                    {/*                    onPress: () => console.log('cancel'),*/}
                    {/*                    style: 'cancel',*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    text: '确定',*/}
                    {/*                    onPress: () => {*/}
                    {/*                        this.setState({*/}
                    {/*                            isLogin: false*/}
                    {/*                        })*/}
                    {/*                        RNStorage.token = undefined;*/}
                    {/*                        Notify.LOGIN_SUCCESS.sendEvent({isLogin: false});*/}
                    {/*                    }*/}
                    {/*                },*/}
                    {/*            ]);*/}
                    {/*        }}>*/}
                    {/*            <Text style={{color: Colors.white, fontSize: 16}}>退出登录</Text>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    ) : null}*/}
                    {/*</ScrollView>*/}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_person_info: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    container_person_info_img: {
        width: 70,
        height: 70,
    },
    container_person_info_text: {
        marginLeft: 8,
    },
    container_person_info_name: {
        fontSize: 16,
        color: Colors.black_text_color,
    },
    container_person_info_id: {
        fontSize: 14,
        color: Colors.deep_gray_text_color,
    },
    login_out_btn: {
        marginLeft: 15,
        width: Const.screenWidth - 30,
        height: 50,
        backgroundColor: Colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderRadius: 5
    },
});
