import { selProgrammeInfo } from '/api/shareHelp'
import { activitType } from '/constant/other.js'
const app = getApp()
Page({
  data: {
    loading: true,
    userId: '',
    activityId: 0,
    activitTypes: activitType, // 活动类型
    companyId: 0,
    resources: [], // 资源
    programmeInfo: {}
  },
  getProgrammeInfo() {
    // 查询方案信息
    selProgrammeInfo({
      userId: this.data.userId,
      activityId: this.data.activityId,
      companyId: this.data.companyId
    }).then(res => {
      this.setData({ programmeInfo: res.data.programmeDetail[0], loading: false })
    })
  },
  // 执行方案
  navToImp(){
    let activityType = this.data.programmeInfo['ACTIVITYTYPE']
    let activityId = this.data.activityId
    if (activityId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: `/pages/common/implementation/implementation?activityType=${activityType}`
      })
    }
  },
  onReady() {
    this.getProgrammeInfo()
  },
  onLoad(options) {
    this.setData({
      userId: app.globalData.userInfo.userId,
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId']
    })
  }
})