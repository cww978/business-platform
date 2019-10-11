import { selRegionStock, selSettleStock } from '/api/account'
import { dateFormat } from '/util/tool'
const app = getApp()
Page({
  data: {
    loading: false,
    realCity: 0,
    cityCode: 0,
    cityText: 0,
    isCity: false,
    yearMonth: dateFormat(new Date(), 'yyyy-MM'),
    type: ''
  },
  clickCity() {
    dd.navigateTo({
      url: `/pages/common/selectCompany/selectCompany?yearMonth=${this.data.yearMonth}&type=0`
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
      currentDate: this.data.yearMonth,
      success(res) {
        that.setData({
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
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.cityCode,
      userId: app.globalData.userInfo.userId,
      goodsinfo: '',
      ids: '' 
    }
    // 判断是否能进行盘点、结账操作
    if (this.data.yearMonth != '' && this.data.cityCode != 0) {
      if (this.data.type == 'check') {
        this.setData({ loading: true })
        selRegionStock(param).then(res => {
          this.setData({ loading: false })
          if (res.data.saveState == 1) {
            dd.confirm({
              title: '操作提示',
              content: res.data.message,
              confirmButtonText: '知道了',
              cancelButtonText: '取消'
            })
          } else {
            dd.navigateTo({ url: path })
          }
        })
      } else if (this.data.type == 'settle') {
        this.setData({ loading: true })
        selSettleStock(param).then(res => {
          this.setData({ loading: false })
          if (res.data.saveState == 1) {
            dd.confirm({
              title: '操作提示',
              content: res.data.message,
              confirmButtonText: '知道了',
              cancelButtonText: '取消'
            })
          } else {
            dd.navigateTo({ url: path })
          }
        })
      } else {  
        dd.navigateTo({ url: path })
      }
    }
  },
  onReady() {},
  onLoad(options) {
    this.setData({ type: options.type })
  },
})
