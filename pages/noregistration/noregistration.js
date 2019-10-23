import { selProgramExecuteRole } from '/api/role'
const app = getApp()
Page({
  data: {
    loading: true
  },
  // 检测是否有权限执行操作非方案执行登记
  check() {
    selProgramExecuteRole({ userId: app.globalData.userInfo.userId }).then(res => {
      // 允许中烟业务员和终端公司业务员进行操作
      if (res.data.type != 1 && res.data.type != 3) {
        dd.alert({
          title: '提示',
          content: '没有相关操作权限',
          buttonText: '知道了',
          success: () => {
            dd.navigateBack()
          },
        })
      } else {
        dd.redirectTo({
          url: `/pages/noregistration/implementation/implementation?userType=${res.data.type}`
        })
      }
    })
  },
  onReady() {
    this.check()
  },
  onLoad() {}
})
