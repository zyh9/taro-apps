import { Component } from "react";
import { getCurrentInstance, Current } from "@tarojs/taro";
import { Provider } from "react-redux";
import "./app.scss";

import util, { msg } from "@/utils/util";
import taroUtil from "@/utils/taroUtil";
import compute from "@/utils/compute";
import validate from "@/utils/validate";
import qqmap from "@/utils/qqmap";
import store from "@/store"; // 执行顺序有点问题

const prototype = {
  $util: util, // 工具函数
  $msg: msg, // 消息提示
  $taroUtil: taroUtil, //Taro函数
  $compute: compute, //浮点运算
  $validate: validate, //正则校验
  $qqmap: qqmap, //腾讯地图SDK
  $dispatch: store.dispatch, // 可在页面中直接发起action
  $router: () => getCurrentInstance().router
};

// 挂载原型
for (const [key, value] of util.entries(prototype)) {
  Component.prototype[key] = value;
}

import updateManager from "@/utils/update";

class App extends Component {
  // onLoad
  componentWillMount() {}
  // onReady
  componentDidMount() {}
  // onShow
  async componentDidShow() {
    // TODO 微信小程序版本更新
    if (process.env.TARO_ENV === "weapp") {
      let res = await updateManager();
      console.log(res);
    }
  }
  // onHide
  componentDidHide() {}
  // onUnload
  componentWillUnmount() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
