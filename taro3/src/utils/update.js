import Taro from "@tarojs/taro";

const updateManager = () => {
  if (Taro.canIUse("getUpdateManager")) {
    return new Promise((resolve, reject) => {
      const updateManager = Taro.getUpdateManager();
      updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调
        resolve({
          hasUpdate: res.hasUpdate,
          message: res.hasUpdate ? "新版本提醒~" : "已是最新版本~"
        });
      });
      updateManager.onUpdateReady(_ => {
        console.log("新版本已下载");
        Taro.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          // showCancel: false,
          success: res => {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(_ => {
        console.log("新版本下载失败");
        // 新版本下载失败
        Taro.showModal({
          title: "更新提示",
          content: "新版本已经上线，请您删除当前小程序，重新搜索打开哦~"
          // showCancel: false
        });
      });
    });
  }
};

export default updateManager;
