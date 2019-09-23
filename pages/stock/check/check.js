import { selRegionStock, saveRegionStock, defineRegionStock } from '/mock/account'
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
    promotionType: 1
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
    products[e.target.dataset.index].num = parseInt(e.detail.value)
    this.setData({ products: products })
  },
  clickAddPromotion() {
    dd.showActionSheet({
      title: '新增促销用品',
      items: ['促销烟', '促销品'],
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index == 0) {
          this.setData({
            promotionType: 2,
            showPromotion: true 
          })
        } else if (res.index == 1) {
          this.setData({
            promotionType: 1,
            showPromotion: true 
          })
        }
      },
    })
  },
  promotionConfirm(e) {
    for (let item of this.data.products) {
      if (item.code == e.promotion.value) {
        dd.showToast({ content: '请不要重复' })
        return 0
      }
    }
    let promotion = {
      num: e.num,
      unitName: e.unit.text,
      unitType:  e.unit.value,
      name: e.promotion.text,
      code: e.promotion.value
    }
    let products = this.data.products
    products.push(promotion)
    this.setData({ products: products })
    console.log('新增促销品', e)
    this.setData({ showPromotion: false })
  },
  promotionCancel() {
    this.setData({ showPromotion: false })
  },
  clickDelItem(e) {
    let products = this.data.products
    products.splice(e.target.dataset.index, 1)
    this.setData({ products: products })
  },
  save() {
    let param = {
      yearMonth: this.data.yearMonth,
      regionCode: this.data.regionCode,
      products: this.data.products,
      personId: ''
    }
    // actionType == 1 保存操作
    // actionType == 2 确定操作
    if (this.data.actionType == 1) {
      saveRegionStock(param).then(res => {
        let type = res.data == 0 ? 'fail' : 'success'
        dd.navigateTo({
          url: `./result/result?type=${type}`
        })
      })
    } else if (this.data.actionType == 2) {
      defineRegionStock(param).then(res => {
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
    selRegionStock(param).then(res => {
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
