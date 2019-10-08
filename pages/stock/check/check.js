import { selRegionStock, saveRegionStock } from '/api/account'
const app = getApp()
Page({
  data: {
    regionCode: '',
    top: 0,
    userId: '',
    yearMonth: '',
    products: [],
    shadow: false,
    savePerson: '',
    definitePerson: '',
    actionType: 0,
    actionText: '保存'
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
  inputNum(e) {
    let products = this.data.products
    products[e.target.dataset.index]['QTY'] = parseInt(e.detail.value)
    this.setData({ products: products })
  },
  setAdsgood(e) {
    for (let item of this.data.products) {
      if (item['ADSGOODS_ID'] == e['ADSGOODSID']) {
        dd.showToast({ content: '请不要重复添加' })
        return 0
      }
    }
    let adsgood = {
      ADSGOODS_ID: e['ADSGOODSID'],
      ADSGOODS_NAME: e['ADSGOODSNAME'],
      UNIT: e['ADSGOODSUNIT_APPLY'],
      QTY: 0,
    }
    let products = this.data.products
    products.push(adsgood)
    this.setData({ products: products })
  },
  clickAddPromotion() {
    dd.showActionSheet({
      title: '新增促销用品',
      items: ['促销烟', '促销品'],
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index == 0) {
          dd.navigateTo({
            url: `/pages/common/selectAdsgoods/selectAdsgoods?type=1&companyId=${this.data.regionCode}`
          })
        } else if (res.index == 1) {
          dd.navigateTo({
            url: `/pages/common/selectAdsgoods/selectAdsgoods?type=2&companyId=${this.data.regionCode}`
          })
        }
      },
    })
  },
  clickDelItem(e) {
    let products = this.data.products
    products.splice(e.target.dataset.index, 1)
    this.setData({ products: products })
  },
  save() {
    let products = []
    for (let item of this.data.products) {
      if (item['ADSGOODS_ID']) {
        products.push( item['ADSGOODS_ID'] + ',' + item['QTY'])
      }
    }
    products = products.join(';')
    let param = {
      companyId: this.data.regionCode,
      goodsinfo: products,
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      state: this.data.actionType,
      userId: this.data.userId
    }
    saveRegionStock(param).then(res => {
      dd.confirm({
        title: '操作提示',
        content: res.data.message || '操作错误',
        confirmButtonText: '知道了',
        cancelButtonText: '取消'
      })
    })
  },
  getRegionStocks() {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId
    }
    selRegionStock(param).then(res => {
      this.setData({
        products: res.data.lists || [],
        definitePerson: res.data.check,
        savePerson: res.data.keep,
        actionType: res.data.lease
      })
    })
  },
  onReady() {
    this.getRegionStocks()
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
