import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

const store = configStore()

class App extends Component {

  config = {
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
    }],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: "#fff",
      selectedColor: "#090102",
      color: "#b2b2b2",
      list: [
        {
          selectedIconPath: "./static/tabBar/index-active.png",
          iconPath: "./static/tabBar/index.png",
          pagePath: "pages/index/index",
          text: "首页"
        },
        {
          selectedIconPath: "./static/tabBar/user-active.png",
          iconPath: "./static/tabBar/user.png",
          pagePath: "pages/cart/index",
          text: "购物车"
        },
        {
          selectedIconPath: "static/tabBar/user-active.png",
          iconPath: "./static/tabBar/user.png",
          pagePath: "pages/user/index",
          text: "我的"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
