import { selRegionStock, saveRegionStock } from '/api/account'
const app = getApp()
Page({
  data: {
    lease: 0,
    showConfirm: false,
    isSave: false,
    isConfirm: false,
    loading: true,
    isDel: false, // 是否可以删除
    regionCode: '',
    userId: '',
    yearMonth: '',
    products: [],
    newProducts: [],
    savePerson: '',
    definitePerson: ''
  },
  // 设置数量
  inputNum(e) {
    let products = this.data.products
    products[e.target.dataset.index]['QTY'] = parseInt(e.detail.value)
    this.setData({ products: products })
  },
  // 设置新增促销用品
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
    let products = this.data.newProducts
    products.push(adsgood)
    this.setData({ newProducts: products })
    this.newSaveRegionStock()
  },
  // 新增
  clickAddPromotion() {
    dd.showActionSheet({
      title: '新增促销用品',
      items: ['促销烟', '促销品'],
      canelButtonText: '取消',
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
  newSaveRegionStock() {
    // 构建新增查询参数
    let products = []
    for (let item of this.data.products) {
      if (item['ADSGOODS_ID']) {
        products.push(`${item['ADSGOODS_ID']},${item['QTY']},${item['UNIT_WEIGHT']}`)
      }
    }
    products = products.join(';')
    let ids = []
    for (let item of this.data.products) {
      if (item['ADSGOODS_ID']) {
        ids.push(item['ADSGOODS_ID'])
      }
    }
    for (let item of this.data.newProducts) {
      if (item['ADSGOODS_ID']) {
        ids.push(item['ADSGOODS_ID'])
      }
    }
    ids = ids.join(';')
    this.getRegionStocks(ids, products)
  },
  // 删除促销品
  clickDelItem(e) {
    let products = this.data.products
    products.splice(e.target.dataset.index, 1)
    this.setData({ products: products })
  },
  regionStock(state) {
    let products = []
    console.log('ddd', this.data.products)
    for (let item of this.data.products) {
      if (item['ADSGOODS_ID']) {
        products.push(`${item['ADSGOODS_ID']},${item['QTY']},${item['UNIT_WEIGHT']}`)
      }
    }
    products = products.join(';')
    let param = {
      companyId: this.data.regionCode,
      goodsinfo: products,
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      state: state,
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
  // 保存促销
  save() {
    dd.confirm({
      title: '提示',
      content: '保存的物资数据是否正确',
      confirmButtonText: '确定保存',
      cancelButtonText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.regionStock(0)
        }
      }
    })
  },
  
  // 确定促销
  define() {
    dd.confirm({
      title: '提示',
      content: '保存的数据核对是否正确',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.regionStock(1)
        }
      }
    })
  },
  // 查询促销用品
  getRegionStocks(ids = '', goodsinfo = '') {
    let param = {
      year: this.data.yearMonth.split('-')[0],
      month: this.data.yearMonth.split('-')[1],
      companyId: this.data.regionCode,
      userId: this.data.userId,
      ids: ids,
      goodsinfo: goodsinfo 
    }
    this.setData({ loading: true })
    selRegionStock(param).then(res => {
      let isDel = false
      let isConfirm = false
      let isSave = false
      let showConfirm = false
      // 当需要两人操作且没有确认时允许删除
      if (res.data.lease == 1 && !res.data.check) {
        isDel = true
      }
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
      this.setData({
        showConfirm: showConfirm,
        loading: false,
        isDel: isDel,
        isConfirm: isConfirm,
        isSave: isSave,
        products: res.data.lists || [],
        definitePerson: res.data.check,
        savePerson: res.data.keep,
        lease: res.data.lease
      })
    })
  },
  onReady() {
    this.getRegionStocks()
  },
  onLoad(options) {
    this.setData({
      newProducts: [],
      regionCode: options.regionCode,
      yearMonth: options.yearMonth,
      userId: app.globalData.userInfo.userId
    })
  }
})
