import Taro from "@tarojs/taro";
const querystring = require("querystring");

// storage 读写
const storage = (key, val) => {
  try {
    if (!key || typeof key !== "string") {
      throw new Error("key must be a String");
    }
    if (val != undefined) {
      if (val instanceof Object) {
        val = JSON.stringify(val);
      }
      Taro.setStorageSync(key, val);
    } else {
      let value = Taro.getStorageSync(key);
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

// storage 删除
const removeStorage = (key) => {
  if (key == undefined) {
    return;
  }
  Taro.removeStorageSync(key);
};

// 提示 可单独导入
export const msg = (text) => {
  if (text && typeof text === "string") {
    Taro.showToast({
      title: text,
      icon: "none",
      duration: 1500,
    });
  }
};

// 显示加载框
const showLoad = (text = "加载中...") => {
  if (text && typeof text === "string") {
    Taro.showLoading({
      title: text,
      mask: true,
    });
  }
};

// 隐藏加载框
const hideLoad = () => Taro.hideLoading();

// 模态框
const showModal = (
  content = "",
  showCancel = false,
  confirmText = "确定",
  cancelText = "取消"
) => {
  Taro.showModal({
    title: "提示",
    content,
    showCancel,
    confirmText,
    cancelText,
    success: (res) => {
      if (res.confirm) {
        Taro.openSetting();
      }
    },
  });
};

// 格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
const FmtTime = (date, fmt) => {
  // TODO 处理ios时间NaN问题
  date = new Date(date.replace(/(\.|-)/g, "/"));
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  return fmt;
};

// 获取线上图片生成本地临时路径
const downImg = (val) => {
  return new Promise((resolve, reject) => {
    if (val.indexOf("wxfile://") == -1) {
      Taro.downloadFile({
        url: val,
        success: (res) => {
          resolve(res.tempFilePath);
        },
        fail: (err) => {
          reject(err);
        },
      });
    } else {
      resolve(val);
    }
  });
};

// path路径 示例：'pages/index/index'  如果路径带参数，需要indexOf处理一下
const goPath = (path) => {
  let getCurrentPages = Taro.getCurrentPages();
  let index = getCurrentPages.findIndex((e) => path.indexOf(e.route) > -1);
  if (index > -1) {
    getCurrentPages[index].onUnload();
    Taro.navigateBack({
      delta: getCurrentPages.length - (index > 0 ? index + 1 : index),
      success: (res) => {
        setTimeout((_) => {
          Taro.redirectTo({
            url: `/${path}`,
          });
        }, 500);
      },
      fail: (err) => {},
    });
  } else {
    Taro.navigateTo({
      url: `/${path}`,
    });
  }
};

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
const entries = (obj) => {
  var ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i); // preallocate the Array
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  // console.log(resArray);
  return resArray;
};

const compareVersion = (v1, v2) => {
  v1 = v1.split(".");
  v2 = v2.split(".");
  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i]);
    var num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
};

// 判断版本
const authVersion = ((_) => {
  if (process.env.TARO_ENV === "weapp") {
    let { system, version } = Taro.getSystemInfoSync();
    // iOS客户端7.0.6版本、Android客户端7.0.7版本之后
    system = system.toLowerCase().indexOf("ios") > -1 ? "iOS" : "Android";
    return {
      system,
      version,
      subscribe: !!(
        (system == "iOS" && compareVersion(version, "7.0.6") == 1) ||
        (system == "Android" && compareVersion(version, "7.0.7") == 1)
      ),
    };
  }
})();

// 处理订阅  tmplIds => array
// https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html
const subscribeMessage = (tmplIds) => {
  if (tmplIds == undefined) {
    throw new Error("tmplIds must be a Array");
  }
  if (Taro.requestSubscribeMessage) {
    if (!authVersion.subscribe) {
      // 低版本消息条数处理
      tmplIds = tmplIds.length > 1 ? tmplIds.splice(0, 1) : tmplIds;
    }
    return new Promise((resolve, reject) => {
      Taro.requestSubscribeMessage({
        tmplIds,
        success: (res) => {
          let { errMsg, ...data } = res;
          let Array = entries(data);
          let accept = Array.filter((e) => e[1] == "accept").map(
            (item) => item[0]
          );
          let reject = Array.filter((e) => e[1] == "reject").map(
            (item) => item[0]
          );
          // let ban = Array.filter(e => e[1] == 'ban').map(item => item[0])
          if (!accept.length && reject.length) {
            // 全部拒绝
            // showModal('你取消了订阅消息授权，将不会收到通知',true)
            msg("你取消了订阅消息授权，将不会收到通知");
          }
          resolve(accept);
        },
        fail: (err) => {
          if (err.errCode == 20004) {
            msg("你关闭了订阅消息开关，需要您重新开启");
          }
          resolve(err);
        },
      });
    });
  } else {
    showModal("当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试");
  }
};

// 授权弹窗 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
const authModal = async (authorize) => {
  // userLocation 位置信息
  // writePhotosAlbum 保存相册
  try {
    let { authSetting } = await Taro.getSetting();
    // console.log(authSetting)
    if (authorize == "userLocation") {
      return Promise.resolve({
        userLocation: authSetting[`scope.${authorize}`],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//复制数据到粘贴板
const copyData = (val) => {
  let str = String(val);
  return new Promise((resolve, reject) => {
    Taro.setClipboardData({
      data: str,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        msg("复制失败");
        reject(err);
      },
    });
  });
};

//拨打电话
const phoneCall = (val) => {
  let str = String(val);
  Taro.makePhoneCall({
    phoneNumber: str,
  });
};

const hidePhone = (val) => {
  return val.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
};

//检测手机号
const authPhone = (tel) => {
  let reg = /^[1][3-9]\d{9}$/;
  if (reg.test(tel)) {
    return true;
  } else {
    if (tel != "") {
      msg("请输入正确的手机号");
    } else {
      msg("请输入手机号");
    }
    return false;
  }
};

//检测图片验证码
const authCode = (val, type = 1) => {
  let reg = /^\d{6}$/;
  let str = type == 1 ? `短信` : `图形`;
  if (reg.test(val)) {
    return true;
  } else {
    if (val != "") {
      msg(`请输入完整的${str}验证码`);
    } else {
      msg(`请输入${str}验证码`);
    }
    return false;
  }
};

const getQuery = (url, name) => {
  if (url.indexOf("?") != -1) {
    let getStr = url.split("?")[1];
    let urlObj = querystring.parse(getStr);
    for (let key of Object.keys(urlObj)) {
      urlObj[key] &&
        (urlObj[key] = decodeURIComponent(urlObj[key].replace(/#\//, "")));
    }
    return urlObj[name];
  } else return null;
};

export default {
  storage,
  removeStorage,
  showLoad,
  hideLoad,
  showModal,
  FmtTime,
  downImg,
  goPath,
  entries,
  subscribeMessage,
  authModal,
  copyData,
  phoneCall,
  hidePhone,
  authPhone,
  authCode,
  getQuery,
};
