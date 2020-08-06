import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import {XImage, XText, XView} from "react-native-easy-app";
import {Colors} from "../../../../../common/storage/Const";
import SyanImagePicker from 'react-native-syan-image-picker';
import {getPeople, showActionSheet, showEasyActionSheet, showOverlayPull} from "../../../../../compoments/YHUtils";
import {Checkbox, Input, Overlay} from "teaset";
import {Button} from "@ant-design/react-native";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {isEmpty} from "../../../../../common/utils/Utils";
import {showToast} from "../../../../../common/widgets/Loading";
import {RNStorage} from "../../../../../common/storage/AppStorage";
import YHDatePicker from "./YHDatePicker";
import {
    MSGTableName,
    queryAllFromRealm,
    writeToRealm,
    WXConversationTableName, WXQB_BankTableName
} from "../../../../../common/utils/RealmUtil";
import {dateFormat, getNow} from "../../../../../common/utils/DateUtils";
import {Notify} from "../../../../../common/events/Notify";
import YHDividingLine from "../../../../../common/widgets/YHDividingLine";

export default class NewPersonView extends Component {
    constructor() {
        super();
        this.state = {
            icon: require('../../../../resource/common/default_head_icon.png'),
            name: ''
        }

    }

    componentDidMount() {

        this._requestData();
    }

    _requestData() {
        getPeople(1, (data) => {
            this.setState({
                icon: data[0].img,
                name: data[0].name
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10,}}>
                    <XView onPress={() => {
                        this._requestData();
                    }} style={{alignItems: 'center'}}>
                        <XImage icon={require('../../../../resource/common/auto_get_pic.png')} iconSize={35}/>
                        <XText style={{fontSize: 10, color: Colors.gray_text_color}} text='自动获取'/>
                    </XView>
                    <XImage onPress={this.props.cancelClick} style={{marginLeft: 40, marginRight: 40}}
                            icon={this.state.icon} iconSize={60}/>
                    <XView onPress={() => {
                        SyanImagePicker.showImagePicker({
                            imageCount: 1,
                            isCrop: true,
                            allowPickingOriginalPhoto: false,
                            isCamera: false,
                            enableBase64: true
                        }, (err, selectedPhotos) => {
                            if (err) {
                                // 取消选择
                                return;
                            }
                            // 选择成功，渲染图片
                            // ...
                            this.setState({
                                icon: selectedPhotos[0].base64
                            })
                        })
                    }} style={{alignItems: 'center'}}>
                        <XImage icon={require('../../../../resource/common/manual_get_pic.png')} iconSize={35}/>
                        <XText style={{fontSize: 10, color: Colors.gray_text_color}} text='从相册获取'/>
                    </XView>
                </View>

                <Input
                    style={{width: 200, marginTop: 10,}}
                    size='md'
                    value={this.state.name}
                    placeholder='请输入昵称'
                    onChangeText={text => this.setState({name: text})}
                />

                <ConfirmCancelView cancelClick={this.props.cancelClick} confirmClick={()=>{
                    if (isEmpty(this.state.name)) {
                        showToast('请输入昵称');
                        return
                    }
                    if (isEmpty(this.state.icon)) {
                        showToast('请输入选择头像');
                        return
                    }
                    const obj = {name: this.state.name, icon: this.state.icon};
                    this.props.confirmClick(obj)
                }}/>
            </View>
        );
    }
}

export class TwoInputView extends Component {

    constructor() {
        super();
        this.state = {
            group_name:undefined,
            group_count:undefined
        }
    }

