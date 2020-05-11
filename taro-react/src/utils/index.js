import Taro from '@tarojs/taro';
// import gcoord from 'gcoord';

// const baseUrl = '';

const commonHeader = _ => {
  //headers每次必传数据存放位置
  return {

  }
}

//toast提示
const msg = text => {
  if (text && typeof text === 'string') {
    Taro.showToast({
      title: text,
      icon: 'none',
      duration: 1500,
    })
  }
}

//显示加载框
const showLoad = text => {
  if (text && typeof text === 'string') {
    Taro.showLoading({
      title: text,
      mask: true
    })
  }
}

//隐藏加载框
const hideLoad = _ => Taro.hideLoading()

//get数据请求
const get = (opt = {}) => {
  let time = new Date().getTime();
  const str = Object.entries(opt.params).map(e => `${e[0]}=${e[1]}`).join("&").replace(/\s/g, '');
  let editHeaders = Object.assign({}, {
    'content-type': 'application/json'
  }, commonHeader())
  opt.headers && (editHeaders = Object.assign({}, editHeaders, opt.headers))
  let isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  isLoad && showLoad('加载中')
  return new Promise((resolve, reject) => {
    let address = str ? `${opt.url}?${str}&t=${time}` : `${opt.url}?t=${time}`;
    Taro.request({
      url: baseUrl + address,
      header: editHeaders,
      method: "GET",
      success: res => {
        isLoad && hideLoad()
        setTimeout(_ => {
          opt['success'] && opt['success'](res.data);
          resolve(res.data)
        }, 0)
      },
      fail: err => {
        msg('sorry，网络开小差了')
        opt['fail'] && opt['fail'](err);
        reject(err)
      }
    })
  })
}

//post数据请求
const post = (opt = {}) => {
  let time = new Date().getTime();
  let editHeaders = Object.assign({}, {
    'content-type': 'application/json'
  }, commonHeader())
  opt.headers && (editHeaders = Object.assign({}, editHeaders, opt.headers))
  let isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  isLoad && showLoad('加载中')
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${baseUrl}${opt.url}?t=${time}`,
      data: opt.data || {},
      header: editHeaders,
      method: "POST",
      success: res => {
        isLoad && hideLoad()
        setTimeout(_ => {
          opt['success'] && opt['success'](res.data);
          resolve(res.data)
        }, 0)
      },
      fail: err => {
        msg('sorry，网络开小差了')
        opt['fail'] && opt['fail'](err);
        reject(err)
      }
    })
  })
}

//格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
const FmtTime = (date, fmt) => {
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//获取线上图片生成本地临时路径
const downImg = val => {
  return new Promise((resolve, reject) => {
    if (val.indexOf('wxfile://') == -1) {
      Taro.downloadFile({
        url: val,
        success: res => {
          resolve(res.tempFilePath)
        },
        fail: err => {
          reject(err)
        }
      })
    } else {
      resolve(val)
    }
  })
}

//路由跳转
const goPath = path => {
  //path路径 示例：'pages/index/index'  如果路径带参数，需要indexOf处理一下
  let index = getCurrentPages().findIndex(e => path.indexOf(e.route) > -1);
  if (index > -1) {
    getCurrentPages()[index].onUnload();
    Taro.navigateBack({
      delta: getCurrentPages().length - (index > 0 ? index + 1 : index),
      success: res => {
        setTimeout(_ => {
          Taro.redirectTo({
            url: `/${path}`
          })
        }, 500)
      },
      fail: err => {}
    })
  } else {
    Taro.navigateTo({
      url: `/${path}`
    })
  }
}

/**
 * @param {Number} time 单位/秒
 * Math.floor(new Date().getTime() / 1000)
 * Math.floor((new Date(param.replace(/-/g, '/'))) / 1000)
 * @param {Number} type 0：字符串  1：数组
 */
const getTime = (time, type = 0) => {
  const two = (n) => {
    return n < 10 ? '0' + n : '' + n;
  };
  // let d = two(Math.floor(time / 86400));
  let h = two(Math.floor((time) / 3600));
  let s = two(Math.floor((time % 3600) / 60));
  let m = two(Math.floor(time % 60));
  return type == 0 ? `${h}:${s}:${m}` : [h, s, m];
}

//复制数据到粘贴板
const copyData = val => {
  return new Promise((resolve, reject) => {
    Taro.setClipboardData({
      data: val,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

//拨打电话
const phoneCall = val => {
  Taro.makePhoneCall({
    phoneNumber: val
  })
}

//手机号中间四位隐藏
const phoneHide = val => {
  let str = String(val);
  return str.substr(0, 3).padEnd(7, '*') + str.substr(7)
}

//获取路径参数
const getPathData = path => {
  let pathObj = {};
  if (path.indexOf('?') != -1) {
    let getArr = path.split('?')[1].split('&');
    getArr.forEach(e => {
      if (!(e.split('=')[0] in pathObj)) {
        pathObj[e.split('=')[0]] = e.split('=')[1];
      }
    })
    return pathObj;
  } else return false;
}

export {
  baseUrl,
  commonHeader,
  msg,
  showLoad,
  hideLoad,
  get,
  post,
  FmtTime,
  downImg,
  goPath,
  getTime,
  copyData,
  phoneCall,
  phoneHide,
  getPathData,
}
