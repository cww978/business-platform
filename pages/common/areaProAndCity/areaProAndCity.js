import { selAreaByUser, selProvByArea, selCityByProv } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    isCity: false,
    isProv: false,
    userId: '',
    citys: [], //对象
    cityIndex: 0,
    areas: [],
    areaIndex: 0,
    provs: [],
    provIndex: 0
  },
  // 保存执行
  save() {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    let parma = {
      area: { name: this.data.areas[this.data.areaIndex].areaName, code: this.data.areas[this.data.areaIndex].areaCode },
      prov: { name: this.data.provs[this.data.provIndex].provName, code: this.data.provs[this.data.provIndex].provCode },
      city: { name: this.data.citys[this.data.cityIndex].cityName, code: this.data.citys[this.data.cityIndex].cityCode }
    }
    try {
      lastPage.setCityCode(parma)
      console.log('区域省份地市编码', parma)
    } catch (error) {
      console.error('前一个页面没有设置方法：setCityCode')
    }
    setTimeout(() => {
      dd.navigateBack()
    }, 200)
  },
  areaChanged(e) {
    let userId = this.data.userId
    this.setData({
      areaIndex: e.detail.value
    })
    let that = this
    selProvByArea({
      userId: userId,
      areaCode: that.data.areas[that.data.areaIndex].areaCode
    }).then(res2 => {
      that.setData({
        provIndex: 0,
        isProv: true,
        provs: res2.data
      })
      selCityByProv({
        userId: userId,
        provCode: that.data.provs[that.data.provIndex].provCode
      }).then(res3 => {
        that.setData({
          isCity: true,
          cityIndex: 0,
          citys: res3.data
        })
      })
    })
  },
  provChanged(e) {
    let userId = this.data.userId
    this.setData({
      provIndex: e.detail.value
    })
    let that = this
    selCityByProv({
      userId: userId,
      provCode: that.data.provs[that.data.provIndex].provCode
    }).then(res3 => {
      that.setData({
        isCity: true,
        cityIndex: 0,
        citys: res3.data
      })
    })
  },
  cityChanged(e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },
  onReady() { 
    let that = this
    let userId = this.data.userId
    // 获取区域
    selAreaByUser({ userId: userId }).then(res1 => {
      that.setData({ areas: res1.data })
    })
  },
  onLoad(options) {
    this.setData({
      userId: app.globalData.userInfo.userId
    })
  }
})
