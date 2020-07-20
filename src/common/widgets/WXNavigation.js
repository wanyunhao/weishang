import React from 'react';

import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import {isEmpty} from '../utils/Utils';
import {Colors, CommonStyles, Const, ImageRes} from '../storage/Const';
import {XImage, XText, XView} from 'react-native-easy-app';

export function WXNavigationBar({onBack, clickRText, clickRImage, ...props}) {
    let {title, hideBack = false, rightImage, rightText, noLine = false,nav_bg_color,left_img,left_img_size,titleClick} = props;
    let lineStyle = noLine ? {} : CommonStyles.bottomLine;
    return <XView style={{backgroundColor: nav_bg_color != null ? nav_bg_color : '#EDEDED',}}>
        <XView style={[styles.titleBarParent, lineStyle,{backgroundColor: nav_bg_color != null ? nav_bg_color : '#EDEDED'}]}>
            {!isEmpty(title) && <XText style={[styles.titleText,{marginLeft:hideBack ? 13 : 36}]} onPress={()=> titleClick && titleClick()} numberOfLines={1} text={title}/>}
            {!hideBack && <XImage style={styles.leftImage} icon={left_img || ImageRes.wx_back} iconSize={left_img_size || 16} onPress={() => onBack && onBack()}/>}
            {rightText && <XText style={[styles.rightText]} text={rightText} onPress={() => clickRText && clickRText()}/>}
            {rightImage && <XImage style={styles.rightImage} icon={rightImage} iconSize={15} onPress={() => clickRImage && clickRImage()}/>}
        </XView>
    </XView>;
}

WXNavigationBar.propTypes = {// 标题栏属性
    onBack: PropTypes.func,
    title: PropTypes.string,
    hideBack: PropTypes.bool,
    rightText: PropTypes.string,
    clickRText: PropTypes.func,
};

WXNavigationBar.defaultProps = {onBack: () => navigation.goBack()};// 标题栏属性默认值

const styles = StyleSheet.create({
    titleBarParent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,

    },
    leftImage: {
        left: 0,
        width: 45,
        height: '100%',
        paddingLeft: 5,
        position: 'absolute',
    },
    rightImage: {
        right: 0,
        width: 45,
        height: '100%',
        paddingLeft: 8,
        position: 'absolute',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.text,
    },
    rightText: {
        right: 0,
        padding: 10,
        marginRight:10,
        fontSize: 14,
        color: '#181818',
        position: 'absolute',
    },
});

