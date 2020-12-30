### taro-apps

[taro 官网，请戳我](https://taro.aotu.io/)

### 分包配置

```javascript
    pages: [
        'pages/index/index',
        'pages/cart/index',
        'pages/user/index',
        'pages/upload/index',
    ],
    //分包配置
    subPackages:[{
        root:'pagesOther',
        pages:[//直接写所在文件夹即可
            'other/index'
        ]
    }]
```

### 相关软件下载

[微信小程序，请戳我](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

[百度小程序，请戳我](https://smartprogram.baidu.com/docs/develop/devtools/show_sur/)

[支付宝小程序，请戳我](https://docs.alipay.com/mini/ide/download)

[头条小程序，请戳我](https://developer.toutiao.com/docs/devtool/versionUpdate.html)

### 图片裁剪

[图片裁剪，请戳我](https://github.com/zyh9/taro-apps/blob/master/src/pages/upload/index.js)

### 小程序图片裁剪上传插件

[we-cropper 地址，请戳我](https://github.com/we-plugin/we-cropper)

### 转译成 h5 暂不支持分包路径

[github issues，请戳我](https://github.com/NervJS/taro/issues/811)

### 原生小程序转 Taro 代码

[github issues，请戳我](https://github.com/NervJS/taro/issues/955)

### 组件传递函数属性名以 on 开头

[官网文档，请戳我](https://nervjs.github.io/taro/docs/best-practice.html#组件传递函数属性名以-on-开头)

### 性能优化实践

[官网文档，请戳我](https://nervjs.github.io/taro/docs/optimized-practice.html)

### 异步编程

[官网文档，请戳我](https://nervjs.github.io/taro/docs/async-await.html)

### 配置目录别名 alias

[官网文档，请戳我](https://nervjs.github.io/taro/docs/config-detail.html#alias)

### 给组件设置 defaultProps

```
    //只做演示
    static defaultProps = {
        defaultImg:'',
        onClickImg:function(){}
    }
```

[官网文档，请戳我](https://nervjs.github.io/taro/docs/best-practice.html#给组件设置-defaultprops)

### Taro1.1 发布，全面支持微信/百度/支付宝小程序

[掘金链接，请戳我](https://juejin.im/post/5be179b9f265da613d7b89ec)

### Taro1.2 发布，将已有微信小程序转换为多端应用（增加头条小程序支持）

[掘金链接，请戳我](https://juejin.im/post/5c185d98f265da613c09b975)

### Taro 1.3 震撼发布：全面支持 JSX 语法和 HOOKS

[掘金链接，请戳我](https://juejin.im/post/5d00f7f26fb9a07efe2db5d9)

### 使用 React Hooks 重构你的小程序

[掘金链接，请戳我](https://juejin.im/post/5d259e27e51d4510a7328144)

### 安装 transform-runtime（去除 babel-polyfill）

> cnpm install babel-plugin-transform-runtime -D

[babel-polyfill VS babel-runtime VS babel-preset-env](https://juejin.im/post/5aefe0a6f265da0b9e64fa54)

### 生命周期对应关系

[生命周期对应关系，请戳我](https://nervjs.github.io/taro/docs/tutorial.html#生命周期)

```md
    由于组件 JS 也继承自 Component 组件基类，所以页面同样拥有生命周期，页面的生命周期方法如下：

    componentWillMount()
    组件加载时触发，一个组件只会调用一次，此时组件 DOM 尚未准备好，还不能和视图层进行交互

    componentDidMount()
    组件初次渲染完成时触发，一个组件只会调用一次，代表组件已经准备妥当，可以和视图层进行交互

    componentWillReceiveProps(nextProps)
    已经装载的组件接收到新属性前调用

    shouldComponentUpdate(nextProps, nextState)
    组件是否需要更新，返回 false 不继续更新，否则继续走更新流程

    componentWillUpdate(nextProps, nextState)
    组件即将更新

    componentDidUpdate(prevProps, prevState)
    组件更新完毕

    componentWillUnmount()
    组件卸载时触发
```

### @taro/cli 依赖未安装问题导致 RN 编译报错（Taro v1.2.12）

[github issues，请戳我](https://github.com/NervJS/taro/issues/2121)

> 解决方案 `npm install fbjs -D`

> windows 文件路径 C:\Users\张燕辉\AppData\Roaming\npm\node_modules\@tarojs\cli

### taro 依赖尽量用 yarn 安装，npm 会导致依赖安装不完整

> 转换 rn：npm run dev:rn（cmd 窗口请勿完毕）

> 在使用 expo 构建 apk 需开启科学上网全局模式，保证代码以及静态资源能顺利上传至 expo

> 构建完毕进入.rn_temp 目录，运行 `expo build:android` 或 `expo build:ios` ，目前只针对 apk 进行测试

[文档链接，请戳我](https://nervjs.github.io/taro/docs/react-native.html)

[expo 官网，请戳我](https://expo.io/)

> 账号密码：zyh941109 zyh941109

### gulp 压缩 zip

> 安装依赖 npm i gulp gulp-zip dayjs del -D

```javascript
const path = require("path");
const gulp = require("gulp");
const zip = require("gulp-zip");
const dayjs = require("dayjs");
const del = require("del");
const distFile = "dist"; //打包目录
const packageInfo = require("./package.json");

let platform = process.argv[process.argv.length - 1] || "weapp";

const gulpZip = async () => {
  const deletedPaths = await del(["*.zip"]);
  console.log(deletedPaths);
  return gulp
    .src(path.resolve(distFile + "/**"))
    .pipe(
      zip(
        "小程序" +
          platform +
          "-" +
          packageInfo.version +
          "-" +
          dayjs().format("YYYY-MM-DD HH-mm-ss") +
          ".zip"
      )
    )
    .pipe(gulp.dest("./"));
};

//压缩打包文件
gulp.task(platform, gulpZip);

// gulp.task--定义任务
// gulp.src--找到需要执行任务的文件
// gulp.dest--执行任务的文件的去处
// gulp.watch--观察文件是否发生变化
```

### onTouchMove 不能阻止滑动穿透问题

[github issues，请戳我](https://github.com/NervJS/taro/issues/3980)

```javascript
    handleTouchMove = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    <View className={classString} onTouchMove={this.handleTouchMove}>
```

> 禁止手动滑动 swiper 组件，将此方法加在 swiper-item 上即可

### 常用方法以及引用方式

| 请求          | 节流             | 图片批量上传      | 验证             |
| ------------- | ---------------- | ----------------- | ---------------- |
| @/utils/index | @/utils/throttle | @/utils/uploadImg | @/utils/validate |

> 示例

```javascript
import { get, post, msg } from "@/utils/index";
```

### 去除列表切换记忆滚动条位置

```javascript
Taro.pageScrollTo({
  scrollTop: 0,
  duration: 0,
});
```

### this.$scope 的使用

> 在自定义组件下，当前组件实例的 this，以操作组件内 Canvas 组件

```javascript
Taro.createCanvasContext("myCanvas", this.$scope);

Taro.canvasToTempFilePath(
  {
    canvasId: "myCanvas",
    success: (res) => {},
    fail: (err) => {},
  },
  this.$scope
);
```

### 隐藏 ScrollView 滚动条

```less
::-webkit-scrollbar {
  display: none;
}
```

### 去除 button 默认边框

> 去除 button 伪元素的默认样式

```less
button {
  &::after {
    border: none;
  }
}
```

### 组件的外部样式和全局样式

[官网链接，请戳我](https://taro-docs.jd.com/taro/docs/component-style.html)

### tabBar 回到顶部

```javascript
import debounce from "@/utils/debounce"; // 防抖
let isGoTop = false; // 是否点按回到顶部
let scrollTop = 0; // 页面scrollTop值

class Index extends Component {
  config = {
    navigationBarTitleText: "",
  };
  state = {};
  // onLoad
  componentWillMount() {}
  // onReady
  componentDidMount() {}
  // onShow
  componentDidShow() {
    isGoTop = false; //页面切换首次点按不触发回到顶部
  }
  // onHide
  componentDidHide() {}
  // onUnload
  componentWillUnmount() {}
  // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
  onPageScroll = debounce((e) => {
    scrollTop = e.scrollTop;
    if (screenHeight * 3 < e.scrollTop) {
      isGoTop = true;
      Taro.setTabBarItem({
        index: 0,
        text: "回到顶部",
        iconPath: "static/tabBar/top.png",
        selectedIconPath: "static/tabBar/top-active.png",
      });
    } else {
      isGoTop = false;
      Taro.setTabBarItem({
        index: 0,
        text: "首页",
        iconPath: "static/tabBar/index.png",
        selectedIconPath: "static/tabBar/index-active.png",
      });
    }
    console.log(isGoTop, scrollTop);
  }, 20);
  onTabItemTap(e) {
    console.log(isGoTop, scrollTop);
    if (e.index == 0 && isGoTop) {
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    }
    if (!isGoTop && screenHeight * 3 < scrollTop) {
      //页面切换首次点按不触发回到顶部
      isGoTop = true;
    }
  }
  render() {
    return <View className="index"></View>;
  }
}

export default Index;
```

> 为了防止回到顶部静态资源无法 copy 的问题，需要修改一下编译配置

```javascript
    // config/index.js
    // https://nervjs.github.io/taro/docs/config-detail.html#copy
    copy: {
        patterns: [
            {
                from:'src/static/tabBar',
                to:'dist/static/tabBar'
            }
        ],
        options: {
        }
    },
```

### swiper 设置圆角在真机上不显示

[微信开放社区链接，请戳我](https://developers.weixin.qq.com/community/develop/doc/00026658428810dd8c07c062556400)

### Taro 升级 2.0

Taro 2.0 中开启 async functions 支持不再需要安装 @tarojs/async-await，而是直接通过 babel 插件来获得支持。

> 在项目根目录下安装包 babel-plugin-transform-runtime 和 babel-runtime。

[掘金链接，请戳我](https://juejin.im/post/5e15edfff265da5d661a1ac0)

### 优雅的 redux 异步中间件 redux-effect

[掘金链接，请戳我](https://juejin.im/post/5c98a405f265da612f1ba4bb)

### Taro 升级 3.0 beta

[官方 vue 支持文档](https://taro-docs.jd.com/taro/next/docs/vue.html)

### 无感知请求（rematch）

```javascript
import Taro from "@tarojs/taro";
import { get, post } from "@/utils/request";
import { WxCodeLogin } from "@/api/login";

export default {
  state: {}, // initial state
  reducers: {
    // handle state changes with pure functions
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async wxLogin(payload, rootState) {
      try {
        const { code: jsCode } = await Taro.login();
        const { Body } = await WxCodeLogin({
          jsCode,
        });
        if (!Body) {
          return Promise.reject("Token 不存在");
        }
        return this.updateState({ ...Body });
      } catch (error) {}
    },
    async updateLogin(payload, rootState) {
      // 针对token失效进行无感知数据请求
      try {
        await this.wxLogin();
        const res =
          payload.method == "GET" ? await get(payload) : await post(payload);
        return this.updateState({
          data: res,
        });
      } catch (error) {}
    },
  },
};
```

### 消息订阅

[微信小程序订阅消息莞式教程](https://juejin.cn/post/6844904025259786248)
