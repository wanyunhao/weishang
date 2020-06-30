import React, {Component} from "react";

import {Text, StyleSheet, View,ScrollView,Image} from "react-native";
import {WXNavigationBar} from "../../../../common/widgets/WXNavigation";
import {Colors, Const} from "../../../../common/storage/Const";
import {XFlatList, XImage, XText} from "react-native-easy-app";
import {RNStorage} from "../../../../common/storage/AppStorage";
import MsgListCell from "../chat/views/MsgListCell";
import {PYQListTableName, queryAllFromRealm} from "../../../../common/utils/RealmUtil";

export default class PYQListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount() {
        queryAllFromRealm(PYQListTableName)
            .then((data)=>{
                console.log(data);
                this.setState({
                    data,
                })
            })
    }

    render() {
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
                    <XImage style={{borderRadius:5}} icon={require('../../../resource/images/avatar.png')} iconSize={60}/>
                </View>
            </View>
        )
    }
    _renderCell(item,index) {
        let imgs = [1,2,3,4,5,6,7];
        let xihuans = [1,2,3,4,5,6,7,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6];
        const imgWidth = (Const.screenWidth - 65 - 6) /3 -1;
        return (
            <View style={{flexDirection:'row',padding:10,backgroundColor: Colors.white}}>
                <XImage icon={item.avatar} iconSize={38}/>
                <View style={{marginLeft:7, width:Const.screenWidth - 65}}>
                    <Text style={{color:'#5A6090',fontWeight:'bold',fontSize:16}}>{item.user_name}</Text>
                    <Text style={{color:'#333333',fontSize:16,marginTop:1}}>{item.text}</Text>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', marginTop:8}}>
                        {imgs.map((value)=>{
                            return (
                                <View style={{width:imgWidth,height:imgWidth,backgroundColor: 'blue',marginRight:2,marginTop:2}}/>
                            )
                        })}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:15,}}>
                        <Text style={{color:'#7C7C7C',fontSize:11}}>{item.time}</Text>
                        <XImage style={{width:29.92,height:18.78}} icon={require('../../../resource/index/wx/fx/pyqbg.png')}/>
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
                        <View style={{flexDirection:'row',marginTop:10,}}>
                            <Text style={{color:'#181818',fontSize:14,lineHeight:20,}}><Text style={{color:'#5C6A8D',fontSize:14}}>愿你安好:</Text>提问题的，回答问题的情商的，回答问题的情商都高</Text>
                            {/*<XText style={{color:'#5C6A8D',fontSize:14}} text='愿你安好:'/>*/}
                            {/*<XText style={{color:'#181818',fontSize:14}} text='提问题的，回答问题的情商的，回答问题的情商都高，的，回答问题的情商都高，的，回答问题的情商都高，都高，好样的:'/>*/}

                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg,
    },
});
