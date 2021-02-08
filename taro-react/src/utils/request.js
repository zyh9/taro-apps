const qs = require("querystring");

import Taro from "@tarojs/taro";
import util, { msg } from "@/utils/util";
import { baseUrl, commonHeader, store } from "@/utils/config";

// get数据请求
export const get = (opt = {}) => {
  const str = qs.stringify(opt.data);
  const editHeaders = Object.assign(
    {},
    {
      "content-type": "application/json",
    },
    commonHeader(),
    opt.headers || {}
  );
  const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${baseUrl}${opt.url}?${str}`,
      header: editHeaders,
      method: "GET",
      success: async (res) => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          opt.success && opt.success(res.data);
          if (res.data.State == 1) {
            resolve(res.data);
          } else if (res.data.State == -10) {
            // token失效
            await store.dispatch({
              type: "login/updateLogin",
              payload: { ...opt, method: "GET" },
            });
            const { login } = store.getState();
            resolve(login.data);
          } else {
            msg(res.data.Msg);
            reject(res.data);
          }
        } else {
          msg("sorry，网络开小差了");
        }
      },
      fail: (err) => {
        opt.fail && opt.fail(err);
        reject(err);
        msg("sorry，网络开小差了");
      }
    });
  });
};

// post数据请求
export const post = (opt = {}) => {
  const editHeaders = Object.assign(
    {},
    {
      "content-type": "application/json",
    },
    commonHeader(),
    opt.headers || {}
  );
  const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${baseUrl}${opt.url}`,
      data: opt.data || {},
      header: editHeaders,
      method: "POST",
      success: async (res) => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          opt.success && opt.success(res.data);
          if (res.data.State == 1) {
            resolve(res.data);
          } else if (res.data.State == -10) {
            // token失效
            await store.dispatch({
              type: "login/updateLogin",
              payload: { ...opt, method: "POST" },
            });
            const { login } = store.getState();
            resolve(login.data);
          } else {
            msg(res.data.Msg);
            reject(res.data);
          }
        } else {
          msg("sorry，网络开小差了");
        }
      },
      fail: (err) => {
        opt.fail && opt.fail(err);
        reject(err);
        msg("sorry，网络开小差了");
      },
    });
  });
};
