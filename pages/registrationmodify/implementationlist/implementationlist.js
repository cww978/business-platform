import { selSalesManRegList } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    loading: true,
    modalContent: '你确定要删除该条执行单吗?',
    modalRightText: '确认删除',
    showModal: false,
    list: []
  },
  // 删除执行单
  delete() {
    this.setData({ showModal: true })
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
  },
  // 查询执行单列表
  getSalesManRegList() {
    selSalesManRegList({
      userId: app.globalData.userInfo.userId,
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId'],
      regCode: ''
    }).then((res) => {
      console.log('执行单', res.data)
      this.setData({ list: res.data })
    })
  },
  onReady() {
    this.getSalesManRegList()
  },
  onLoad() {},
});
