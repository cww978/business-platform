import { selProgrammeInfo } from '/api/shareHelp'
import { activitType } from '/constant/other.js'
const app = getApp()
Page({
  data: {
    loading: true,
    userId: '',
    activityId: '',
    companyId: '',
    activitTypes: activitType, // 活动类型
    programmeInfo: {}
  },
  getProgrammeInfo() {
    // 查询方案信息
    selProgrammeInfo({
      userId: this.data.userId,
      activityId: this.data.activityId,
      companyId: this.data.companyId
    }).then(res => {
      console.log('programmeInfo', res.data.programmeDetail[0])
      this.setData({ programmeInfo: res.data.programmeDetail[0], loading: false })
    })
  },
  navToRec(){
    let activityId = this.data.activityId
    if (activityId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: './receiving/receiving'
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