import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames'
import './index.less'
import {
    Back_black,
    Back_white,
} from './icon/index'

// https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window
const { version } = Taro.getSystemInfoSync();
// console.log(version)

class Index extends Component {
    constructor(props) {
        super(props)
        this.setState({
            goBackImage: this.props.colorTheme === 'black' ? Back_black : Back_white
        })
    }
    static defaultProps = {
        background: '#fff', //导航栏背景
        fixedtop: true, // 是否固定在顶部
        toBack: true, // 是否自动返回上一页
        showBack: true, // 是否显示返回按钮
        title: '',//导航栏标题
        protectInaver: true,//是否保留nav占位
        protectCapsule: true,//右侧胶囊按钮占位
        colorTheme: 'black',//主题色
        opacity: 1,//透明度
        blockBar: false,//是否只显示状态栏
    }
    state = {
        statusbarh: 20,//状态栏
        goBackImage: Back_black,//返回按钮
        isIOS: true,//是否是iOS
    }
    // onLoad
    componentWillMount() {
        Taro.getSystemInfo({
            success: res => {
                let system = res.system.toLowerCase();
                let isIOS = system.indexOf('ios') >= 0;
                this.setState({
                    statusbarh: res.statusBarHeight,
                    isIOS
                })
            }
        })
    }
    // onReady
    componentDidMount() { }
    // onShow
    componentDidShow() { }
    // onHide
    componentDidHide() { }
    // onUnload
    componentWillUnmount() { }
    handlegotop = _ => {//回到顶部
        Taro.pageScrollTo({
            scrollTop: 0
        })
    }
    handlegoback() {
        if (this.props.toBack) {//正常返回
            Taro.navigateBack({
                delta: 1
            })
        } else {//返回拦截
            this.props.onGoBackClick()
        }
    }
    render() {
        let { background, opacity, fixedtop, showBack, colorTheme, title, protectCapsule, protectInaver, blockBar } = this.props,
            { goBackImage, isIOS, statusbarh } = this.state;
        const appInaverStyle = {
            backgroundColor: background,
            height: (statusbarh + 50) + 'PX',
            paddingTop: statusbarh + 'PX',
            opacity: opacity
        }
        return (
            version > '7.0.0' ? <View>
                {blockBar ? <View style='height: {{statusbarh}}px'></View> : <View onlongpress={this.handlegotop} style={appInaverStyle} className={classNames('app-inaver', { 'inaverfixed': fixedtop })}>
                    <View className='left' onClick={this.handlegoback.bind(this)}>
                        {showBack && <Image class='image' mode='widthFix' src={goBackImage}></Image>}
                    </View>
                    <View style={`color:${colorTheme}`} className={classNames('center', { 'ioscenter': isIOS, 'andcenter': !isIOS && !showBack })}>{title}</View >
                    {protectCapsule && <View className='right'></View>}
                </View >}
                {(protectInaver && fixedtop) && <View style='height: {{statusbarh+50}}px' class='protect-inaver'></View>}
            </View > : null
        )
    }
}

export default Index