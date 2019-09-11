import { selProgrammeInfo } from '/mock/programme'
Page({
  data: {
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
  navTodec(){
    dd.navigateTo({
      url: './decompose/decompose'
    })
  },
  navToimp(){
    dd.navigateTo({
      url: './implement/implement'
    })
  },
  onLoad() {
    let that = this
    selProgrammeInfo().then((res) => {
      that.setData({
        programme: res.data
      })
    })
  },
});
