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
    let key = `allResources[${e.target.dataset.index}].checked`
    this.setData({ [key]: e.detail.value })
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
        let type = 'success'
        let message = '确认收货成功!'
        if (res.data) {
          type = 'success'
          message = '确认收货成功!'
        } else {
          type = 'fail'
          message = '收货失败!'
        }
        dd.redirectTo({
          url: `/pages/common/result/result?type=${type}&title=${message}`
        })
      })
    } 
  },
  // 获取用户所属终端公司
  getUserTerminal() {
    selUserTerminalCompany({ userId: app.globalData.userInfo.userId }).then(res => {
      this.setData({
        terminalCompanyId: res.data[0].terminalCompanyId,
        terminalCompanyName: res.data[0].terminalCompanyName
      })
      this.getResourcesDistribution()
    })
  },
  // 获取资源
  getResourcesDistribution() {
    selResourcesDistribution({
      terminalCompanyId: this.data.terminalCompanyId,
      activityId: this.data.activityId 
    }).then(res => {
      let list = []
      for (let item of res.data) {
        let has = false
        for (let reg of list) {
          if (reg.regId == item.regId) {
            has = true
          }
        }
        if (has == false) {
          list.push({ regId: item.regId, state: item.state, standard: item.standard, resources: [] })
        }
      }
      for (let item of res.data) {
        for (let reg of list) {
          if (reg.regId == item.regId) {
            reg.resources.push({
              adsgoodsId: item.adsgoodsId,
              unit: item.unit,
              qty: item.qty,
              adsgoodsName: item.adsgoodsName
            })
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
