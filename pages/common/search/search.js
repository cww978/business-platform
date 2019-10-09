import { selRetailersFromCoord, selRetailersByParam } from '/api/retailer'
import { getLocation } from '/util/location.js'
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
  // 清空输入
  onClear() {
    this.setData({ value: '' })
  },
  onInput(value){
    this.setData({ value: value })
  },
  // 重新定位获取附近零售户
  resLocationClick(){
    this.getRetailersFromCoord()
  },
  // 搜索零售户
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
  // 选择零售户
  onRetailClick(e) {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    lastPage.setRetail({
      id: this.data.retails[e.index].custCode,
      name: this.data.retails[e.index].custName
    })
    dd.navigateBack()
  },
  // 获取附近零售户
  getRetailersFromCoord() {
    getLocation().then(res => {
      this.setData({
        hasLocation: true,
        address: res.address,
        longitude: res.longitude,
        latitude: res.latitude
      })
      selRetailersFromCoord({ longitude: res.longitude, latitude: res.latitude }).then(res => {
        this.setData({ retails: res.data })
        console.log('零售户', res.data)
      })
    })
  },
  onReady() {
    this.getRetailersFromCoord()
  }
})
