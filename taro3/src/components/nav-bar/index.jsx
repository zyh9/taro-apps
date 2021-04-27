import { Component } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Image,
  Text,
  Swiper,
  SwiperItem,
  Input,
  Button,
  Textarea,
  Picker,
  ScrollView,
  WebView
} from "@tarojs/components";
import classNames from "classnames";
import "./index.scss";
import { Back_black, Back_white } from "./icon/index";
import { throttle } from "@/utils/descriptor";

// https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window
const { version, platform } = Taro.getSystemInfoSync();
// console.log(Taro.getSystemInfoSync())

class Index extends Component {
  // https://zh-hans.reactjs.org/docs/react-component.html#constructor
  constructor(props) {
    super(props);
    this.state = {
      statusbarh: 20, // 状态栏
      goBackImage: this.props.colorTheme === "black" ? Back_black : Back_white, // 返回按钮
      isIOS: true // 是否是iOS
    };
  }

  static defaultProps = {
    background: "transparent", // 导航栏背景
    fixedtop: true, // 是否固定在顶部
    toBack: true, // 是否自动返回上一页
    showBack: false, // 是否显示返回按钮
    title: "", // 导航栏标题
    protectInaver: true, // 是否保留nav占位
    protectCapsule: true, // 右侧胶囊按钮占位
    colorTheme: "black", // 主题色  white/black
    opacity: 1, // 透明度
    blockBar: false, // 是否只显示状态栏
    onQueryedDom: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  // onLoad
  componentWillMount() {
    let res = Taro.getSystemInfoSync();
    let system = res.system.toLowerCase();
    let isIOS = system.indexOf("ios") >= 0;
    this.setState({
      statusbarh: res.statusBarHeight,
      isIOS
    });
  }

  // onReady
  componentDidMount() {
    this.handleBarHeight();
  }

  //查询nav-bar高度
  async handleBarHeight() {
    let res = await this.$taroUtil.delayQuerySelector({
      selectorStr: ".app-inaver",
      delayTime: 20
    });
    this.props.onQueryedDom(res[0]);
  }

  // onShow
  componentDidShow() {}

  // onHide
  componentDidHide() {}

  // onUnload
  componentWillUnmount() {}

  @throttle(1000)
  handleGotop() {
    // 回到顶部
    Taro.pageScrollTo({
      scrollTop: 0
    });
  }

  handleBack(e) {
    //阻止冒泡
    e.stopPropagation();
    if (this.props.toBack) {
      // TODO 自定义切换
      if (typeof this.props.onInterceptBack === "function") {
        this.props.onInterceptBack();
        return;
      }
      // 正常返回
      let getCurrentPages = Taro.getCurrentPages();
      if (getCurrentPages.length > 1) {
        Taro.navigateBack({
          delta: 1
        });
      } else {
        Taro.switchTab({
          url: "/pages/index/index"
        });
        console.log("请检查页面层级~");
      }
    } else {
      // 返回拦截
      if (typeof this.props.onGoBack === "function") {
        this.props.onGoBack();
      }
    }
  }

  render() {
    let {
      background,
      opacity,
      fixedtop,
      showBack,
      colorTheme,
      title,
      protectCapsule,
      protectInaver,
      blockBar,
      children
    } = this.props;
    let { goBackImage, isIOS, statusbarh } = this.state;
    // TODO 不同平台高度适配
    let device = {
      devtools: 42,
      ios: 44,
      android: 48
    };
    // console.log(device[platform]);
    const appInaverStyle = {
      backgroundColor: background,
      height: `${statusbarh + device[platform]}PX`,
      paddingTop: `${statusbarh}PX`,
      opacity: String(opacity)
    };
    const classObject = {
      "ios-center": isIOS,
      "android-center": !isIOS,
      "no-ios-back": isIOS && !showBack,
      "no-android-back": !isIOS && !showBack
    };
    const lineHeightStyle = {
      height: `${device[platform]}PX`,
      lineHeight: `${device[platform]}PX`
    };
    const backStyle = {
      width: `${device[platform]}PX`,
      ...lineHeightStyle
    };
    const rootClass = classNames(
      "app-inaver",
      {
        inaverfixed: fixedtop,
        pointerevents: opacity
      },
      this.props.className
    );
    return version > "7.0.0" ? (
      <View>
        {blockBar ? (
          <View
            className="app-inaver"
            style={{ ...appInaverStyle, height: `${statusbarh}PX` }}
          ></View>
        ) : (
          <View
            onClick={this.handleGotop.bind(this)}
            style={appInaverStyle}
            className={rootClass}
          >
            <View
              className={classNames("left", { "left-zero": !showBack })}
              style={backStyle}
              onClick={this.handleBack.bind(this)}
            >
              {showBack && (
                <Image
                  className="image"
                  mode="widthFix"
                  src={goBackImage}
                ></Image>
              )}
            </View>
            {title ? (
              <View
                style={`color:${colorTheme}`}
                className={classNames("title-center", classObject)}
              >
                {title}
              </View>
            ) : (
              <View className="center" style={lineHeightStyle}>
                {children}
              </View>
            )}
            {protectCapsule && <View className="right"></View>}
          </View>
        )}
        {!blockBar && protectInaver && fixedtop && (
          <View
            style={{ height: `${statusbarh + device[platform]}PX` }}
            className="protect-inaver"
          ></View>
        )}
      </View>
    ) : null;
  }
}

export default Index;
