Page({
  data: {
    loading: true,
    modalContent: '你确定要删除该条执行单吗?',
    modalRightText: '确认删除',
    showModal: false
  },
  delete() {
    this.setData({ showModal: true })
  },
  openEdit() {
    dd.navigateTo({
      url: `/pages/registrationmodify/implementationEdit/implementationEdit`
    })
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  handleModalRight() {
    this.setData({ showModal: false })
  },
  onLoad() {},
});
