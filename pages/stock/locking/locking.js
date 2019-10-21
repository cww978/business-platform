
import { selAccounts, saveLockAccount } from '/api/account'
const app = getApp()
Page({
  data: {
    modalContent: '',
    showModal: false,
    handleModalType: 1,// 1: 确定关账，2: 确定返回
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
  // 提示框右边按钮事件
  handleModalRight() {
    this.setData({ showModal: false })
    switch(this.data.handleModalType) {
      case 1: this.lockAccount()
        break
      default: dd.navigateBack()
        break
    }
  },
  // 提示框左边按钮事件
  handleModalLeft() {
    this.setData({ showModal: false })
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
    this.setData({
      showModal: true,
      modalContent: '是否确认锁定销区',
      handleModalType: 1
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
      this.setData({
        showModal: true,
        modalContent: res.data.message,
        handleModalType: 2
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
