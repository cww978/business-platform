import { selProgramExecuteRole } from '/api/role'
const app = getApp()
Page({
  data: {
    loading: true,
    modalContent: '很遗憾，你没有权限访问',
    modalRightText: '确 定',
    showModal: false
  },
  handleModalRight() {
    dd.navigateBack()
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  onLoad() {
    selProgramExecuteRole({ userId: app.globalData.userInfo.userId }).then(res => {
      console.log('方案执行用户类型', res.data)
      const type = res.data.type
      app.globalData.registration['userType'] = type
      // 只允许中烟业务员和终端公司业务员查看
      if(type == 1 || type == 3) {
        dd.redirectTo({
          url: `/pages/common/selectCompanyActivity/selectCompanyActivity?type=0`
        })
      } else {
        this.setData({ showModal: true })
      }
    })
  },
});
