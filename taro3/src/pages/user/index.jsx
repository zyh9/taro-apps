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
import { connect } from "react-redux";
import NavBar from "@/components/nav-bar";

@connect(
  ({ location }) => ({
    location
  }),
  ({ location: { getLocation } }) => ({
    getLocation: () => getLocation()
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      typeList: [
        { text: "测试1" },
        { text: "测试2" },
        { text: "测试3" },
        { text: "测试4" },
        { text: "测试5" }
      ]
    };
  }

  // onLoad
  componentWillMount() {}
  // onReady
  componentDidMount() {}
  // onShow
  async componentDidShow() {
    try {
      this.$dispatch({ type: "tabbar/updateState", payload: { selected: 4 } });
    } catch (error) {}
  }
  // onHide
  componentDidHide() {}
  // onUnload
  componentWillUnmount() {}

  onPullDownRefresh() {
    Taro.stopPullDownRefresh();
  }

  onReachBottom() {}

  handleClick(i) {
    if (i == this.state.current) return;
    this.setState({
      current: i
    });
  }

  render() {
    let { current, typeList } = this.state;
    return (
      <View className="index">
        <NavBar
          // showBack={true}
          background="#ffc600"
          title="我的"
          // onQueryedDom={this.onQueryedBarDom.bind(this)}
        ></NavBar>
        <View className="select-list">
          <ScrollView
            scrollX
            scrollIntoView={`id${current - 2 > 0 ? current - 2 : 0}`}
            scrollWithAnimation
          >
            {typeList.map((e, i) => (
              <View
                className="item"
                key={`item${i}`}
                id={`id${i}`}
                onClick={this.handleClick.bind(this, i, e)}
              >
                <Text
                  className={classNames("item-text", {
                    "item-text__active": current == i
                  })}
                >
                  {e.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Index;
