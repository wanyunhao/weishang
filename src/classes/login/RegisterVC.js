import React, {PureComponent} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, CommonStyles, Const} from "../../common/storage/Const";
import {NavigationBar} from "../../common/widgets/WidgetNavigation";
import LoginTF from "./LoginTF";
import {showMsg} from "react-native-debug-tool/lib/utils/DebugUtils";
import {RNStorage} from "../../common/storage/AppStorage";
import {XHttp} from "react-native-easy-app";
import {Api} from "../../common/http/Api";
import {showLoading, showToast} from "../../common/widgets/Loading";
import TimerButton from "../../compoments/countDownButton";
import LCCountDownButton from "../../compoments/countDownButton";
import {Notify} from "../../common/events/Notify";

export default class RegisterVC extends PureComponent {
    constructor() {
        super();
        this.state = {
            phone: '',
            code: '',
            password: '',
            // 1: 注册  2: 忘记密码 3: 快捷登录
            type: undefined,
        }
    }

    componentDidMount() {
        this.setState({
            type: this.props.route.params.type
        })
    }

    render() {
        let title = '';
        switch (this.state.type) {
            case 1:
                title = '注册';
                break;
            case 2:
                title = '忘记密码';
                break;
            case 3:
                title = '快捷登录';
                break;
            default:
                break;
        }
        return (
            <View style={[CommonStyles.container]}>
                <NavigationBar title={title}/>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.app_icon} source={require('../resource/common/app_icon.png')}/>
                    </View>
                    <View style={{marginTop: 30}}>
                        <LoginTF
                            lefticon={require('../resource/login/login_phone.png')}
                            placeholder='手机号'
                            maxLength={11}
                            onChangeText={(text) => this.setState({phone: text})}
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <LoginTF
                                placeholder='请输入验证码'
                                maxLength={6}
                                onChangeText={(text) => this.setState({code: text})}
                            />
                            <LCCountDownButton
                                frameStyle={{top: 5, right: 15, width: 120, height: 40, position: 'absolute'}}
                                beginText='获取验证码'
                                endText='再次获取验证码'
                                count={60}
                                pressAction={() => {
                                    if (this.state.phone.length != 11) {
                                        showToast('请输入正确手机号');
                                        return;
                                    }
                                    let url = '';
                                    switch (this.state.type) {
                                        case 1:
                                            url = Api.register_captcha;
                                            break;
                                        case 2:
                                            url = Api.user_pwd_captcha;
                                            break;
                                        case 3:
                                            url = Api.login_captcha;
                                            break;
                                    }
                                    XHttp().url(url)
                                        .param({mobile: this.state.phone})
                                        .loadingFunc(loading => showLoading('发送中...', loading))
                                        .post((success, json) => {
                                            showToast(json.msg);
                                            if (success) {
                                                this.countDownButton.startCountDown();
                                            }
                                        })
                                }}
                                changeWithCount={(count) => count + 's后重新获取'}
                                id='register'
                                ref={(e) => {
                                    this.countDownButton = e
                                }}
                            />
                            {/*<TouchableOpacity style={styles.getMessage} onPress={() => {*/}
                            {/*    if (this.state.phone.length != 11) {*/}
                            {/*        showToast('请输入正确手机号');*/}
                            {/*        return;*/}
                            {/*    }*/}
                            {/*    if (this.state.type == 1) {*/}
                            {/*        XHttp().url(Api.register_captcha)*/}
                            {/*            .param({mobile: this.state.phone})*/}
                            {/*            .post((success, json) => {*/}
                            {/*                showToast(json.msg);*/}
                            {/*            })*/}
                            {/*    }*/}
                            {/*    showMsg("发送验证码")*/}
                            {/*}}>*/}
                            {/*    <Text style={{color: Colors.blue, fontSize: 15, lineHeight: 40}}>获取验证码</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        {this.state.type != 3 ? <LoginTF
                            lefticon={require('../resource/login/login_password.png')}
                            placeholder='密码'
                            onChangeText={(text) => this.setState({password: text})}
                            showIcon={true}
                        /> : null}

                    </View>
                    <View style={styles.content_view}>
                        <TouchableOpacity style={styles.login_btn} onPress={this.login}>
                            <Text style={{color: Colors.white}}>完成</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    login = () => {
        navigation.popToTop();
        if (this.state.type == 1) {
            XHttp().url(Api.register_mobile)
                .param({mobile: this.state.phone, captcha: this.state.code, password: this.state.password})
                .loadingFunc((loading) => showLoading('注册中...', loading))
                .post((success, data, msg) => {
                    showToast(data.msg);
                    if (success) {
                        RNStorage.token = json.data.token;
                        Notify.LOGIN_SUCCESS.sendEvent({isLogin: true});
                        navigation.popToTop();
                    }
                });
        }
        if (this.state.type == 2) {
            XHttp().url(Api.user_pwd_captcha)
                .param({mobile: this.state.phone, captcha: this.state.code, password: this.state.password})
                .loadingFunc((loading) => showLoading('修改中...', loading))
                .post((success, data, msg) => {
                    showToast(data.msg);
                    if (success) {
                        RNStorage.token = json.data.token;
                        Notify.LOGIN_SUCCESS.sendEvent({isLogin: true});
                        navigation.popToTop();
                    }
                });
        }
        if (this.state.type == 3) {
            XHttp().url(Api.login_mobile)
                .param({mobile: this.state.phone, captcha: this.state.code, type: 'mobile'})
                .loadingFunc((loading) => showLoading('登录中...', loading))
                .post((success, data, msg) => {
                    showToast(data.msg);
                    if (success) {
                        RNStorage.token = json.data.token;
                        Notify.LOGIN_SUCCESS.sendEvent({isLogin: true});
                        navigation.popToTop();
                    }
                });
        }
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
    },
    getMessage: {
        position: 'absolute',
        width: 110,
        height: 40,
        backgroundColor: 'red',
        top: 0,
        left: 0
    },
});
