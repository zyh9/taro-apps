export default {
  pages: [
    "pages/index/index", //首页
    "pages/store/index", //门店
    "pages/mall/index", //商城
    "pages/user/index", //我的
  ],
  // subPackages: [
  //   {
  //     root: "pages-root",
  //     pages: [],
  //   },
  // ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "",
    navigationBarTextStyle: "black",
  },
  // TODO 自定义tabBar，包含pagePath
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: "pages/index/index",
      },
      {
        pagePath: "pages/store/index",
      },
      {
        pagePath: "pages/mall/index",
      },
      {
        pagePath: "pages/user/index",
      },
    ],
  },
  // tabBar: {
  //   backgroundColor: "#fff",
  //   selectedColor: "#181818",
  //   color: "#a0a0a0",
  //   borderStyle: "black",
  //   list: [
  //     {
  //       selectedIconPath: "static/tabBar/index-active.png",
  //       iconPath: "static/tabBar/index.png",
  //       pagePath: "pages/index/index",
  //       text: "首页"
  //     },
  //     {
  //       selectedIconPath: "static/tabBar/store-active.png",
  //       iconPath: "static/tabBar/store.png",
  //       pagePath: "pages/store/index",
  //       text: "附近门店"
  //     },
  //     {
  //       selectedIconPath: "static/tabBar/mall-active.png",
  //       iconPath: "static/tabBar/mall.png",
  //       pagePath: "pages/mall/index",
  //       text: "积分商城"
  //     },
  //     {
  //       selectedIconPath: "static/tabBar/user-active.png",
  //       iconPath: "static/tabBar/user.png",
  //       pagePath: "pages/user/index",
  //       text: "我的"
  //     }
  //   ]
  // },
  networkTimeout: {
    request: 8000,
  },
  navigateToMiniProgramAppIdList: ["wxe08dc00521462af8"],
  permission: {
    "scope.userLocation": {
      desc: " ",
    },
  },
};
