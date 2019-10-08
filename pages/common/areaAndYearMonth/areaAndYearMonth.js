import { selCitys } from '/mock/account'
Page({
  data: {
    realCity: 0,
    cityCode: 0,
    cityText: 0,
    isCity: false,
    yearMonth: '',
    isYear: false,
    type: ''
  },
  clickCity() {
    dd.navigateTo({
      url: '/pages/common/selectCompany/selectCompany'
    })
  },
  setCityCode(e) {
    this.setData({
      realCity: e.realCity,
      cityCode: e.city.code,
      cityText: e.city.name,
      isCity: true
    })
  },
  testTimeClick() {
    let that = this
    dd.datePicker({
      format: 'yyyy-MM',
      success(res) {
        that.setData({
          isYear: true,
          'yearMonth': res.date
        })
      }
    })
  },
  clickDefine() {
    let path = ''
    switch (this.data.type) {
      case 'locking' : path = `/pages/stock/locking/locking?regionCode=${this.data.cityCode}&yearMonth=${this.data.yearMonth}`
        break
      case 'check' : path = `/pages/stock/check/check?regionCode=${this.data.cityCode}&yearMonth=${this.data.yearMonth}`
        break
      case 'settle' : path = `/pages/stock/settle/settle?regionCode=${this.data.cityCode}&yearMonth=${this.data.yearMonth}`
        break
      default : path = `/pages/stock/locking/locking?regionCode=${this.data.cityCode}&yearMonth=${this.data.yearMonth}`
    }
    if (this.data.yearMonth != '' && this.data.cityCode != 0) {
      dd.navigateTo({ url: path })
    }
  },
  onReady() {},
  onLoad(options) {
    this.setData({ type: options.type })
  },
})
