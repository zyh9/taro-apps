import Taro from "@tarojs/taro";
const ak = "";
const BASE_URL = "https://api.map.baidu.com";

// 附近位置 bd09ll坐标 webapi
// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
const regeocoding = param => {
  return new Promise((resolve, reject) => {
    let data = {
      ak: ak,
      location: param["location"] || "", //lat,lng 纬度，经度
      coordtype: param["coordtype"] || "bd09ll",
      extensions_poi: param["extensions_poi"] || 1,
      output: param["output"] || "json",
      ret_coordtype: "bd09ll"
    };
    Taro.request({
      url: BASE_URL + "/reverse_geocoding/v3/",
      data,
      header: {
        "content-type": "application/json"
      },
      method: "GET",
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

// 地址检索 bd09ll坐标 webapi
// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
const search = param => {
  return new Promise((resolve, reject) => {
    let data = {
      ak: ak,
      query: param["query"] || "生活服务$美食&酒店",
      scope: param["scope"] || 2,
      coord_type: param["coord_type"] || 3,
      page_size: param["page_size"] || 10,
      page_num: param["page_num"] || 0,
      output: param["output"] || "json",
      radius: param["radius"] || 5000,
      city_limit: param["city_limit"] || true,
      region: param["region"] || "",
      ret_coordtype: "bd09ll"
    };
    //存在坐标 通过坐标检索
    if (param["location"]) {
      //圆形查询
      Object.assign(data, {
        location: param["location"] || ""
      });
    }
    if (param["tag"]) {
      //圆形查询
      Object.assign(data, {
        tag: param["tag"] || ""
      });
    }
    Taro.request({
      url: BASE_URL + "/place/v2/search",
      data,
      header: {
        "content-type": "application/json"
      },
      method: "GET",
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

// 地址逆解析 bd09ll坐标 webapi 地点->经纬度
// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
const geocoding = param => {
  return new Promise((resolve, reject) => {
    let data = {
      address: param["address"] || "",
      city: param["city"] || "",
      ret_coordtype: param["coordtype"] || "bd09ll",
      ak: ak,
      sn: param["sn"] || "",
      output: param["output"] || "json"
    };
    if (param["address"]) {
      Taro.request({
        url: BASE_URL + "/geocoding/v3",
        data,
        header: {
          "content-type": "application/json"
        },
        method: "GET",
        success: res => {
          resolve(res.data);
        },
        fail: err => {
          reject(err);
        }
      });
    } else {
      reject("地址获取失败");
    }
  });
};

export default {
  regeocoding,
  search,
  geocoding
};
