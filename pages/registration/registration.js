import { selUserCompany } from '/mock/programme'
let app = getApp()
Page({
  data: {},
  switchUserType(type) {
    switch(type){
      // 根据操作人员类型跳转至不同的操作页面
      case 3 :
        dd.redirectTo({
          url: '/pages/registration/team/team'
        })
        break
      case 2 :
        dd.redirectTo({
          url: '/pages/registration/company/company'
        })
        break
      case 1 :
        dd.redirectTo({
          url: '/pages/registration/salesman/salesman'
        })
        break
      default: break
    }
  },
  onReady() {
    let that = this
    selUserCompany().then(res => {
      console.log('用户类型', res.data)
      app.globalData.registration = {
        userType: res.data.userType,
        companyCode: res.data.companyCode,
        companyName: res.data.companyName
      }
      that.switchUserType(res.data.userType)
    })
  },
  onLoad() {}
})
