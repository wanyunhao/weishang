import React, {Component} from "react";

import {StyleSheet, Text, TextInput, View} from "react-native";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors, Const} from "../../../../common/storage/Const";
import {XImage} from "react-native-easy-app";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";

export default class PYQSendScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            city: null,
            didian: null,
            userinfo: {},
            pics:[require('../../../resource/index/wx/fx/fb_add.png')]
        };
        this.imgWidth = (Const.screenWidth - 38) / 4 -1;
    }


    render() {
        return (
            <View style={styles.container}>
                <WXNavigationBar noLine nav_bg_color={Colors.white} rightText='完成' clickRText={()=>{

                }}/>
                <View style={{paddingHorizontal:15,marginTop:20}}>
                    <TextInput style={{fontSize:16,color:'#7E7E7E',maxHeight:100,}} placeholder='这一刻的想法…' multiline={true}/>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', marginTop:8,maxHeight: (this.imgWidth * 3) + 4}}>
                        {
                            this.state.pics.map((value,index)=>{
                            return (
                                <XImage resizeMode='stretch' style={{marginRight:2,marginTop:2}} iconSize={this.imgWidth} icon={value} onPress={()=>{
                                    if (index == this.state.pics.length - 1) {
                                        // SyanImagePicker.showImagePicker({imageCount:9,enableBase64:true}, (err, selectedPhotos) => {
                                        //     if (err) {
                                        //         // 取消选择
                                        //         return;
                                        //     }
                                        //     // 选择成功，渲染图片
                                        //     // ...
                                        // })
                                        // const options = {
                                        //     title: '选择照片',
                                        //     storageOptions: {
                                        //         skipBackup: true,
                                        //         path: 'images',
                                        //     },
                                        //     takePhotoButtonTitle:'拍照',
                                        //     chooseFromLibraryButtonTitle:'图库',
                                        //     multiple: true
                                        // };
                                        // ImagePicker.showImagePicker(options, (response) => {
                                        //     if (response.didCancel) {
                                        //         console.log('User cancelled image picker');
                                        //     } else if (response.error) {
                                        //         console.log('ImagePicker Error: ', response.error);
                                        //     } else if (response.customButton) {
                                        //         console.log('User tapped custom button: ', response.customButton);
                                        //     } else {
                                        //         var imgArr = deepClone(this.state.pics);
                                        //         imgArr.unshift('data:image/jpeg;base64,' + response.data);
                                        //         this.setState({
                                        //             pics: imgArr,
                                        //         });
                                        //     }
                                        // });
                                    }

                                }}/>
                            )
                        })}
                    </View>
                    <YHTouchableOpacity style={{flexDirection:'row',alignItems:'center',height:50,justifyContent:'space-between'}} onPress={()=>{
                        navigation.push('ChooseLocationScreen',{city:this.state.city,didian:this.state.didian,getLocation:(city,detail)=>{
                            this.setState({
                                city,
                                didian:detail
                            })
                            }});
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage style={{width:14.11,height:16.53,marginRight:8}} icon={require('../../../resource/index/wx/fx/fb_icon_adress.png')}/>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>所在位置</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>{(this.state.city || '') + (this.state.didian || '')}</Text>
                            <XImage style={{marginLeft:10}} icon={require('../../../resource/common/right.png')} iconSize={17}/>
                        </View>
                    </YHTouchableOpacity>
                    <YHTouchableOpacity style={{flexDirection:'row',alignItems:'center',height:50,justifyContent:'space-between'}} onPress={()=>{
                        navigation.push('ContactScreen',{fromChoose:true,chooseItem:(item)=>{
                            this.setState({
                                userinfo:item,
                            })
                        }})
                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage style={{marginRight:8}} icon={require('../../../resource/index/wx/fx/fb_icon_fbz.png')} iconSize={17.5}/>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>发布者</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>{this.state.userinfo.title}</Text>
                            <XImage style={{marginLeft:10}} icon={require('../../../resource/common/right.png')} iconSize={17}/>
                        </View>
                    </YHTouchableOpacity>
                    <YHTouchableOpacity ref='apButton' style={{flexDirection:'row',alignItems:'center',height:50,justifyContent:'space-between'}} onPress={()=>{

                    }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <XImage style={{marginRight:8}} icon={require('../../../resource/index/wx/fx/fb_icon_time.png')} iconSize={17.5}/>
                            <Text style={{fontSize:16,color:'#1D1D1D'}}>发布时间</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>

                            {/*<Label size='xl' text='Hello world!' />*/}
                            <XImage style={{marginLeft:10}} icon={require('../../../resource/common/right.png')} iconSize={17}/>
                        </View>
                    </YHTouchableOpacity>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});
