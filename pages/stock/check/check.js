import { selSettleStock, saveSettleStock, defineSettleStock } from '/mock/account'
Page({
  data: {
    regionCode: '',
    top: 0,
    personId: '',
    yeatMonth: '',
    products: [],
    shadow: false,
    savePerson: '',
    definitePerson: '',
    actionType: 0,
    actionText: '无法操作',
    showPromotion: false,
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
  clickAddPromotion() {
    this.setData({ showPromotion: true })
  },
  promotionCancel() {
    this.setData({ showPromotion: false })
  },
  save() {
    let param = {
      yearMonth: this.data.yearMonth,
      regionCode: this.data.regionCode,
      personId: ''
    }
    if (this.data.actionType == 1) {
      saveSettleStock(param).then(res => {
        let type = res.data == 0 ? 'fail' : 'success'
        dd.navigateTo({
          url: `./result/result?type=${type}`
        })
      })
    } else if (this.data.actionType == 2) {
      defineSettleStock(param).then(res => {
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
      personId: this.data.personId,
      regionCode: this.data.regionCode
    }
    selSettleStock(param).then(res => {
      that.setData({
        products: res.data.products,
        actionType: res.data.actionType,
        actionText: res.data.actionText,
        definitePerson: res.data.definitePerson,
        savePerson: res.data.savePerson
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
