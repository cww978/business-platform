import { selSalesManRegList, delRegApply } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    loading: true,
    modalContent: '你确定要删除该条执行单吗?',
    modalRightText: '确认删除',
    showModal: false,
    list: [],
    deleteId: 0,
  },
  // 删除执行单
  delete(e) {
    this.setData({ showModal: true, deleteId: e.target.dataset.id })
  },
  // 修改执行单
  openEdit(e) {
    dd.navigateTo({
      url: `/pages/registrationmodify/implementationEdit/implementationEdit?id=${e.target.dataset.id}`
    })
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  handleModalRight() {
    this.setData({ showModal: false })
    this.deleteRegApply(this.data.deleteId)
  },
  deleteRegApply(id) {
    delRegApply({ regId: id }).then(res => {
      this.getSalesManRegList()
    })
  },
  // 查询执行单列表
  getSalesManRegList() {
    return new Promise((resolve, reject) => {
      selSalesManRegList({
        userId: app.globalData.userInfo.userId,
        activityId: app.globalData.registration['activityId'],
        companyId: app.globalData.registration['companyId'],
        regCode: ''
      }).then(res => {
        console.log('执行单', res.data)
        this.setData({ list: res.data })
        resolve()
      }).catch(error => {
        reject()
      })
    })
  },
  onShow() {
    this.getSalesManRegList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getSalesManRegList().then(() => {
      dd.stopPullDownRefresh()
    }).catch(() => {
      dd.stopPullDownRefresh()
    })
  },
  onLoad() {},
});
