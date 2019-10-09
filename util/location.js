import { gcj02tobd09 } from '/util/coord.js'
// 获取地址并将坐标转换为百度坐标系
export function getLocation() {
  return new Promise(resolve => {
    let that = this
    dd.getLocation({
      success(res){
        let coord = gcj02tobd09(res.longitude, res.latitude)
        res.longitude = coord.lng
        res.latitude = coord.lat
        resolve(res)
      },
      fail() {
        dd.showToast({ content: '定位失败' })
      }
    })
  })
}