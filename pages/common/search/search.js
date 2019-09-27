import { selRetailersFromCoord, selRetailersByParam } from '/api/retailer'
import { gcj02tobd09 } from '/util/coord.js'
let app = getApp()
Page({
  data: {
    value: '',
    placeholder: '请输入零售户地址、店名、专卖证号',
    address: '',
    longitude: '',
    latitude: '',
    retails: [],
    hasLocation: false
  },
  onClear() {
    this.setData({ value: '' })
  },
  onInput(value){
    this.setData({ value: value })
  },
  location() {
    return new Promise(resolve => {
      let that = this
      dd.getLocation({
        success(res){
          console.log('位置', res.address)
          that.setData({
            hasLocation: true,
            address: res.address,
            longitude: res.longitude,
            latitude: res.latitude
          })
          resolve()
        },
        fail() {
          dd.showToast({ content: '定位失败' })
        }
      })
    })
  },
  resLocationClick(){
    this.location().then(() => {
      let coord = gcj02tobd09(this.data.longitude, this.data.latitude)
      selRetailersFromCoord({ longitude: coord.lng, latitude: coord.lat }).then(res => {
        this.setData({ retails: res.data })
      })
    })
  },
  onSubmit(val) {
    if (val != '') {
      selRetailersByParam({
        userId: app.globalData.userInfo.userId,
        param: val
      }).then(res => {
        this.setData({ retails: res.data })
      })
    }
  },
  onRetailClick(e) {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    lastPage.setRetail({
      id: this.data.retails[e.index].custCode,
      name: this.data.retails[e.index].custName
    })
    dd.navigateBack()
  },
  onLoad() {
    this.location().then(() => {
      let coord = gcj02tobd09(this.data.longitude, this.data.latitude)
      selRetailersFromCoord({ longitude: coord.lng, latitude: coord.lat }).then(res => {
        this.setData({ retails: res.data })
        console.log('零售户', res.data)
      })
    })
  },
});
