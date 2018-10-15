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

### 图片裁剪

[图片裁剪，请戳我](https://github.com/zyh9/taro-apps/blob/master/src/pages/upload/index.js)

### 小程序图片裁剪上传插件

[we-cropper地址，请戳我](https://github.com/we-plugin/we-cropper)

### 转译成h5暂不支持分包路径

[github issues，请戳我](https://github.com/NervJS/taro/issues/811)
