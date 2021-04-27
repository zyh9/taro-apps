import Taro from "@tarojs/taro";
import getLoc from "@/utils/location";
import util, { msg } from "@/utils/util";

export default {
  state: {
    currentCity: "", //用户选中城市
    isOpened: true //授权开关--默认开启
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    },
    changeCity(state, payload) {
      return Object.assign({}, state, payload);
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async getLocation(payload, rootState) {
      try {
        let res = await getLoc();
        return this.updateState({
          ...res,
          isOpened: true
        });
      } catch (error) {
        let { userLocation } = await util.authModal("userLocation");
        // TODO 小程序定位未开启
        if (!userLocation) {
          Taro.showModal({
            title: "无法获取定位",
            content:
              "需要您的微信定位授权，为您匹配附近门店信息，请授权后使用~",
            confirmText: "去授权",
            showCancel: false,
            success: res => {
              if (res.confirm) {
                Taro.openSetting();
              }
            }
          });
        } else {
          msg("请检查微信定位、手机定位是否开启~");
        }
        // TODO 此字段只负责UI展示
        this.updateState({
          isOpened: false
        });
        return Promise.reject("位置获取失败~");
      }
    },
    async updateLoc(payload, rootState) {
      let res = await Taro.getLocation({
        type: "gcj02"
      });
      this.updateState({
        latitude: res.latitude,
        longitude: res.longitude
      });
    }
  }
};
