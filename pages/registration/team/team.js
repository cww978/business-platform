import { selProgrammeInfo } from '/api/shareHelp'
import { selActivityAccount } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    showModal: false,
    modalContent: '',
    loading: true,
    resources: [], // 资源
    programmeInfo: {}
  },
  handleModalRight() {
    dd.navigateBack()
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  getProgrammeInfo() {
    // 查询方案信息
    selProgrammeInfo({
      userId: app.globalData.userInfo.userId,
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId']
    }).then(res => {
      this.setData({ programmeInfo: res.data.programmeDetail[0], loading: false })
    })
  },
  // 检验该地区是否已经锁定关账
  testAccount() {
    return new Promise(resolve => {
      selActivityAccount({ companyId: app.globalData.registration['companyId'] }).then(res => {
        if (res.data.saveState == 1) {
          this.setData({ showModal: true, modalContent: res.data.message })
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
  onLoad(options) {}
})