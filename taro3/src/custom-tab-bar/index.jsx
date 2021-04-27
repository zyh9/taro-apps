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
import { connect } from "react-redux";
import classNames from "classnames";
import "./index.scss";
import {
  indexIcon,
  indexActiveIcon,
  storeIcon,
  storeActiveIcon,
  mallIcon,
  mallActiveIcon,
  userIcon,
  userActiveIcon,
  scanIcon,
  tabbarBg
} from "@/static/tabBar";

@connect(
  ({ tabbar: { selected } }) => ({
    selected
  }),
  null
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "#fff",
      selectedColor: "#181818",
      color: "#a0a0a0",
      isBorder: true,
      list: [
        {
          selectedIconPath: indexActiveIcon,
          iconPath: indexIcon,
          pagePath: "pages/index/index",
          text: "首页"
        },
        {
          selectedIconPath: storeActiveIcon,
          iconPath: storeIcon,
          pagePath: "pages/store/index",
          text: "附近门店"
        },
        // TODO 只做占位
        {},
        {
          selectedIconPath: mallActiveIcon,
          iconPath: mallIcon,
          pagePath: "pages/mall/index",
          text: "积分商城"
        },
        {
          selectedIconPath: userActiveIcon,
          iconPath: userIcon,
          pagePath: "pages/user/index",
          text: "我的"
        }
      ]
    };
  }

  // onLoad
  componentWillMount() {}
  // onReady
  componentDidMount() {}
  // onShow
  componentDidShow() {}
  // onHide
  componentDidHide() {}
  // onUnload
  componentWillUnmount() {}

  //除点餐选项，其它全是switchTab
  handleTabBar(item) {
    if (!Object.keys(item).length) return;
    if (item.pagePath.indexOf("scan") > -1) {
      Taro.navigateTo({ url: `/${item.pagePath}` });
    } else {
      Taro.switchTab({ url: `/${item.pagePath}` });
    }
  }

  // TODO 父元素不要固定高度，全部由子元素撑起来
  render() {
    let { list, backgroundColor, color, selectedColor, isBorder } = this.state;
    let { selected } = this.props;
    return (
      <View className="tabbar" style={{ backgroundColor }}>
        <View className="tabbar__con">
          {isBorder && <View className="tabbar__con__border"></View>}
          {list.map((e, i) => (
            <View
              className="tabbar__con__item"
              key={`item${i}`}
              onClick={this.handleTabBar.bind(this, e)}
            >
              <Image src={selected == i ? e.selectedIconPath : e.iconPath} />
              <Text style={{ color: selected == i ? selectedColor : color }}>
                {e.text}
              </Text>
            </View>
          ))}
          <View
            className="scan"
            onClick={this.handleTabBar.bind(this, {
              pagePath: "pages/scan/index"
            })}
          >
            <Image src={scanIcon} />
            <Text>扫码点餐</Text>
          </View>
          <Image className="tabbar__con__bg" src={tabbarBg} />
        </View>
      </View>
    );
  }
}

export default Index;
