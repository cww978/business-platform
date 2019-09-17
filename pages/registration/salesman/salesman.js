import { selProgrammeInfo, selProgrammeCodes } from '/mock/programme'
Page({
  data: {
    programmeId: '',
    programmeIds: [],
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
      programmeId: that.data.programmeIds[e.detail.value].id,
      programmeIndex: e.detail.value
    })
    selProgrammeInfo().then(res => {
      that.setData({
        programme: res.data
      })
    })
  },
  navTodec(){
    if (this.data.programmeId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      console.log('分配方案', this.data.programmeId)
      dd.navigateTo({
        url: `./decompose/decompose?programmeId=${this.data.programmeId}`
      })
    }
  },
  navToimp(){
    if (this.data.programmeId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      console.log('执行', this.data.programmeId)
      dd.navigateTo({
        url: `./implement/implement?programmeId=${this.data.programmeId}`
      })
    }
  },
  onLoad() {
    let that = this
    selProgrammeCodes().then(res => {
      that.setData({
        programmeIds: res.data
      })
    })
  },
});
