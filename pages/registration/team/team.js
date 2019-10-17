import { selProgrammeInfo } from '/api/shareHelp'
import { selActivityAccount } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    loading: true,
    userId: '',
    activityId: 0,
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
  // 执行方案
  navToImp(){
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
      userId: app.globalData.userInfo.userId,
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId']
    })
  }
})