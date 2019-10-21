import { selProgramExecuteRole } from '/api/role'
let app = getApp()
Page({
  data: {
    loading: true
  },
  onReady() {
    selProgramExecuteRole({ userId: app.globalData.userInfo.userId }).then(res => {
      console.log('方案执行用户类型', res.data)
      app.globalData.registration['userType'] = res.data.type
      dd.redirectTo({
        url: `/pages/common/selectCompanyActivity/selectCompanyActivity?type=${res.data.type}`
      })
    })
  },
  onLoad() {}
})
