import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/cart/index',
      'pages/user/index',
      // 'pages/upload/index',
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
  
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
