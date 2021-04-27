import Taro from "@tarojs/taro";
import { showLoad, hideLoad, msg } from "@/utils/util";

//上传图片
export const uploadImg = (num = 9) => {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      //选择图片
      count: num,
      sizeType: ["original"],
      success: async res => {
        showLoad("上传中");
        // console.log(res.tempFilePaths)
        let paths = res.tempFilePaths;
        let imgPath = await Promise.all(
          paths.map(async e => await uploadPath(e))
        );
        // console.log(imgPath)
        hideLoad();
        resolve(imgPath); //返回图片数组
      },
      fail: err => {
        reject(err);
        console.log(err);
      }
    });
  });
};

//压缩图片
const compressImage = (path, quality = 80) => {
  return new Promise((resolve, reject) => {
    Taro.compressImage({
      src: path,
      quality,
      success: res => {
        resolve(res.tempFilePath);
      },
      fail: err => {
        reject(err);
        console.log(err);
      }
    });
  });
};

//上传接口  接口仅做示例
const uploadPath = async path => {
  // 压缩图片质量
  // Taro.compressImage && (path = await compressImage(path))
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: "",
      filePath: path,
      name: "",
      formData: {},
      header: {},
      success: res => {
        let data = JSON.parse(res.data);
        if (data.State == 1) {
          resolve("图片地址");
        } else {
          reject(err);
          msg("上传图片失败，请重试");
        }
      },
      fail: err => {
        reject(err);
        msg("上传图片失败，请重试");
      }
    });
  });
};
