import { selRegionStock, selSettleStock } from '/api/account'
import { dateFormat } from '/util/tool'
import { selAccountCompanyTree } from '/api/account'
const app = getApp()
Page({
  data: {
    showModal: false,
    modalContent: '',
    loading: false,
    realCity: 0,
    cityCode: 0,
    cityText: 0,
    isCity: false,
    areaList: [],
    yearMonth: dateFormat(new Date(), 'yyyy-MM'),
    type: ''
  },
  clickCity() {
    dd.navigateTo({
      url: `/pages/common/selectCompany/selectCompany?yearMonth=${this.data.yearMonth}&type=0`
    })
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  handleModalRight() {
    this.setData({ showModal: false })
  },
  confirmCompany(e) {
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
        if (res.date != void 0) {
          that.setData({ 'yearMonth': res.date })
          that.getAccountCompanyTree()
        }
      }
    })
  },
  getAccountCompanyTree() {
    this.setData({ loading: true })
    selAccountCompanyTree({
      userId: app.globalData.userInfo.userId,
      month: this.data.yearMonth.split('-')[1],
      year: this.data.yearMonth.split('-')[0]
    }).then(res => {
      this.setData({ areaList: res.data, loading: false })
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
            this.setData({ showModal: true, modalContent: res.data.message })
          } else {
            dd.navigateTo({ url: path })
          }
        })
      } else if (this.data.type == 'settle') {
        this.setData({ loading: true })
        selSettleStock(param).then(res => {
          this.setData({ loading: false })
          if (res.data.saveState == 1) {
            this.setData({ showModal: true, modalContent: res.data.message })
          } else {
            dd.navigateTo({ url: path })
          }
        })
      } else {  
        dd.navigateTo({ url: path })
      }
    }
  },
  onReady() {
    this.getAccountCompanyTree()
  },
  onLoad(options) {
    this.setData({ type: options.type })
  },
})
