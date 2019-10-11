
import { selAccounts, saveLockAccount } from '/api/account'
const app = getApp()
Page({
  data: {
    loading: true,
    userId: '',
    regionCode: '',
    top: 0,
    yearMonth: '',
    joins: [],
    outs: [],
    tabs: ['销区入库单', '销区执行登记单'],
    activeTab: 0,
    shadow: false
  },
  onPageScroll(e) {
    const { scrollTop } = e
    let shadow = false
    if (scrollTop > 10) {
      shadow = true
    } else {
      shadow = false
    }
    this.setData({
      shadow
    })
  },
  onInAccountClick(e) {
    let id = this.data.joins[e.target.dataset.index].id
    dd.navigateTo({
      url: `./detail/detail?id=${id}`
    })
  },
  onOutAccountClick(e) {
    let id = this.data.outs[e.target.dataset.index].id
    dd.navigateTo({
      url: `./detail/detail?id=${id}`
    })
  },
  onTabBarTap(e) {
    const { index } = e.target.dataset
    this.setData({
      activeTab: index,
    })
  },
  save() {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId
    }
    saveLockAccount(param).then(res => {
      dd.confirm({
        title: '操作提示',
        content: res.data.message || '操作错误',
        confirmButtonText: '知道了',
        cancelButtonText: '取消'
      })
    })
  },
  getAccounts() {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId
    }
    selAccounts(param).then(res => {
      console.log('关账', res.data)
      this.setData({
        loading: false,
        joins: res.data.AccountsIn,
        outs: res.data.AccountsOut
      })
    })
  },
  onReady() {
    this.getAccounts()
  },
  onLoad(options) {
    dd.getSystemInfo({
      success: (res) => {
        if (res.statusBarHeight && res.titleBarHeight) {
          this.setData({
            top: res.statusBarHeight + res.titleBarHeight,
          })
        }
      }
    })
    this.setData({
      regionCode: options.regionCode,
      yearMonth: options.yearMonth,
      userId: app.globalData.userInfo.userId
    })
  }
})
