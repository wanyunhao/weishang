import React, {Component} from "react";

import {Image, StyleSheet, Text, View,findNodeHandle,
    UIManager} from "react-native";
import {Colors, Const} from "../../../../common/storage/Const";
import {XFlatList, XImage, XText} from "react-native-easy-app";
import {RNStorage} from "../../../../common/storage/AppStorage";
import {
    clearRowFromRealm,
    PYQListPicTableName,
    PYQListTableName,
    PYQListTalkTableName,
    queryAllFromRealm,
    queryFilterFromRealm
} from "../../../../common/utils/RealmUtil";
import {isEmpty} from "../../../../common/utils/Utils";
import YHTouchableOpacity from "../../../../compoments/YHTouchableOpacity";
import TalkBottomBarView from "./view/TalkBottomBarView";
import {ActionPopover, Button, Label, Popover} from "teaset";
import TouchableOpacity from "teaset/components/ListRow/TouchableOpacity";
import BaseVC from "../../zfb/Common/BaseVC";

export default class PYQListScreen extends BaseVC {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            pyq_id: null,
            father_name: null,
            user_name: RNStorage.user_name,
            avatar: RNStorage.avatarUrl,
            showBottom: false,
        };
        this.opreation_talk_id = null;
        this.pyq_id = null;
        this.moreRefArr = {};
        this.talkRefArr = {};
    }

    componentDidMount() {
        this._requestData();
        this._setBarStyle(1);
        this._setPlaceViewBackgroundColor('transparent')
        this._setTopSafeView(true);
    }

    _requestData() {
        queryAllFromRealm(PYQListTableName)
            .then((data)=>{
                let dataArray = [];
                for (const dataKey in data) {
                    let model = data[dataKey];
                    model.imgs = [];
                    model.talks = [];
                    queryFilterFromRealm(PYQListPicTableName,'pyq_id=' + model.id).then((data1)=>{
                        model.imgs = data1 || [];

                        queryFilterFromRealm(PYQListTalkTableName,'pyq_id=' + model.id).then((data2)=>{
                            model.talks = data2 || [];
                            dataArray.push(model);
                            this.setState({
                                data:dataArray
                            })
                        })

                    })


                }
            })
    }

    _addSubView() {
        return (
            <View style={styles.container}>

                <XFlatList
                    data={this.state.data}
                    ListHeaderComponent={() => {
                        return this._renderHeader();
                    }}
                    renderItem={({item, index}) => {
                        return this._renderCell(item,index);
                    }}
                />
                <View style={{top:INSETS.top + 14,width:Const.screenWidth,position:'absolute',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16,}}>
                    <XImage style={{width:9,height:16}} icon={require('../../../resource/index/wx/fx/back_white.png')} onPress={()=>{
                        navigation.goBack();
                    }}/>
                    <XImage style={{width:18.7,height:14.85}} icon={require('../../../resource/index/wx/fx/pyq_pz.png')} onPress={()=>{
                        navigation.push('PYQSendScreen');
                    }}/>
                </View>
                {this.state.showBottom ? (<TalkBottomBarView bottom={0} talk_info={{avatar:this.state.avatar,father_name:this.state.father_name,user_name:this.state.user_name}} changeAvatar={()=>{
                    navigation.push('ContactScreen',{fromChoose:true,chooseItem:(item)=>{
                            this.setState({
                                avatar:item.icon,
                                user_name:item.title,
                            })
                        }})
                }} c_id={this.state.pyq_id} refrshChat={()=>{
                    this.setState({
                        pyq_id: null,
                        father_name: null,
                        user_name: RNStorage.user_name,
                        avatar: RNStorage.avatarUrl,
                        showBottom:false,
                    })
                    this._requestData();
                }}/>): null}
            </View>
        );
    }

    _renderHeader() {
        return (
            <View style={{alignItems: 'flex-end',backgroundColor: Colors.white}}>
                <Image style={{width:Const.screenWidth,height:313}} source={require('../../../resource/index/wx/fx/pyq_bg.png')}/>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:15,marginTop:-45}}>
                    <Text style={{fontSize:13,color:Colors.white,marginRight:11}}>
                        {RNStorage.user_id}
                    </Text>
                    <XImage style={{borderRadius:5}} icon={RNStorage.avatarUrl} iconSize={60}/>
                </View>
            </View>
        )
    }

    show(view) {
        view.measure((x, y, width, height, pageX, pageY) => {
            let items = [
                {title: '删除', onPress: () => {
                    clearRowFromRealm(this.opreation_talk_id,PYQListTalkTableName).then((res)=>{
                        this._requestData();
                    })
                }},
            ];
            ActionPopover.show({x: pageX, y: pageY, width, height}, items);
        });
    }
    showTalk(view,id) {
        view.measure((x, y, width, height, pageX, pageY) => {
            let items = [
                {title: '点赞', onPress: () => {

                }},
                {title: '评论', onPress: () => {
                        this.setState({
                            pyq_id:id,
                            showBottom:true,
                        })
                }},
            ];
            ActionPopover.show({x: pageX - 50, y: pageY, width, height}, items);
        });
    }
    _renderCell(item,index) {
        let imgs = [1,2,3,4,5,6,7];
        let xihuans = [1,2,3,4,5,6,7,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6];
        const imgWidth = (Const.screenWidth - 65 - 6) /3 -1;

        let btnRefs = [];
        return (
            <View style={{flexDirection:'row',padding:10,backgroundColor: Colors.white}}>
                <XImage icon={item.avatar} iconSize={38}/>
                <View style={{marginLeft:7, width:Const.screenWidth - 65}}>
                    <Text style={{color:'#5A6090',fontWeight:'bold',fontSize:16}}>{item.user_name}</Text>
                    <Text style={{color:'#333333',fontSize:16,marginTop:1}}>{item.text}</Text>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', marginTop:8}}>
                        {item.imgs.map((value)=>{
                            return (
                                <XImage resizeMode='stretch' style={{marginRight:2,marginTop:2}} icon={value.pic} iconSize={imgWidth}/>
                            )
                        })}
                    </View>
                    {isEmpty(item.location)? null : (
                        <Text style={{fontSize:12,color:'#7C7C7C',marginTop:10,}}>{item.location}</Text>
                    )}
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:15,}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'#7C7C7C',fontSize:11}}>{item.time}</Text>
                            {RNStorage.user_name == item.user_name ? <XText style={{color:'#5A6090',fontSize:11}} text='删除' onPress={()=>{

                            }}/>: null}
                        </View>
                        <TouchableOpacity ref={ref=>{
                            if (ref != null) {
                                this.moreRefArr[index] = ref;
                            }
                        }} onPress={()=>{
                            this.showTalk(this.moreRefArr[index],item.id);
                        }}>
                            <XImage style={{width:29.92,height:18.78}} icon={require('../../../resource/index/wx/fx/pyqbg.png')}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{backgroundColor: '#F7F7F7',paddingHorizontal:7,paddingVertical:12,marginTop:8, }}>
                        {/*点赞*/}
                        <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                            <XImage style={{width:11.3,height:10.66,marginTop:4,marginRight:2}} icon={require('../../../resource/index/wx/fx/pyq_yz.png')}/>
                            {xihuans.map((value)=>{
                                return (
                                    <Text style={{color:'#5C6A8D',fontSize:14}}>{value+ ','}</Text>
                                )
                            })}
                        </View>
                        {/*评论*/}
                        <YHTouchableOpacity  style={{marginTop:10,}}>
                            {
                                item.talks.map((value,index)=>{
                                return (
                                    <TouchableOpacity ref={ref=>{
                                        btnRefs.push(ref);
                                    }} activeOpacity={0.5} onLongPress={()=>{
                                        this.opreation_talk_id = value.id;
                                        this.show(btnRefs[index]);
                                    }} onPress={()=>{
                                        this.setState({
                                            pyq_id:item.id,
                                            father_name: value.user_name,
                                            showBottom:true,
                                        })
                                    }}>
                                        {isEmpty(value.father_name)? (
                                            <Text style={{color:'#181818',fontSize:14,lineHeight:20,}}><Text style={{color:'#5C6A8D',fontSize:14}}>{value.user_name + ': '}</Text>{value.text}</Text>

                                        ): (
                                            <Text style={{color:'#181818',fontSize:14,lineHeight:20,}}>
                                                <Text style={{color:'#5C6A8D',fontSize:14}}>{value.user_name}</Text>
                                                <Text>回复</Text>
                                                <Text style={{color:'#5C6A8D',fontSize:14}}>{value.father_name + ': '}</Text>
                                                <Text>{value.text}</Text>
                                            </Text>
                                        )}

                                    </TouchableOpacity>

                                )

                            })}

                        </YHTouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});
