import { selActivityCode, selResourcesDetail } from '/api/programExecute'
import { selProgrammeInfo } from '/api/shareHelp'
import { activitType } from '/constant/other.js'
const app = getApp()
Page({
  data: {
    userId: '',
    activitTypes: activitType, // 活动类型
    programmeType: '',
    resources: [], // 资源
    programmeInfo: {}
  },
  getProgrammeInfo() {
      // 查询方案信息
    selProgrammeInfo({
      userId: this.data.userId,
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId']
    }).then(res => {
      console.log('programmeInfo', res.data.programmeDetail[0])
      this.setData({ programmeInfo: res.data.programmeDetail[0] })
      // 查询资源明细
      selResourcesDetail({
        userId: this.data.userId,
        companyId: app.globalData.registration['companyId'],
        activityId: app.globalData.registration['activityId'],
        executeType: 1,
      }).then(res => {
        this.setData({ resources: res.data })
      })
    })
  },
  navTodec(){
    let activityId = app.globalData.registration['activityId']
    if (activityId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: './decompose/decompose'
      })
    }
  },
  navToimp(){
    let activityId = app.globalData.registration['activityId']
    let activityType = this.data.programmeInfo['ACTIVITYTYPE']
    if (activityId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: `./implement/implement?activityType=${activityType}`
      })
    }
  },
  onReady() {
    this.getProgrammeInfo()
  },
  onLoad(options) {
    this.setData({
      userId: app.globalData.userInfo.userId
    })
  }
})
