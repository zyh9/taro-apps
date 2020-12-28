import Taro from "@tarojs/taro";
import gcoord from "@/utils/gcoord";
import bmap from "@/utils/bmap";
const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await Taro.getLocation({
        type: 'wgs84'
      })
      let point = gcoord.wgsToBmap({
        lng: res.longitude,
        lat: res.latitude
      })
      let $res = await bmap.regeocoding({
        location: `${point.lat},${point.lng}`
      })
      let {
        result
      } = $res;
      let location = {
        province: result.addressComponent.province,
        city: result.addressComponent.city,
        district: result.addressComponent.district,
        latitude: (result.pois.length && result.pois[0].point.y) || result.location.lat,
        longitude: (result.pois.length && result.pois[0].point.x) || result.location.lng,
        name: (result.pois.length && result.pois[0].name) || result.formatted_address,
      }
      resolve(location)
    } catch (error) {
      reject('位置获取失败')
    }
  })
}

export default getLocation;