    render() {
        return (
            <View style={{ alignItems: 'center', marginTop: 10,height:180,}}>
                <Input
                    style={{width: 200, marginTop: 10,}}
                    size='md'
                    value={this.state.group_name}
                    placeholder='请输入群名称'
                    onChangeText={text => this.setState({group_name: text})}
                />
                <Input
                    style={{width: 200, marginTop: 10,}}
                    size='md'
                    value={this.state.group_count}
                    placeholder='请输入群人数'
                    onChangeText={text => this.setState({group_count: text})}
                />

                <ConfirmCancelView cancelClick={this.props.cancelClick} confirmClick={()=>{
                    if (isEmpty(this.state.group_name)) {
                        showToast('请输入群名称');
                        return
                    }
                    if (isEmpty(this.state.group_count)) {
                        showToast('请输入群人数');
                        return
                    }
                    const obj = {group_name: this.state.group_name, group_count: this.state.group_count};
                    this.props.confirmClick(obj)
                }}/>
            </View>
        );
    }
}
export class ConfirmCancelView extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
                <YHTouchableOpacity style={{flex: 1, height: 50,}} text='取消' onPress={this.props.cancelClick}/>
                <YHTouchableOpacity style={{flex: 1, height: 50,}} text='确定' onPress={this.props.confirmClick}/>
            </View>
        );
    }
}

export class NewPersonIconView extends Component {
    constructor() {
        super();
        this.state = {
            icon: RNStorage.zfb_avatarUrl,
        }

    }

    // componentDidMount() {
    //     this.setState({
    //         icon:this.props.icon
    //     })
    // }

    componentDidUpdate(prevProps,prevState){
        if (prevState.icon != this.props.icon) {
            this.setState({
                icon:this.props.icon
            })
        }
    }

    _requestData() {
        getPeople(1, (data) => {
            this.setState({
                icon: data[0].img,
            },()=>{
                this.props.getImage(this.state.icon)
            })
        })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10,}}>
                    <XView onPress={() => {
                        this._requestData();
                    }} style={{alignItems: 'center'}}>
                        <XImage icon={require('../../../../resource/common/auto_get_pic.png')} iconSize={35}/>
                        <XText style={{fontSize: 10, color: Colors.gray_text_color}} text='自动获取'/>
                    </XView>
                    <XImage onPress={this.props.cancelClick} style={{marginLeft: 40, marginRight: 40}}
                            icon={this.state.icon} iconSize={60}/>
                    <XView onPress={() => {
                        SyanImagePicker.showImagePicker({
                            imageCount: 1,
                            isCrop: true,
                            allowPickingOriginalPhoto: false,
                            isCamera: false,
                            enableBase64: true
                        }, (err, selectedPhotos) => {
                            if (err) {
                                // 取消选择
                                return;
                            }
                            // 选择成功，渲染图片
                            // ...
                            this.setState({
                                icon: selectedPhotos[0].base64
                            })
                        })
                    }} style={{alignItems: 'center'}}>
                        <XImage icon={require('../../../../resource/common/manual_get_pic.png')} iconSize={35}/>
                        <XText style={{fontSize: 10, color: Colors.gray_text_color}} text='从相册获取'/>
                    </XView>
                </View>
            </View>
        );
    }
}
export class HeadIconView extends Component {
    constructor() {
        super();
        this.state = {
            icon: require('../../../../resource/common/default_head_icon.png'),
        }

    }

    _requestData() {
        getPeople(1, (data) => {
            this.setState({
                icon: data[0].img,
            },()=>{
                this.props.getImage(this.state.icon)
            })
        })
    }

    render() {
        return (
            <View style={[styles.container,{paddingBottom: 10}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10,}}>
                    <XView onPress={() => {
                        this._requestData();
                    }} style={{alignItems: 'center'}}>
                        <XImage icon={require('../../../../resource/common/auto_get_pic.png')} iconSize={35}/>
                        <XText style={{fontSize: 10, color: Colors.gray_text_color}} text='自动获取'/>
                    </XView>
                    <XImage onPress={this.props.cancelClick} style={{marginLeft: 40, marginRight: 40}}
                            icon={this.state.icon} iconSize={60}/>
                    <XView onPress={() => {
                        SyanImagePicker.showImagePicker({
                            imageCount: 1,
                            isCrop: true,
                            allowPickingOriginalPhoto: false,
                            isCamera: false,
                            enableBase64: true
                        }, (err, selectedPhotos) => {
                            if (err) {
                                // 取消选择
                                return;
                            }
                            // 选择成功，渲染图片
                            // ...
                            this.setState({
                                icon: selectedPhotos[0].base64
                            })
                        })
                    }} style={{alignItems: 'center'}}>
                        <XImage icon={require('../../../../resource/common/manual_get_pic.png')} iconSize={35}/>
                        <XText style={{fontSize: 10, color: Colors.gray_text_color}} text='从相册获取'/>
                    </XView>
                </View>
            </View>
        );
    }
}
export class AddBillView extends Component {
    constructor() {
        super();
        this.state = {
            bill_name: '',
            money: '',
            time: '',
            icon: '',
            select: 1,
            bank_list: [],
            select_bank: {},
            hasAvatar: false,
            hasCheck:false,
            infoText:[],
            hasCategory: false,
            hasComment: false,
            comment:'转账',
            tiXian:false,
            hasName: true,
            categoryName:'',
            selectIndex: 0,
        }
    }
    componentDidMount() {
        this.setState({
            hasAvatar :this.props.hasAvatar,
            hasCheck :this.props.hasCheck,
            infoText :this.props.infoText,
            hasCategory :this.props.hasCategory,
            hasComment :this.props.hasComment,
            tiXian :this.props.tiXian,
            hasName :this.props.hasName,
        })

        this._requestData()
    }

