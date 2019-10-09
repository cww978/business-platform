import { selSalesArea } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    loading: false,
    isCity: false,
    isProv: false,
    citys: [], //对象
    cityIndex: 0,
    areas: [],
    areaIndex: 0,
    provs: [],
    provIndex: 0,
    allProvs: [], // 所有省份列表
    allCitys: [] // 所有地市列表
  },
  // 保存执行
  save() {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    let city = null
    // 判断是否拥有下级地市
    if (this.data.citys.length <= 0) {
      city = { name: this.data.provs[this.data.provIndex]['REAL_NAME'], code: this.data.provs[this.data.provIndex]['REAL_CODE'] }
    } else {
      city = { name: this.data.citys[this.data.cityIndex]['REAL_NAME'], code: this.data.citys[this.data.cityIndex]['REAL_CODE'] }
    }
    let parma = {
      area: { name: this.data.areas[this.data.areaIndex]['REAL_NAME'], code: this.data.areas[this.data.areaIndex]['REAL_CODE'] },
      prov: { name: this.data.provs[this.data.provIndex]['REAL_NAME'], code: this.data.provs[this.data.provIndex]['REAL_CODE'] },
      city: city
    }
    let realCity = null
    if (this.data.provs[this.data.provIndex]['LEVEL'] == 3) {
      realCity = this.data.provs[this.data.provIndex]['REAL_CODE']
    } else {
      realCity = this.data.citys[this.data.cityIndex]['REAL_CODE']
    }
    try {
      parma.realCity = realCity
      // 调用上一个页面的setCityCode方法来传递参数
      lastPage.setCityCode(parma)
      console.log('区域省份地市编码', parma)
    } catch (error) {
      console.error('前一个页面没有设置方法：setCityCode')
    }
    dd.navigateBack()
  },
  // 切换区域
  areaChanged(e) {
    this.setData({
      areaIndex: e.detail.value
    })
    // 通过当前所选的区域获取其下的省份
    let provs = this.getProvsForAreaCode(this.data.areas[this.data.areaIndex]['CODE'])
    this.setData({
      provs: provs,
      isProv: true,
      provIndex: 0,
    })
    // 通过当前所选的省份获取其下的地市
    let citys = this.getCitysForProvCode(provs[this.data.provIndex]['CODE'])
    this.setData({
      citys: citys,
      isCity: true,
      cityIndex: 0,
    })
  },
  provChanged(e) {
    this.setData({
      provIndex: e.detail.value
    })
    // 通过当前所选的省份获取其下的地市
    let citys = this.getCitysForProvCode(this.data.provs[this.data.provIndex]['CODE'])
    this.setData({
      isCity: true,
      cityIndex: 0,
      citys: citys
    })
  },
  cityChanged(e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },
  // 分割区域、省份、地市
  formatData(data) {
    let areas = []
    let provs = []
    let citys = []
    for (let item of data) {
      if (item['LEVEL'] == '2') {
        areas.push(item)
      }
      if (item['LEVEL'] == '3') {
        provs.push(item)
      }
      if (item['LEVEL'] == '4') {
        citys.push(item)
      }
    }
    this.setData({
      areas: areas,
      allProvs: provs,
      allCitys: citys
    })
  },
  getProvsForAreaCode(areaCode) {
    let provs = []
    for (let item of this.data.allProvs) {
      if (item['PARENT_CODE'] == areaCode) {
        provs.push(item)
      }
    }
    return provs
  },
  getCitysForProvCode(provCode) {
    let citys = []
    for (let item of this.data.allCitys) {
      if (item['PARENT_CODE'] == provCode) {
        citys.push(item)
      }
    }
    return citys
  },
  onReady() {
    let userId = app.globalData.userInfo.userId
    // 获取区域
    this.setData({ loading: true })
    selSalesArea({ userId: userId }).then(res => {
      this.setData({ loading: false })
      this.formatData(res.data)
    })
  },
  onLoad(options) {}
})
