import { selAccounts, saveLockAccount } from '/mock/account'
Page({
  data: {
    actionType: 0,
    actionText: '无法操作',
    personId: '',
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
      yearMonth: this.data.yearMonth,
      regionCode: this.data.regionCode,
      personId: this.data.personId
    }
    if (this.data.actionType == 1) {
      saveLockAccount(param).then(res => {
        let type = res.data == 0 ? 'fail' : 'success'
        dd.navigateTo({
          url: `./result/result?type=${type}`
        })
      })
    } else {
      return 0
    }
  },
  onReady() {
    let that = this
    let param = {
      yeatMonth: this.data.yeatMonth,
      regionCode: this.data.regionCode,
      personId: this.data.personId
    }
    selAccounts(param).then(res => {
      that.setData({
        actionType: res.data.actionType,
        actionText: res.data.actionText,
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
