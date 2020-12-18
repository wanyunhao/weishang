import React from 'react';

import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import {isEmpty} from '../utils/Utils';
import {Colors, CommonStyles, Const, ImageRes} from '../storage/Const';
import {XImage, XText, XView} from 'react-native-easy-app';

export function QQNavigationBar({onBack, clickRText, clickRImage, clickRImage2, ...props}) {
    let {title, hideBack = false, rightImage,rightImage2, rightText, noLine = false,nav_bg_color,left_img,left_img_size,titleClick} = props;
    let lineStyle = noLine ? {} : CommonStyles.bottomLine;
    return <XView style={{backgroundColor: nav_bg_color != null ? nav_bg_color : '#F4F5FA',}}>
        <XView style={[styles.titleBarParent, lineStyle]}>
            {!isEmpty(title) && <XText style={[styles.titleText,]} onPress={()=> titleClick && titleClick()} numberOfLines={1} text={title}/>}
            {!hideBack && <XImage style={styles.leftImage} icon={left_img || ImageRes.qq_back} iconSize={left_img_size || 16} onPress={() => onBack && onBack()}/>}
            {rightText && <XText style={[styles.rightText]} text={rightText} onPress={() => clickRText && clickRText()}/>}
            {rightImage && <XImage style={{
                right: 0,
                width: 45,
                height: '100%',
                paddingLeft: 8,
                position: 'absolute',
            }} icon={rightImage} iconSize={24} onPress={() => clickRImage && clickRImage()}/>}
            {rightImage2 && <XImage style={{
                right: 45,
                width: 45,
                height: '100%',
                paddingLeft: 8,
                position: 'absolute',
            }} icon={rightImage2} iconSize={24} onPress={() => clickRImage2 && clickRImage2()}/>}
        </XView>

    </XView>;
}

QQNavigationBar.propTypes = {// 标题栏属性
    onBack: PropTypes.func,
    title: PropTypes.string,
    hideBack: PropTypes.bool,
    rightText: PropTypes.string,
    clickRText: PropTypes.func,
};

QQNavigationBar.defaultProps = {onBack: () => navigation.goBack()};// 标题栏属性默认值

const styles = StyleSheet.create({
    titleBarParent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
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

