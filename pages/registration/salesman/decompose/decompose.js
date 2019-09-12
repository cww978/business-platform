import { selCompanys, saveResolveCompany } from '/mock/programme'

Page({
  data: {
    programmeId: '',
    companys: [],
    companyIndex: 0,
    resources: [],
    companyCode: '',
    companyName: '',
    mans: 5,
    defaultSplit: 5
  },
  inputMans(e) {
    let inputValue = e.detail.value
    let resources = this.data.resources
    for (let item of resources) {
      item.split = inputValue * item.default
    }
    this.setData({
      mans: inputValue,
      resources: resources
    })
  },
  inputSplit(e) {
    let index = e.target.dataset.index
    let inputValue = e.detail.value
    let split = this.data.mans * inputValue
    let resources = this.data.resources
    resources[index].split = split
    resources[index].default = inputValue
    this.setData({
      resources: resources
    })
  },
  companyPickerChange(e) {
    this.setData({
      companyCode: this.data.companys[e.detail.value].companyCode,
      companyName: this.data.companys[e.detail.value].companyName,
      companyIndex: e.detail.value
    })
  },
  save() {
    let that = this
    let params = {
      id: that.data.programmeId,
      companyCode: that.data.companyCode,
      mans: that.data.mans,
      resources: that.data.resources
    }
    saveResolveCompany(params).then(res =>{
      let type = res.data == 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `./success/success?companyName=${that.data.companyName}&type=${type}`
      })
    })
  },
  onLoad(options) {
    let that = this
    let resources = getCurrentPages()[getCurrentPages().length - 2].data.programme.resources
    for (let item of resources) {
      item.split = this.data.mans * this.data.defaultSplit
      item.default = this.data.defaultSplit
    }
    this.setData({
      resources: resources,
      programmeId: options.programmeId
    })
    // 查询终端公司列表
    selCompanys().then((res) => {
      that.setData({
        companys: res.data
      })
      that.setData({
        companyCode: that.data.companys[that.data.companyIndex].companyCode,
        companyName: that.data.companys[that.data.companyIndex].companyName
      })
    })
  },
});
