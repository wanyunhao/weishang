import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Colors, CommonStyles, Const} from "../../common/storage/Const";
import {NavigationBar} from "../../common/widgets/WidgetNavigation";
import LoginTF from "./LoginTF";
import {showMsg} from "react-native-debug-tool/lib/utils/DebugUtils";
import {RNStorage} from "../../common/storage/AppStorage";
import {XHttp} from "react-native-easy-app";
import {Api} from "../../common/http/Api";
import {showLoading, showToast} from "../../common/widgets/Loading";
import {Notify} from "../../common/events/Notify";

export default class LoginVC extends PureComponent {
    constructor() {
        super();
        this.state = {
            phone: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={[CommonStyles.container]}>
                <NavigationBar title='登录'/>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.app_icon} source={require('../resource/login/logo.png')}/>
                    </View>
                    <View style={{marginTop: 30}}>
                        <LoginTF
                            lefticon={require('../resource/login/login_phone.png')}
                            placeholder='手机号'
                            maxLength={11}
                            onChangeText={(text) => this.setState({phone: text})}
                            value="17721111165"
                        />

                        <LoginTF
                            lefticon={require('../resource/login/login_password.png')}
                            placeholder='密码'
                            onChangeText={(text) => this.setState({password: text})}
                            showIcon={true}
                            value="111111"
                        />
                    </View>
                    <View style={styles.content_view}>
                        <TouchableOpacity style={styles.login_btn} onPress={this.login}>
                            <Text style={{color: Colors.white}}>登 录</Text>
                        </TouchableOpacity>
                        <View style={styles.reg_forget_content}>
                            <TouchableOpacity style={styles.reg_forget_content_btn} onPress={() => {
                                navigation.push('Register', {type: 1});
                            }}>
                                <Text>立即注册</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reg_forget_content_btn} onPress={() => {
                                navigation.push('Register', {type: 2});
                            }}>
                                <Text>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    login = () => {
        // if (this.state.phone.length == 0 || this.state.password.length == 0) {
        //     showToast('请输入手机号或者密码');
        //     return;
        // }
        // XHttp().param({account: this.state.phone, password: this.state.password, type: 'account'})
        // XHttp().param({account: '17721111165', password: '111111', type: 'account'})
        //     .url(Api.login_account)
        //     .loadingFunc(loading => showLoading('登陆中...',loading))
        //     .post((success, json, message, status) => {
        //         showToast(json.msg);
        //         if (success) {
        //             RNStorage.token = json.data.token;
        //             Notify.LOGIN_SUCCESS.sendEvent({isLogin: true});
        //             navigation.goBack();
        //         }
        //     })
    }
}

const styles = StyleSheet.create({
    content_view: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    app_icon: {
        width: 80,
        height: 80,
        marginTop: 50,
    },
    login_btn: {
        width: Const.screenWidth - 30,
        height: 50,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderRadius: 5
    },
    reg_forget_content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reg_forget_content_btn: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});
