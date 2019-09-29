import { selResourcesDistribution, saveConfirmResources } from '/api/programExecute'
import { selUserTerminalCompany } from '/api/shareHelp'
let app = getApp()
Page({
  data: {
    activityId: '',
    companyId: '',
    allResources: [],
    terminalCompanyId: '',
    terminalCompanyName: ''
  },
  onCheckResource(e) {
    let resources = this.data.allResources
    resources[e.target.dataset.index].checked = e.detail.value
    this.setData({ allResources: resources })
  },
  // 到货确定
  save() {
    let ids = []
    for (let item of this.data.allResources) {
      if (item.checked == true) {
        ids.push(item.regId)
      }
    }
    if (ids.length <= 0) {
      dd.showToast({ content: '请选择一个执行单在确认' })
    } else {
      saveConfirmResources({ regIdStr: ids.join(',') }).then(res => {
        let type = res.data == 0 ? 'fail' : 'success'
        dd.navigateTo({
          url: `./result/result?type=${type}`
        })
      })
    }
  },
  getUserTerminal() {
    selUserTerminalCompany({ userId: app.globalData.userInfo.userId }).then(res => {
      console.log('terminalCompanyId', res.data)
      this.setData({
        terminalCompanyId: res.data[0].terminalCompanyId,
        terminalCompanyName: res.data[0].terminalCompanyName
      })
      this.getResourcesDistribution()
    })
  },
  getResourcesDistribution() {
    selResourcesDistribution({ terminalCompanyId: this.data.terminalCompanyId }).then(res => {
      let list = []
      for (let item of res.data) {
        let has = false
        for (let reg of list) {
          if (reg.regId == item.regId) {
            has = true
          }
        }
        if (has == false) {
          list.push({ regId: item.regId, standard: item.standard, resources: [] })
        }
      }
      for (let item of res.data) {
        for (let reg of list) {
          if (reg.regId == item.regId) {
            reg.resources.push({ adsgoodsId: item.adsgoodsId, unit: item.unit, qty: item.qty, adsgoodsName: item.adsgoodsName })
          }
        }
      }
      this.setData({ allResources: list })
    })
  },
  onReady() {
    this.getUserTerminal()
  },
  onLoad() {
    this.setData({
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId']
    })
  }
})
