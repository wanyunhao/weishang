import React, {PureComponent} from 'react'
import {
    Animated,
    Dimensions,
    Image,
    View,
    Text,
    PanResponder,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import FloatPanelController from "react-native-debug-tool/lib/views/FloatPanelController";
import {showToast} from "./Loading";

// import SubViewLogHttp from './SubViewLogHttp'
// import SubViewDeviceInfo from './SubViewDeviceInfo'
// import SubViewLogWebView from './SubViewLogWebView'
// import SubViewServerUrl from './SubViewServerUrl'
// import {DebugColors, DebugImgs} from '../utils/DebugConst'
// import {DebugItem, Line} from "../utils/DebugWidgets";
// import {isEmpty, selfOr, showMsg} from '../utils/DebugUtils'
// import DebugManager from '../DebugManager'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const IconRadius = 200;//浮点直径
const RightPadding = screenWidth - IconRadius - 10;
const topMargin = screenHeight * 0.6;//浮点初始位置距顶部高度
const DebugColors = {
    black: '#000000',
    white: '#FFFFFF',
    page_bg: '#F5F5F5', //默认页面背景色
    yellow: '#E18605',  //按钮等颜色
    blue: '#007AFF',  //按钮等颜色
    red: '#FF1D1D',
    text: '#000000',    //默认字体颜色
    text_light: '#15161B',
    text_lighter: '#545454',
    text_hint: '#C8C8C8',
    text_gray: '#86878A',
    line: '#DEDEDF',//分割线色值
    disable: '#F4F4F5',//按钮不可用
    transparent: 'transparent',
    orange: '#FAB945'
};
export default class YHShuiYin extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            currentUrl: '',
            contentView: null,
            isOpen: false,
            toFloat: true,
            animating: false,
            animateValue: new Animated.Value(0),
            translateValue: new Animated.ValueXY({x: RightPadding, y: topMargin}),
            dataChangedCount: 0
        };
        this.lastValueY = topMargin;
        this.lastValueX = RightPadding;
        this.listenerValue = {x: RightPadding, y: topMargin};
        this.pageTransformAnim = new Animated.Value(screenWidth / 2)//页面切换动画
    }

    render() {
        let {translateValue, animateValue, contentView, title, currentUrl} = this.state;
        let animalStyle = {
            width: animateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [IconRadius, screenWidth],
            }),
            height: animateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [IconRadius, screenHeight],
            }),
            borderRadius: animateValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [IconRadius * 0.5, 20, 0],
            }),
        };
        let transformStyle = {transform: translateValue.getTranslateTransform()};
        return <Animated.View style={[{zIndex: 0, overflow: 'hidden', position: 'absolute'}, animalStyle, transformStyle]}>
            {this.renderFloatBtn()}
        </Animated.View>
    }



    renderFloatBtn() {
        let {isOpen, toFloat, animating} = this.state;
        if (!isOpen && toFloat && !animating) {
            return <View{...this.gestureResponder.panHandlers} style={styles.floatBtn}>
                <Image resizeMode='contain' source={require('../../classes/resource/index/chat/send/shuiyintu.png')} style={{width: IconRadius , height: IconRadius}}/>
            </View>
        }
        return null
    }



    componentWillMount() {
        this.state.translateValue.addListener(
            value => (this.listenerValue = value),
        );
        this.gestureResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: this.onFloatInit,
            onPanResponderMove: this.onFloatMove,
            onPanResponderRelease: this.onFloatRelease,
            onPanResponderTerminate: this.onFloatRelease,
        });
    }

    pageTransform = (isOpen) => {//页面切换动画
        this.setState({animating: true});

        Animated.parallel([
            Animated.timing(this.state.animateValue, {
                toValue: isOpen ? 1 : 0,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(this.state.translateValue.y, {
                toValue: isOpen ? 0 : this.lastValueY,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(this.state.translateValue.x, {
                toValue: isOpen ? 0 : this.lastValueX,
                duration: 500,
                useNativeDriver: false
            }),
        ]).start(() => {
            this.setState({isOpen: isOpen, animating: false})
        })
    };

    open = () => {//打开页面
        showToast('123333')
    };
    onFloatInit = (event, gestureState) => {
        this.time = Date.parse(new Date());
        this.state.translateValue.setOffset(this.listenerValue);
        this.state.translateValue.setValue({x: 0, y: 0})
    };

    onFloatMove = (evt, gestureState) => {//浮点
        Animated.event([null, {dx: this.state.translateValue.x, dy: this.state.translateValue.y}])(evt, gestureState);
        const {dx, dy} = gestureState
    };

    onFloatRelease = (evt, gestureState) => {
        let {translateValue} = this.state;
        translateValue.flattenOffset();
        const y = translateValue.y.__getValue();
        if (y < 10 || y > screenHeight - IconRadius - 10) {//处理浮点Y轴
            Animated.spring(translateValue.y, {
                toValue: y < 10 ? 10 : screenHeight - IconRadius - 10,
                duration: 200,
                useNativeDriver: false
            }).start()
        }
        Animated.spring(translateValue.x, {//处理浮点X轴
            toValue: gestureState.moveX > screenWidth * 0.5 ? RightPadding : 10,
            duration: 200,
            useNativeDriver: false
        }).start();

        // 记录最后一次位移值
        this.lastValueX = translateValue.x.__getValue();
        this.lastValueY = translateValue.y.__getValue();

        this.releaseTime = Date.parse(new Date());
        // single tap
        if (this.releaseTime - this.time < 50 &&
            Math.abs(gestureState.dx) < 10 &&
            Math.abs(gestureState.dy) < 10) {//点击打开页面
            !this.state.isOpen && this.open()
        }
    };

    static showFloat(RootSiblings) { // type of  RootSiblings (3.x)
        if (this.sibling) {
            this.sibling.update(<YHShuiYin/>)
        } else {
            this.sibling = new RootSiblings(<YHShuiYin />);
        }
    }
};

const styles = StyleSheet.create({
    floatBtn: {
        left: 0,
        top: 0,
        height: IconRadius/2,
        width: IconRadius,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: DebugColors.text,
        textAlign: 'center',
        paddingVertical: 15,
        backgroundColor: DebugColors.white,
    },
    rightText: {
        right: 0,
        padding: 10,
        fontSize: 13,
        color: DebugColors.text,
        position: 'absolute',

    },
    backBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    exitBtn: {
        padding: 10,
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        margin: 10,
        textAlign: 'center',
        color: DebugColors.text_light,
        borderColor: DebugColors.line,
        backgroundColor: DebugColors.page_bg,
    },
    title: {
        fontSize: 14,
        marginTop: 1,
        color: DebugColors.text_light,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: DebugColors.disable,
    },
    borderStyle: {
        borderWidth: 0.5,
        borderRadius: 2,
        marginVertical: 3,
        marginHorizontal: 10,
        borderColor: DebugColors.line
    }
});
