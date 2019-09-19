import { saveAccounts } from '/mock/account'
Page({
  data: {
    regionCode: '',
    top: 0,
    yeatMonth: '',
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
  onReady() {
    let that = this
    let param = {
      yeatMonth: this.data.yeatMonth,
      regionCode: this.data.regionCode
    }
    saveAccounts(param).then(res => {
      that.setData({
        joins: res.data.join,
        outs: res.data.out
      })
    })
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
      yeatMonth: options.yeatMonth
    })
  }
})
