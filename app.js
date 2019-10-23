import { SERVER_URL } from '/constant/SERVER.js'
App({
  globalData: {
    programmeDetail: null, // 方案执行功能需要的全局变量
    userInfo: null,
    childMenus: [],
    systemInfo: dd.getSystemInfoSync(),
    registration: {
      activityId: '',
      companyId: '',
      userType: '',
      realCity: ''
    },
    domain: SERVER_URL
  },
  onLaunch(options) {}
})
