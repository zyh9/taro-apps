#### 区分平台

`process.env.TARO_PLAT`

> 改变不同环境 title 可以根据 `process.env.TARO_PLAT` 来修改相应的页面 config 配置

#### 公用方法使用

```js
import util, { msg } from "@/utils/util";
import taroUtil from "@/utils/taroUtil";
import compute from "@/utils/compute";
import validate from "@/utils/validate";
import store from "@/store"; // 执行顺序有点问题

const prototype = {
  $util: util, // 工具函数
  $msg: msg, // 消息提示
  $taroUtil: taroUtil, //Taro函数
  $compute: compute, //浮点运算
  $validate: validate, //正则校验
  $dispatch: store.dispatch // 可在页面中直接发起action
};

// 挂载原型
for (const [key, value] of util.entries(prototype)) {
  Component.prototype[key] = value;
}
```

| `this.$util` | `this.$msg` | `this.$taroUtil` |
| :----------: | :---------: | :--------------: |
|   工具函数   |  消息提示   |    Taro 函数     |

| `this.$compute` | `this.$validate` | `this.$dispatch` |
| :-------------: | :--------------: | :--------------: |
|    浮点运算     |     正则校验     |   发起 action    |

#### 发起 action

> 页面中直接发起

```js
//示例
/**
 * @type action 名称
 * @payload 所需参数
 */
this.$dispatch({ type: "location/getLocation", payload: {} });
```

> 通过`mapDispatch`发起

```js
const mapDispatch = ({ location: { getLocation } }) => {
  return {
    getLocation: () => getLocation()
  };
};
// 发起action
this.props.getLocation();
```

> 非页面文件

```js
import store from "@/store";

store.dispatch({ type: "location/getLocation", payload: {} });
```

#### 使用装饰器

```js
import {debounce} from "@/utils/descriptor";

@debounce(20)
onPageScroll(e){}
```

#### 全局注入 sass

```js
// https://taro-docs.jd.com/taro/docs/config-detail#全局注入-scss-的例子
sass: {
  resource: [
    'src/styles/index.scss',
    'src/styles/hairline.scss',
  ],
  projectDirectory: path.resolve(__dirname, '..')
}
```

#### 生命周期对应关系

[官方文档：生命周期](https://taro-docs.jd.com/taro/docs/react#生命周期)

```js
  // onLoad
  componentWillMount() { }
  // onReady
  componentDidMount() { }
  // onShow
  componentDidShow() { }
  // onHide
  componentDidHide() { }
  // onUnload
  componentWillUnmount() { }
```

#### 提交规范

|   类型   | emji |           描述            |
| :------: | :--: | :-----------------------: |
|   feat   |  ✨  |        引入新功能         |
|   fix    |  🐛  |         修复 bug          |
|  style   |  💄  |    更新 UI 样式文按键     |
|  format  |  🥚  |        格式化代码         |
|   docs   |  📝  |       添加/更新文档       |
|   perf   |  👌  |       提高性能/优化       |
|   init   |  🎉  |    初次提交/初始化项目    |
|   test   |  ✅  |       增加测试代码        |
| refactor |  🎨  |   改进代码结构/代码格式   |
|  patch   |  🚑  |       添加重要补丁        |
|   file   |  📦  |        添加新文件         |
| publish  |  🚀  |        发布新版本         |
|   tag    |  📌  |        发布新版本         |
|  config  |  🔧  |       修改配置文件        |
|   git    |  🙈  | 添加或修改.gitignore 文件 |

#### 拓展阅读

[小程序页面 config 配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)

[小程序页面 page 配置](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)

[taro 2.2.15 打包构建报错](https://github.com/NervJS/taro/issues/9044)

[Taro3 使用 redux 分享不生效问题](https://github.com/NervJS/taro/issues/7232)

#### Object.entries()

> Object.entries() 方法部分 ios 手机小程序不兼容

[Object.entries 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#polyfill)

```js
if (!Object.entries)
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
```

### appid 汇总

|        测试        |        正式        |
| :----------------: | :----------------: |
| wx05858fdc21860d76 | wx71373698c47f9a9f |

### 场景信息

```js
  IMPORTANT_SCENE: {
    PAY: 1,//支付场景
    USER_CENTER: 2,//会员中心
    LOGIN: 3,//登录
    BIND_WX: 4,//绑定微信
    ORDER: 5,//下单
    SEND_COUPON: 6//发放优惠券
  }
```
