import { selResourcesDistribution, saveConfirmResources } from '/mock/programme'
let app = getApp()
Page({
  data: {
    programmeId: '',
    cityCode: '',
    resources: [],
    companyCode: '',
    companyName: '',
    standard: ''
  },
  // 到货确定
  save() {
    let that = this
    let params = {
      id: that.data.programmeId,
      companyCode: that.data.companyCode,
      cityCode: that.data.cityCode
    }
    saveConfirmResources(params).then(res => {
      let type = res.data == 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `./result/result?type=${type}`
      })
    })
  },
  onReady() {
    let that = this
    let params = {
      programmeId: that.data.programmeId,
      cityCode: that.data.cityCode,
      companyCode: that.data.companyCode
    }
    selResourcesDistribution(params).then(res => {
      that.setData({
        resources: res.data.resources,
        standard: res.data.standard
      })
    })
  },
  onLoad(options) {
    console.log('方案编码', options.programmeId)
    console.log('地市编码', options.cityCode)
    this.setData({
      programmeId: options.programmeId,
      cityCode: options.cityCode,
      companyCode: app.globalData.registration.companyCode,
      companyName: app.globalData.registration.companyName
    })
  }
})