    _requestData() {

        queryAllFromRealm(WXQB_BankTableName).then((data) => {
            if (!isEmpty(data)) {
                this.setState({
                    select_bank: data[0]
                })
            }
            this.setState({
                bank_list: data,
            })
        })
    }

    showPull(side, modal, text, rootTransform) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform}
                              ref={v => this.overlayPullView = v}>
                <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                    <Text style={{color: '#181818', fontSize: 17,}}>选择到账银行卡</Text>
                    <Text style={{color: '#888888', fontSize: 11, marginTop: 5}}>请留意各银行到帐时间</Text>
                    <YHDividingLine isBottom={false} top={77}/>
                    <View style={{marginTop: 25}}>
                        {
                            this.state.bank_list.map((value) => {
                                return (
                                    <YHTouchableOpacity onPress={() => {
                                        this.overlayPullView && this.overlayPullView.close()
                                        this.setState({
                                            select_bank: value
                                        })
                                    }} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}>
                                        <XImage
                                            icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/yh_b_jh.png')}
                                            iconSize={23.5}/>
                                        <View style={{marginLeft: 21, flex: 1}}>
                                            <Text style={{
                                                color: '#181818',
                                                fontSize: 16
                                            }}>{value.bank_name + '(' + value.bank_num + ')'}</Text>
                                            <Text style={{color: '#999999', fontSize: 10, marginTop: 1}}>2小时内到账</Text>
                                        </View>
                                        {this.state.select_bank.id == value.id ? <XImage
                                            icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/radio_s.png')}
                                            iconSize={15}/> : null}

                                        <YHDividingLine left={22}/>
                                    </YHTouchableOpacity>
                                )
                            })
                        }
                        <YHTouchableOpacity onPress={() => {
                            this.overlayPullView && this.overlayPullView.close()
                            navigation.push('AddBankCardScreen', {
                                refreshBankList: () => {
                                    this._requestData();
                                }
                            })
                        }} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}>
                            <View style={{marginLeft: 45, flex: 1}}>
                                <Text style={{color: '#181818', fontSize: 16}}>使用新卡提现</Text>
                            </View>
                            {/*<XImage icon={require('../../../../resource/index/wx/me/pay/wallet/pocketmoney/radio_s.png')} iconSize={15}/>*/}
                            <YHDividingLine left={22}/>
                        </YHTouchableOpacity>
                    </View>

                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.hasAvatar ? <HeadIconView getImage={(icon)=>{
                    this.setState({
                        icon
                    })
                }}/>:null}
                {this.state.hasCheck ? (
                    <View style={{flexDirection:'row',}}>
                        <Checkbox
                            style={{marginRight:10}}
                            title='支出'
                            size='lg'
                            checked={this.state.select == 1}
                            onChange={value => this.setState({select: 1})}
                        />
                        <Checkbox
                            title='收入'
                            size='lg'
                            checked={this.state.select == 2}
                            onChange={value => this.setState({select: 2})}
                        />
                    </View>):null}
                <View style={{ alignItems: 'center', marginTop: 10,}}>
                    {!isEmpty(this.state.infoText)? (<Text>{this.state.hasCheck ? this.state.infoText[this.state.select- 1] :this.state.infoText[0]}</Text>) : null}

                    {this.state.hasComment ? (
                        <Input
                            style={{width: 200, marginTop: 10,}}
                            size='md'
                            value={this.state.comment}
                            placeholder='账单备注'
                            onChangeText={text => this.setState({comment: text})}
                        />
                    ) : null}
                    {this.state.hasName ? (
                        <Input
                            style={{width: 200, marginTop: 10,}}
                            size='md'
                            value={this.state.bill_name}
                            placeholder='账单名称'
                            onChangeText={text => this.setState({bill_name: text})}
                        />
                    ) : null}
                    <Input
                        style={{width: 200, marginTop: 10,}}
                        size='md'
                        value={this.state.money}
                        placeholder='金额'
                        onChangeText={text => this.setState({money: text})}
                    />

                    {this.state.hasCategory ? (
                        <YHTouchableOpacity onPress={()=>{

                            const arr = ['餐饮美食','服饰美容','生活日用','日常缴费','交通出行','通讯物流','休闲娱乐','医疗保健','住房物业','文体教育','投资理财','金融保险','信用借还','公益慈善','经营所得','职业酬劳','奖金红包','转账充值','其他消费']
                            showEasyActionSheet('账单分类',arr,(index)=>{
                                this.setState({
                                    selectIndex: index,
                                    categoryName: arr[index]
                                })
                            },this.state.selectIndex)
                    }}>
                        <Input
                            style={{width: 200, marginTop: 10,}}
                            editable={false}
                            placeholder='账单分类'
                            value={this.state.categoryName}
                        />
                    </YHTouchableOpacity>
                    ) : null}
                    {this.state.tiXian ? (
                        <YHTouchableOpacity onPress={()=>{
                            this.showPull('bottom', false, 'Pull from bottom')
                    }}>
                        <Input
                            style={{width: 200, marginTop: 10,}}
                            editable={false}
                            placeholder='选择银行卡'
                            value={this.state.select_bank.bank_name + ' (' + this.state.select_bank.bank_num + ')'}
                        />
                    </YHTouchableOpacity>
                    ) : null}
                    <YHTouchableOpacity onPress={()=>{
                        const view = showOverlayPull('bottom', false, (<YHDatePicker confirmDate={(value) => {
                            Overlay.hide(view);
                            this.setState({
                                time:dateFormat(value.getTime(),'yyyy-MM-dd hh:mm')
                            })
                        }}/>))
                    }}>
                        <Input
                            style={{width: 200, marginTop: 10,}}
                            editable={false}
                            placeholder='选择时间'
                            value={this.state.time}
                        />
                    </YHTouchableOpacity>

                </View>
                <ConfirmCancelView cancelClick={this.props.cancelClick} confirmClick={()=>{
                    if (isEmpty(this.state.icon) && this.state.hasAvatar) {
                        showToast('请选择头像')
                        return
                    }
                    if (isEmpty(this.state.comment) && this.state.hasComment) {
                        showToast('请输入备注')
                        return
                    }
                    if (isEmpty(this.state.bill_name) && this.state.hasName) {
                        showToast('请输入名称')
                        return
                    }
                    if (isEmpty(this.state.categoryName) && this.state.hasCategory) {
                        showToast('请选择分类')
                        return
                    }
                    if (isEmpty(this.state.select_bank.bank_name) && this.state.tiXian) {
                        showToast('请选择银行')
                        return
                    }

                    if (isEmpty(this.state.time)) {
                        showToast('请选择时间');
                        return
                    }
                    // if (isEmpty(this.state.icon)) {
                    //     showToast('请输入选择头像');
                    //     return
                    // }

                    const obj = {
                        money: this.state.money,//充值金额
                        bank: this.state.bank_name,//银行
                        time: this.state.time,//时间
                        mdesc: this.state.categoryName,//消费类型（支付宝用）
                        plat: '1',//发送平台（1：支付宝2：微信） 默认为支付宝
                        avatar: this.state.icon,//头像
                        nickname: this.state.bill_name,//账单名称（转给的人）
                        is_add: this.state.select == 1 ?'1':'0',//0--增加；1--减少
                    };
                    this.props.confirmClick(obj)
                }}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 60,
    },
});
