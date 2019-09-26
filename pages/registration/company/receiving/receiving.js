import { selAllResourcesDistribution, saveConfirmResources } from '/mock/programme'
let app = getApp()
Page({
  data: {
    programmeId: '',
    cityCode: '',
    allResources: [],
    companyCode: '',
    companyName: '',
    standard: ''
  },
  onCheckResource(e) {
    let resources = this.data.allResources
    resources[e.target.dataset.index].checked = e.detail.value
    this.setData({ allResources: resources })
  },
  // 到货确定
  save() {
    let that = this
    let ids = []
    for (let item of that.data.allResources) {
      if (item.checked == true) {
        ids.push(item.id)
      }
    }
    if (ids.length <= 0) {
      dd.showToast({ content: '请选择一个执行单在确认' })
    } else {
      let params = {
        resources: ids.join(','),
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
    }
  },
  onReady() {
    let that = this
    let params = {
      programmeId: that.data.programmeId,
      cityCode: that.data.cityCode,
      companyCode: that.data.companyCode
    }
    selAllResourcesDistribution(params).then(res => {
      that.setData({ allResources: res.data })
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
