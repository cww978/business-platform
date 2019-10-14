import { selSettleStock, saveSettleStock } from '/api/account'

const app = getApp()
Page({
  data: {
    lease: 0,
    showConfirm: false,
    loading: true,
    isSave: false,
    isConfirm: false,
    regionCode: '',
    top: 0,
    userId: '',
    yeatMonth: '',
    products: [],
    savePerson: '',
    definitePerson: ''
  },
  onTabBarTap(e) {
    const { index } = e.target.dataset
    this.setData({
      activeTab: index,
    })
  },
  // 结账、确认请求
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
      dd.confirm({
        title: '操作提示',
        content: res.data.message || '操作错误',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (e) => {
          if (e.confirm && res.data.saveState == 1) {
            dd.navigateBack()
          }
        }
      })
    })
  },
  // 结账
  save() {
    dd.confirm({
      title: '提示',
      content: '物资数据是否正确',
      confirmButtonText: '结账',
      cancelButtonText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.settleStock(0)
        }
      }
    })
  },
  // 确认
  define() {
    dd.confirm({
      title: '提示',
      content: '核对数据是否正确',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.settleStock(1)
        }
      }
    })
  },
  // 获取促销数据
  getSettleStocks() {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId
    }
    selSettleStock(param).then(res => {
      let isConfirm = false
      let isSave = false
      let showConfirm = false
      if (res.data.lease == 1 && res.data.keep) {
        showConfirm = true
      } else {
        showConfirm = false
      }
      // 判断是否已经保存和确认
      if (res.data.check) {
        isConfirm = true
        isSave = true
      }
      if (res.data.keep) {
        isSave = true
      }
      this.setData({
        showConfirm: showConfirm,
        loading: false,
        isConfirm: isConfirm,
        isSave: isSave,
        products: res.data.products,
        definitePerson: res.data.check,
        savePerson: res.data.keep,
        lease: res.data.lease
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