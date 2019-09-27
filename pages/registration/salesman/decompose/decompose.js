import { selCompanys, saveResolveCompany } from '/mock/programme'
import { selResourcesDetail } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    programmeId: '',
    cityCode: '',
    companys: [],
    companyIndex: 0,
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
  companyPickerChange(e) {
    this.setData({ companyIndex: e.detail.value })
  },
  // 获取资源明细
  getResources() {
    selResourcesDetail({
      userId: app.globalData.userInfo.userId,
      activityId: this.data.programmeId,
      companyId: this.data.cityCode,
      executeType: 1
    }).then(res => {
      this.setData({ resources: res.data })
    })
  },
  save() {
    let that = this
    let params = {
      userId: app.globalData.userInfo.userId,
      companyId: that.data.cityCode,
      activityId: that.data.programmeId,
      terminalCompanyId: that.data.companyCode,
      standard: that.data.standard,
      resources: that.data.resources
    }
    saveResolveCompany(params).then(res =>{
      let type = res.data == 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `./success/success?companyName=${that.data.companyName}&type=${type}`
      })
    })
  },
  // 查询终端公司列表
  getTerminals() {
    selCompanys().then((res) => {
      this.setData({
        companys: res.data
      })
    })
  },
  onReady() {
    this.getResources()
    this.getTerminals()
  },
  onLoad(options) {
    console.log('方案编码', options.programmeId)
    console.log('地市编码', options.cityCode)
    this.setData({
      programmeId: options.programmeId,
      cityCode: options.cityCode
    })
  },
});
