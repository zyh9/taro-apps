import Taro from "@tarojs/taro";
import { GET, POST } from "@/utils/request";
// import { WeChatLogin } from "@/api/login";

export default {
  state: {
    data: null
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async wxLogin(payload, rootState) {
      try {
        const { code } = await Taro.login();
        const { data } = await WeChatLogin({
          code
        });
        if (!data || !data.unionid) {
          return Promise.reject("用户信息获取失败");
        }
        return this.updateState({ ...data });
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async updateLogin(payload, rootState) {
      // 针对token失效进行无感知数据请求
      try {
        await this.wxLogin();
        const res =
          payload.method == "GET" ? await GET(payload) : await POST(payload);
        return this.updateState({
          data: res
        });
      } catch (error) {}
    }
  }
};
