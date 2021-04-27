import Taro from "@tarojs/taro";
import gcoord from "@/utils/gcoord";
import bmap from "@/utils/bmap";
import qqmap from "@/utils/qqmap";
import { msg } from "@/utils/util";

const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await Taro.getLocation({
        type: "gcj02"
      });

      // TODO 百度地图
      // let point = gcoord.gcjToBmap({
      //   lng: res.longitude,
      //   lat: res.latitude
      // });
      // let $res = await bmap.regeocoding({
      //   location: `${point.lat},${point.lng}`
      // });
      // let { result } = $res;
      // let location = {
      //   province: result.addressComponent.province,
      //   city: result.addressComponent.city,
      //   district: result.addressComponent.district,
      //   latitude:
      //     (result.pois.length && result.pois[0].point.y) || result.location.lat,
      //   longitude:
      //     (result.pois.length && result.pois[0].point.x) || result.location.lng,
      //   name:
      //     (result.pois.length && result.pois[0].name) ||
      //     result.formatted_address
      // };

      // TODO 腾讯地图
      let $res = await qqmap.regeocoding({
        location: `${res.latitude},${res.longitude}`
      });
      let { result } = $res;
      let location = {
        province: result.address_component.province,
        city: result.address_component.city,
        district: result.address_component.district,
        latitude:
          (result.pois.length && result.pois[0].location.lat) ||
          result.location.lat,
        longitude:
          (result.pois.length && result.pois[0].location.lng) ||
          result.location.lng,
        name:
          (result.pois.length && result.pois[0].title) ||
          result.formatted_addresses.recommend
      };

      resolve(location);
    } catch (error) {
      // TODO 腾信地图报错信息抛出
      msg(error.message);
      setTimeout(_ => {
        reject("位置获取失败~");
      }, 500);
    }
  });
};

export default getLocation;
