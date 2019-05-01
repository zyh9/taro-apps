### taro-apps

[taro官网，请戳我](https://taro.aotu.io/)

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

[we-cropper地址，请戳我](https://github.com/we-plugin/we-cropper)

### 转译成h5暂不支持分包路径

[github issues，请戳我](https://github.com/NervJS/taro/issues/811)

### 原生小程序转Taro代码

[github issues，请戳我](https://github.com/NervJS/taro/issues/955)

### 组件传递函数属性名以-on-开头

[官网文档，请戳我](https://nervjs.github.io/taro/docs/best-practice.html#组件传递函数属性名以-on-开头)

### 给组件设置 defaultProps

```
    //只做演示
    static defaultProps = {
        defaultImg:'',
        onClickImg:function(){}
    }
```

[官网文档，请戳我](https://nervjs.github.io/taro/docs/best-practice.html#给组件设置-defaultprops)

### Taro1.1发布，全面支持微信/百度/支付宝小程序

[掘金链接，请戳我](https://juejin.im/post/5be179b9f265da613d7b89ec)

### Taro1.2发布，将已有微信小程序转换为多端应用（增加头条小程序支持）

[掘金链接，请戳我](https://juejin.im/post/5c185d98f265da613c09b975)

### 安装 transform-runtime（去除babel-polyfill）

> cnpm install babel-plugin-transform-runtime -D

[babel-polyfill VS babel-runtime VS babel-preset-env](https://juejin.im/post/5aefe0a6f265da0b9e64fa54)

### 生命周期对应关系

[生命周期对应关系，请戳我](https://nervjs.github.io/taro/docs/tutorial.html#生命周期对应关系)

### @taro/cli依赖未安装问题导致RN编译报错（Taro v1.2.12）

[github issues，请戳我](https://github.com/NervJS/taro/issues/2121)

> 解决方案 `npm install fbjs -D`

> windows文件路径 C:\Users\张燕辉\AppData\Roaming\npm\node_modules\@tarojs\cli

### taro依赖尽量用yarn安装，npm会导致依赖安装不完整

> 转换rn：npm run dev:rn（cmd窗口请勿完毕）

> 在使用expo构建apk需开启科学上网全局模式，保证代码以及静态资源能顺利上传至expo

> 构建完毕进入.rn_temp目录，运行 `expo build:android` 或 `expo build:ios` ，目前只针对apk进行测试

[文档链接，请戳我](https://nervjs.github.io/taro/docs/react-native.html)

[expo官网，请戳我](https://expo.io/)

> 账号密码：zyh941109 zyh941109
