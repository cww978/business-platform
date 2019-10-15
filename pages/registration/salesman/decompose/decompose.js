import { selResourcesDetail, saveResolveCompany } from '/api/programExecute'
import { selterminalCompany } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    loading: true,
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
    let key = `resources[${e.target.dataset.index}].split`
    this.setData({ [key]: e.detail.value })
  },
  terminalPickerChange(e) {
    this.setData({ terminalIndex: e.detail.value })
  },
  // 获取资源明细
  getResources() {
    return new Promise(resolve => {
      selResourcesDetail({
        userId: app.globalData.userInfo.userId,
        activityId: this.data.activityId,
        companyId: this.data.companyId,
        executeType: 1
      }).then(res => {
        this.setData({ resources: res.data })
        resolve()
      })
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
      let type = res.data.saveState != 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `/pages/common/result/result?type=${type}&title=${res.data.message}`
      })
    })
  },
  // 查询终端公司列表
  getTerminals() {
    selterminalCompany({ companyId: app.globalData.registration['realCity'] }).then(res => {
      this.setData({
        terminals: res.data.filter(item => { return item != null }),
        loading: false
      })
      console.log('terminals', res.data)
    })
  },
  onReady() {
    this.getResources().then(() => {  
      this.getTerminals()
    })
  },
  onLoad() {
    this.setData({
      companyId: app.globalData.registration['companyId'],
      activityId: app.globalData.registration['activityId']
    })
  },
});
