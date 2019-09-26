import { selProgrammeInfo, selProgrammeCodes, selCitys } from '/mock/programme'
Page({
  data: {
    programmeId: '',
    pickerShow: false,
    cityCode: '',
    cityText: '',
    citys: [],
    programmes: [],
    programmeIndex: '',
    programme: {
      typeNmae: '',
      typeId: '',
      themeName: '',
      themeId: '',
      time: '',
      modality: '',
      investigation: 0,
      otherPoints: [],
      resources: [],
      targets: []
    }
  },
  // 城市选择确认
  clickPickerConfirm(e) {
    let that = this
    selProgrammeCodes().then(res => {
      that.setData({
        programmes: res.data
      })
    })
    this.setData({
      cityText: e[2].text,
      cityCode: e[2].value,
      pickerShow: false
    })
  },
  // 城市选择取消
  clickPickerCancel() {
    this.setData({ pickerShow: false })
  },
  // 点击地市弹出picker
  clickCity() {
    this.setData({ pickerShow: true })
  },
  // 方案编码切换
  programmeChange(e) {
    let that = this
    that.setData({
      programmeId: that.data.programmes[e.detail.value].id,
      programmeIndex: e.detail.value
    })
    selProgrammeInfo().then(res => {
      that.setData({
        programme: res.data
      })
    })
  },
  // 跳转到分配页面
  navToRec(){
    // 判断是否选择了方案
    if (this.data.programmeId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: `./receiving/receiving?programmeId=${this.data.programmeId}&cityCode=${this.data.cityCode}`
      })
    }
  },
  onReady() {
    selCitys().then(res => {
      this.setData({ citys: res.data })
    })
  },
  onLoad() {}
})
