import { selActivityCode } from '/api/programExecute'
import { selProgramExecuteRole } from '/api/role'
const app = getApp()
Page({
  data: {
    realCity: 0,
    cityCode: 0,
    cityText: 0,
    loading: false,
    isCity: false,
    programmes: [],
    programmeIndex: 0,
    isActivityId: false
  },
  switchUserType(type) {
    let programmeId = this.data.programmes[this.data.programmeIndex]['ACTIVITY_ID']
    let cityCode = this.data.cityCode
    type = parseInt(type)
    switch(type){
      // 根据操作人员类型跳转至不同的操作页面
      case 3 :
        dd.navigateTo({
          url: `/pages/registration/team/team?programmeId=${programmeId}&cityCode=${cityCode}`
        })
        break
      case 2 :
        dd.navigateTo({
          url: `/pages/registration/company/company?programmeId=${programmeId}&cityCode=${cityCode}`
        })
        break
      case 1 :
        dd.navigateTo({
          url: `/pages/registration/salesman/salesman?programmeId=${programmeId}&cityCode=${cityCode}`
        })
        break
      default: break
    }
  },
  clickCity() {
    dd.navigateTo({
      url: '/pages/common/selectCompany/selectCompany?type=1'
    })
  },
  setCityCode(e) {
    this.setData({
      realCity: e.realCity,
      cityCode: e.city.code,
      cityText: e.city.name,
      isCity: true,
      isActivityId: false,
      loading: true,
    })
    setTimeout(() => {
      this.getProgrammeCodes()
    }, 300)
  },
  // 获取方案编码
  getProgrammeCodes() {
    selActivityCode({
      userId: app.globalData.userInfo.userId,
      companyId: this.data.cityCode
    }).then(res => {
      let isActivityId = false
      if (res.data.length > 0) {
        isActivityId = true
      } else {
        setTimeout(() => {
          dd.confirm({
            title: '操作提示',
            content: '该地区下没有活动方案',
            confirmButtonText: '知道了',
            cancelButtonText: '取消'
          })
        },0)
      }
      this.setData({
        isActivityId: isActivityId,
        programmes: res.data,
        loading: false
      })
    })
  },
  programmeChange(e) {
    this.setData({ programmeIndex: e.detail.value })
  },
  clickDefine() {
    app.globalData.registration['activityId'] = this.data.programmes[this.data.programmeIndex]['ACTIVITY_ID']
    app.globalData.registration['realCity'] = this.data.realCity
    app.globalData.registration['companyId'] = this.data.cityCode
    this.switchUserType(app.globalData.registration['userType'])
  },
  onLoad() {
    let userId = app.globalData.userInfo.userId
    selProgramExecuteRole({ userId: userId }).then(res => {
      console.log('用户类型', res.data)
      app.globalData.registration['userType'] = res.data.type
    })
  },
});
