import { selProgrammeInfo } from '/api/shareHelp'
import { selActivityAccount } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    modalContent: '',
    showModal: false,
    loading: true,
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
      console.log('programmeInfo', res.data.programmeDetail[0])
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
  onLoad(options) {}
})