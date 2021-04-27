import Taro from "@tarojs/taro";
const key = "";
const BASE_URL = "https://apis.map.qq.com";

// 附近位置 gcj02坐标 webapi
// https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
const regeocoding = param => {
  return new Promise((resolve, reject) => {
    let data = {
      key: key,
      location: param.location || "", //lat,lng 纬度，经度
      coord_type: param.coord_type || 5,
      get_poi: param.get_poi || 1,
      output: "json"
    };
    Taro.request({
      url: BASE_URL + "/ws/geocoder/v1/",
      data,
      header: {
        "content-type": "application/json"
      },
      method: "GET",
      success: res => {
        if (res.data.status == 0) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

// 地址检索 gcj02坐标 webapi
// https://lbs.qq.com/service/webService/webServiceGuide/webServiceSearch
const search = param => {
  return new Promise((resolve, reject) => {
    let data = {
      key: key,
      keyword: param.keyword,
      boundary: param.region ? region(param.region, 0) : "",
      orderby: param.orderby || "_distance",
      page_size: param.page_size || 10, //控制显示条数
      page_index: param.page_index || 1, //控制页数
      output: "json"
    };
    Taro.request({
      url: BASE_URL + "/ws/place/v1/search",
      data,
      header: {
        "content-type": "application/json"
      },
      method: "GET",
      success: res => {
        if (res.data.status == 0) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

// 地址逆解析 gcj02坐标 webapi
// https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
const geocoding = param => {
  return new Promise((resolve, reject) => {
    let data = {
      key: key,
      address: param.address,
      output: "json"
    };
    Taro.request({
      url: BASE_URL + "/ws/geocoder/v1/",
      data,
      header: {
        "content-type": "application/json"
      },
      method: "GET",
      success: res => {
        if (res.data.status == 0) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

export default {
  regeocoding,
  search,
  geocoding
};
