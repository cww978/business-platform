Page({
  data: {
    modalContent: '同意执行删除申请',
    modalTitle: '审核意见确认',
    modalButtonText: '同 意',
    showModal: false,
    rejectValue: '',
    objectives: [
      { id: 1, text: '新产品调研', active: false },
      { id: 2, text: '老产品调研', active: false }
    ]
  },
  // 驳回
  reject() {
    this.setData({
      modalTitle: '审核意见填写',
      modalContent: '',
      modalButtonText: '驳 回',
      showModal: true
    })
  },
  // 输入驳回信息
  inputReject(e) {
    this.setData({ rejectValue: e.value })
  },
  // 同意
  agree() {
    this.setData({
      modalTitle: '审核意见确认',
      modalContent: '同意执行删除申请',
      modalButtonText: '同 意',
      showModal: true
    })
  },
  handleModalRight() {
    this.setData({ showModal: false })
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  clickInvestigation() {
    dd.navigateTo({
      url: `/pages/common/investigationOnlyReady/investigationOnlyReady`
    })
  },
  onLoad() {
    this.setData({
      objectives: [{ id: 1, text: '新产品调研', active: false }, { id: 2, text: '老产品调研', active: false }]
    })
  }
});
