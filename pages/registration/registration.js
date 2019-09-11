Page({
  data: {
    userType: 1
  },
  onLoad() {
    switch(this.data.userType){
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
  }
});
