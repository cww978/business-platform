import { selTobaList, selAdsgoodsList } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    list: [],
    companyId: 0,
  },
  onItemClick(e) {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    lastPage.setAdsgood(this.data.list[e.index])
    setTimeout(() => {
      dd.navigateBack()
    }, 300)
  },
  getTobaList() {
    selTobaList({ userId: app.globalData.userInfo.userId, companyId: this.data.companyId }).then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  getAdsgoodsList() {
    selAdsgoodsList({ userId: app.globalData.userInfo.userId, companyId: this.data.companyId }).then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  onLoad(options) {
    this.setData({
      companyId: options.companyId
    })
    if (options.type == 1) {
      this.getTobaList()
    } else {
      this.getAdsgoodsList()
    }
  },
});
