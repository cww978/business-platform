import { selActivityCode, selResourcesDetail } from '/api/programExecute'
import { selProgrammeInfo } from '/api/shareHelp'
import { activitType } from '/constant/other.js'
const app = getApp()
Page({
  data: {
    userId: '',
    loading: true,
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
      this.setData({ programmeInfo: res.data.programmeDetail[0] })
      // 查询资源明细
      selResourcesDetail({
        userId: this.data.userId,
        companyId: app.globalData.registration['companyId'],
        activityId: app.globalData.registration['activityId'],
        executeType: 1,
      }).then(res => {
        this.setData({ resources: res.data, loading: false })
      })
    })
  },
  // 分配方案
  navTodec(){
    dd.navigateTo({
      url: './decompose/decompose'
    })
  },
  // 执行方案
  navToimp(){
    dd.navigateTo({
      url: `/pages/common/implementation/implementation?activityType=${this.data.programmeInfo['ACTIVITYTYPE']}`
    })
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
