import { getUserInfo } from './api/user'
App({
  globalData: {
    userInfo: null
  },
  onLaunch(options) {
    // 获取本地保存的用户信息
    dd.getStorage({
      key: 'userInfo',
      success: function(res) {
        // 本地是否保存了用户信息
        if (res.data) {
          this.globalData.userInfo = res.data
        } else {
          // 获取授权码保存个人信息
          dd.getAuthCode({
            success:function(res){
              getUserInfo(res).then((data) => {
                dd.setStorage('userInfo', data)
                this.globalData.userInfo = data
                console.info('authcode', res)
              })
            }
          })
        }
      }
    })
  }
})
