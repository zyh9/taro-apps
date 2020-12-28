import Taro from "@tarojs/taro";

const updateManager = () => {
  if (Taro.canIUse("getUpdateManager")) {
    const updateManager = Taro.getUpdateManager();
    updateManager.onUpdateReady(_ => {
      console.log("新版本已下载");
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: res => {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      console.log(`${res.hasUpdate ? "新版本提醒" : "暂无新版本"}`);
    });
    updateManager.onUpdateFailed(_ => {
      // 新版本下载失败
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经上线，请您删除当前小程序，重新搜索打开哦！",
        showCancel: false
      });
    });
  }
};

export default updateManager;
