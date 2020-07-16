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
import {getPeople} from "../../../../../compoments/YHUtils";
import {Input} from "teaset";
import {Button} from "@ant-design/react-native";
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {isEmpty} from "../../../../../common/utils/Utils";
import {showToast} from "../../../../../common/widgets/Loading";
export default class NewPersonView extends Component {
    constructor() {
        super();
        this.state = {
            icon: '',
            name: ''
        }

    }
    componentDidMount() {
        this._requestData();
    }

    _requestData() {
        getPeople(1,(data)=>{
            console.log(data)
            this.setState({
                icon: data[0].img,
                name: data[0].name
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,}}>
                    <XView onPress={()=>{
                        this._requestData();
                    }} style={{alignItems:'center'}}>
                        <XImage icon={require('../../../../resource/images/avatar.png')} iconSize={35}/>
                        <XText style={{fontSize:10,color:Colors.gray_text_color}} text='自动获取'/>
                    </XView>
                    <XImage onPress={this.props.cancelClick} style={{marginLeft:40,marginRight:40}} icon={this.state.icon} iconSize={60}/>
                    <XView onPress={()=>{
                        SyanImagePicker.showImagePicker({imageCount:1,isCrop:true,allowPickingOriginalPhoto:false,isCamera:false,enableBase64:true}, (err, selectedPhotos) => {
                            console.log(selectedPhotos);
                            if (err) {
                                // 取消选择
                                return;
                            }
                            // 选择成功，渲染图片
                            // ...
                            this.setState({
                                icon:selectedPhotos[0].base64
                            })
                        })
                    }} style={{alignItems:'center'}}>
                        <XImage icon={require('../../../../resource/images/avatar.png')} iconSize={35}/>
                        <XText style={{fontSize:10,color:Colors.gray_text_color}} text='从相册获取'/>
                    </XView>
                </View>

                <Input
                    style={{width: 200,marginTop:10,}}
                    size='md'
                    value={this.state.name}
                    placeholder='请输入昵称'
                    onChangeText={text => this.setState({name: text})}
                />
                <View style={{flexDirection:'row',position:'absolute',bottom:0}}>
                    <YHTouchableOpacity style={{flex: 1,height:50,}} text='取消' onPress={this.props.cancelClick}/>
                    <YHTouchableOpacity style={{flex: 1,height:50,}} text='确定' onPress={()=>{
                        if (isEmpty(this.state.name)) {
                            showToast('请输入昵称');
                            return
                        }
                        if (isEmpty(this.state.icon)) {
                            showToast('请输入选择头像');
                            return
                        }

                        this.props.confirmClick({name:this.state.name,icon:this.state.icon})
                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        paddingBottom:60,
    },
});
