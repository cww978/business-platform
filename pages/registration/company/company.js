import { selProgrammeInfo } from '/api/shareHelp'
import { selActivityAccount } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    loading: true,
    userId: '',
    activityId: '',
    companyId: '',
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
  navToRec(){
    this.testAccount().then(() => {
      dd.navigateTo({
        url: './receiving/receiving'
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