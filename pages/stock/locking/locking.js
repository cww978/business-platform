
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
  onTabBarTap(e) {
    const { index } = e.target.dataset
    this.setData({
      activeTab: index,
    })
  },
  // 保存
  save() {
    dd.confirm({
      content: '是否确认锁定销区',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (e) => {
        if (e.confirm) {
          this.lockAccount()
        }
      }
    })
  },
  // 锁定销区
  lockAccount() {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId
    }
    saveLockAccount(param).then(res => {
      dd.confirm({
        content: res.data.message || '操作错误',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (e) => {
          if (e.confirm) {
            dd.navigateBack()
          }
        }
      })
    })
  },
  // 查询账单
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
