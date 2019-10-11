import { selTobaList, selAdsgoodsList } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    list: [],
    companyId: 0,
    keyword: '',
    showType: 1,
    tobaTypes: [
      { text: '市场营销烟', active: true, value: 1 },
      { text: '品吸烟', active: false, value: 2 },
      { text: '试制烟', active: false, value: 3 }
    ]
  },
  // 输入确定
  handleSubmit() {
    if (this.data.showType == 1) {
      this.getTobaList()
    } else {
      this.getAdsgoodsList()
    }
  },
  // 取消搜索
  handleCancel() {
    this.setData({ keyword: '' })
  },
  handleClear() {
    this.setData({ keyword: '' })
  },
  handleInput(value) {
    this.setData({ keyword: value })
  },
  // 切换烟的类型
  checkTobaType(e) {
    let tobaTypes = this.data.tobaTypes
    for (let item of tobaTypes) {
      item.active = false
    }
    tobaTypes[e.target.dataset.index].active = true
    this.setData({
      tobaTypes: tobaTypes
    })
    this.getTobaList()
  },
  // 点击选中烟
  onItemClick(e) {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    lastPage.setAdsgood(this.data.list[e.index])
    setTimeout(() => {
      dd.navigateBack()
    }, 300)
  },
  // 获取样烟列表
  getTobaList() {
    let type = 1
    for (let item of this.data.tobaTypes) {
      if (item.active) {
        type = item.value
      }
    }
    selTobaList({
        userId: app.globalData.userInfo.userId,
        companyId: this.data.companyId,
        keyword: this.data.keyword,
        tobaType: type
      }).then(res => {
        console.log('样烟列表', res.data)
        this.setData({ list: res.data })
    })
  },
  // 获取促销品
  getAdsgoodsList() {
    selAdsgoodsList({
        userId: app.globalData.userInfo.userId,
        companyId: this.data.companyId,
        keyword: this.data.keyword
      }).then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  onLoad(options) {
    this.setData({
      tobaTypes: [
        { text: '市场营销烟', active: true, value: 1 },
        { text: '品吸烟', active: false, value: 2 },
        { text: '试制烟', active: false, value: 3 }
      ],
      companyId: options.companyId,
      showType: options.type
    })
    if (options.type == 1) {
      this.getTobaList()
    } else {
      this.getAdsgoodsList()
    }
  },
});
