import { selSettleStock, saveSettleStock } from '/api/account'

const app = getApp()
Page({
  data: {
    loading: true,
    regionCode: '',
    top: 0,
    userId: '',
    yeatMonth: '',
    products: [],
    savePerson: '',
    definitePerson: '',
    actionType: 0
  },
  onTabBarTap(e) {
    const { index } = e.target.dataset
    this.setData({
      activeTab: index,
    })
  },
  settleStock(state) {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId,
      goodsinfo: '0',
      state: state
    }
    saveSettleStock(param).then(res => {
      console.log('结账', res.data)
      dd.confirm({
        title: '操作提示',
        content: res.data.message || '操作错误',
        confirmButtonText: '知道了',
        cancelButtonText: '取消'
      })
    })
  },
  save() {
    this.settleStock(0)
  },
  define() {
    this.settleStock(1)
  },
  getSettleStocks() {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId
    }
    selSettleStock(param).then(res => {
      this.setData({
        loading: false,
        products: res.data.products,
        definitePerson: res.data.check,
        savePerson: res.data.keep,
        actionType: res.data.lease
      })
    })
  },
  onReady() {
    this.getSettleStocks()
  },
  onLoad(options) {
    this.setData({
      regionCode: options.regionCode,
      yearMonth: options.yearMonth,
      userId: app.globalData.userInfo.userId
    })
  }
})
