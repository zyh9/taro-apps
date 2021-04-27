const qs = require("querystring");
import Taro from "@tarojs/taro";
import util, { msg } from "@/utils/util";
import {
  BASE_URL,
  BASE_HEADER,
  store
} from "@/utils/config";

// get数据请求
export const GET = (opt = {}) => {
  let option = {
    method: "GET",
    url: `${BASE_URL}${opt.url}?${qs.stringify(opt.data)}`,
    header: Object.assign(
      {},
      { "content-type": "application/json" },
      Object.keys(BASE_HEADER()).length ? { ...BASE_HEADER() } : {}
    ),
    isLoad: opt.isLoad != undefined ? opt.isLoad : true
  };
  return REQUEST(option, opt);
};

// post数据请求
export const POST = (opt = {}) => {
  let option = {
    method: "POST",
    url: `${BASE_URL}${opt.url}`,
    header: Object.assign(
      {},
      { "content-type": "application/x-www-form-urlencoded" },
      Object.keys(BASE_HEADER()).length ? { ...BASE_HEADER() } : {}
    ),
    data: opt.data || {},
    isLoad: opt.isLoad != undefined ? opt.isLoad : true
  };
  return REQUEST(option, opt);
};

export const REQUEST = ({ isLoad, ...option }, opt) => {
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    Taro.request({
      ...option,
      success: async res => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            option.success && option.success(res.data);
            resolve(res.data);
          } else {
            await store.dispatch({
              type: "login/updateLogin",
              payload: { method: option.method, ...opt }
            });
            const { login } = store.getState();
            resolve(login.data);
          }
        } else {
          msg("服务器跟别人私奔了~");
        }
      },
      fail: err => {
        option.fail && option.fail(err);
        reject(err);
        msg("服务器跟别人私奔了~");
      }
    });
  });
};

export const COMMON_GET = (opt = {}) => {
  let option = {
    method: "GET",
    url: `${BASE_URL}${opt.url}?${qs.stringify(opt.data)}`,
    header: Object.assign(
      {},
      { "content-type": "application/json" },
      Object.keys(BN_HEADER()).length ? { ...BN_HEADER() } : {}
    ),
    isLoad: opt.isLoad != undefined ? opt.isLoad : true
  };
  return COMMON_REQUEST(option);
};

export const COMMON_POST = (opt = {}) => {
  let option = {
    method: "POST",
    url: `${BASE_URL}${opt.url}`,
    header: Object.assign(
      {},
      { "content-type": "application/json" },
      Object.keys(BN_HEADER()).length ? { ...BN_HEADER() } : {}
    ),
    data: opt.data || {},
    isLoad: opt.isLoad != undefined ? opt.isLoad : true
  };
  return COMMON_REQUEST(option);
};

const COMMON_REQUEST = ({ isLoad, ...option }) => {
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    Taro.request({
      ...option,
      success: res => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      },
      fail: err => {
        option.fail && option.fail(err);
        reject(err);
        msg("服务器跟别人私奔了~");
      }
    });
  });
};
