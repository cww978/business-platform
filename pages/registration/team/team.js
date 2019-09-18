import { selProgrammeInfo, selProgrammeCodes } from '/mock/programme'
Page({
  data: {
    programmeId: '',
    cityCode: '',
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
  navToImp(){
    if (this.data.programmeId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: `./implement/implement?programmeId=${this.data.programmeId}&cityCode=${this.data.cityCode}`
      })
    }
  },
  onReady() {
    let that = this
    selProgrammeCodes().then(res => {
      that.setData({
        programmes: res.data
      })
    })
  },
  onLoad() {}
})
