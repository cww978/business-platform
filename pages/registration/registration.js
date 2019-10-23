import { selProgramExecuteRole } from '/api/role'
let app = getApp()
Page({
  data: {
    loading: true
  },
  onReady() {
    dd.redirectTo({
      url: `/pages/common/selectCompanyActivity/selectCompanyActivity?type=${app.globalData.registration['userType']}`
    })
  },
  onLoad() {}
})
