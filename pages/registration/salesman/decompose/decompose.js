import { selCompanys, saveResolveCompany } from '/mock/programme'

Page({
  data: {
    programmeId: '',
    cityCode: '',
    companys: [],
    companyIndex: 0,
    resources: [],
    companyCode: '',
    companyName: '',
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
    this.setData({
      companyCode: this.data.companys[e.detail.value].companyCode,
      companyName: this.data.companys[e.detail.value].companyName,
      companyIndex: e.detail.value
    })
  },
  save() {
    let that = this
    let params = {
      cityCode: that.data.cityCode,
      id: that.data.programmeId,
      companyCode: that.data.companyCode,
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
  onLoad(options) {
    console.log('方案编码', options.programmeId)
    console.log('地市编码', options.cityCode)
    let that = this
    let resources = getCurrentPages()[getCurrentPages().length - 2].data.resources
    for (let item of resources) {
      item.split = ''
    }
    this.setData({
      resources: resources,
      programmeId: options.programmeId,
      cityCode: options.cityCode
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
