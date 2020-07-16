import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import YHTouchableOpacity from "../../../../../compoments/YHTouchableOpacity";
import {XImage} from "react-native-easy-app";
import {Colors, Const} from "../../../../../common/storage/Const";
import TouchableOpacity from "teaset/components/ListRow/TouchableOpacity";
import {showOperationItems} from "../../../../../compoments/YHUtils";

export default class ChatPicCell extends Component {
    render() {
        const data = this.props.data;
        let isSelf = this.props.isSelf;
        let width = data.width;
        let height = data.height;
        if(width > 140 || height > 140) {
            if (width > height) {
                let rate = width / 140;
                width = 140;
                height = height / rate;
            } else {
                let rate = height / 140;
                height = 140;
                width = width / rate;
            }
        }
        return (
            <TouchableOpacity style={styles.container} ref={ref => {
                this.ref = ref;
            }} onLongPress={this.props.drag != null ? this.props.drag : () => {
                let items = [
                    {
                        title: '删除', onPress: () => {

                        }
                    },
                    {
                        title: '切换角色', onPress: () => {

                        }
                    },
                    {
                        title: '排序', onPress: () => {
                            this.props.orderClick();
                        }
                    },
                ];
                showOperationItems(this.ref, items)
            }}>
                <View style={{flexDirection: 'row', paddingTop: 11, paddingHorizontal: 11, alignItems:'center'}}>
                    {isSelf? null:(<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={{uri:data.userinfo.avatar}} iconSize={38}
                                           onPress={() => {
                                           }}/>)}
                            <View style={{flexDirection:'row',marginLeft:5,flex: 1,marginRight:5,justifyContent:isSelf ? 'flex-end': 'flex-start' }}>
                                <XImage resizeMode='stretch' icon={data.pic} style={{maxWidth:140,maxHeight:140,width:width,height:height}}/>
                            </View>

                    {isSelf ? (<XImage style={{borderRadius: 5,alignSelf:'flex-start'}} icon={{uri:data.userinfo.avatar}} iconSize={38}
                                       onPress={() => {
                                       }}/>): null}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.page_bg
    },
});
