import { selActivityCode, selResourcesDetail, selActivityAccount } from '/api/programExecute'
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
  // 检验该地区是否已经锁定关账
  testAccount() {
    return new Promise(resolve => {
      selActivityAccount({ companyId: app.globalData.registration['companyId'] }).then(res => {
        if (res.data.saveState == 1) {
          dd.confirm({
            content: res.data.message,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            success: (e) => {
              if (e.confirm && res.data.saveState == 1) {
                dd.navigateBack()
              }
            }
          })
        } else {
          resolve()
        }
      })
    })
  },
  // 分配方案
  navTodec(){
    this.testAccount().then(() => {
      dd.navigateTo({
        url: './decompose/decompose'
      })
    })
  },
  // 执行方案
  navToimp(){
    this.testAccount().then(() => {
      dd.navigateTo({
        url: `/pages/common/implementation/implementation?activityType=${this.data.programmeInfo['ACTIVITYTYPE']}`
      })
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
