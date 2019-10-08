import { selResourcesDetail, saveResolveCompany } from '/api/programExecute'
import { selterminalCompany } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    companyId: 0,
    activityId: 0,
    terminals: [],
    terminalIndex: 0,
    resources: [],
    standard: ''
  },
  inputTextarea(e) {
    this.setData({ standard: e.detail.value })
  },
  inputSplit(e) {
    let index = e.target.dataset.index
    let inputValue = e.detail.value
    let resources = this.data.resources
    resources[index].split = inputValue
    this.setData({
      resources: resources
    })
  },
  terminalPickerChange(e) {
    this.setData({ terminalIndex: e.detail.value })
  },
  // 获取资源明细
  getResources() {
    selResourcesDetail({
      userId: app.globalData.userInfo.userId,
      activityId: this.data.activityId,
      companyId: this.data.companyId,
      executeType: 1
    }).then(res => {
      this.setData({ resources: res.data })
    })
  },
  save() {
    let that = this
    let resources = []
    for (let item of this.data.resources) {
      resources.push(item.ADSGOODS_ID + ',' + item.split)
    }
    let params = {
      userId: app.globalData.userInfo.userId,
      companyId: that.data.companyId,
      activityId: that.data.activityId,
      terminalCompanyId: that.data.terminals[this.data.terminalIndex].terminalCompanyId,
      personNum: 0,
      standard: that.data.standard,
      resources: resources.join(';')
    }
    saveResolveCompany(params).then(res =>{
      let type = res.data == 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `./success/success?companyName=${that.data.terminals[this.data.terminalIndex].terminalCompanyName}&type=${type}`
      })
    })
  },
  // 查询终端公司列表
  getTerminals() {
    selterminalCompany({ companyId: app.globalData.registration['realCity'] }).then(res => {
      this.setData({ terminals: res.data.filter(item => { return item != null }) })
      console.log('terminals', res.data)
    })
  },
  onReady() {
    this.getResources()
    this.getTerminals()
  },
  onLoad() {
    this.setData({
      companyId: app.globalData.registration['companyId'],
      activityId: app.globalData.registration['activityId']
    })
  },
});
