import { getUserInfo } from './api/user'
App({
  globalData: {
    programmeDetail: null, // 方案执行功能需要的全局变量
    userInfo: null,
    childMenus: [],
    registration: {
      activityId: '',
      companyId: '',
      userType: '',
      realCity: ''
    }
  },
  // 更新并保存个人信息
  updateUserInfo(){
    // 获取本地保存的用户信息
    let app = this
    dd.getStorage({
      key: 'userInfo',
      success: function(res) {
        // 本地是否保存了用户信息
        if (res.data) {
          app.globalData.userInfo = res.data
        } else {
          // 获取授权码保存个人信息
          dd.getAuthCode({
            success:function(res){
              getUserInfo(res).then((data) => {
                dd.setStorage('userInfo', data)
                app.globalData.userInfo = data
                console.info('authcode', res)
              })
            }
          })
        }
      }
    })
  },
  onLaunch(options) {
    this.updateUserInfo()
  }
})
