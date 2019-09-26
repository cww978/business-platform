import { selProgrammeCodes, selCitys } from '/mock/programme'
import { selActivityCode, selResourcesDetail } from '/api/programExecute'
import { selProgrammeInfo } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    userId: '',
    programmeId: '',
    programmeType: '',
    cityCode: '',
    cityText: '',
    programmes: [],
    programmeIndex: '',
    resources: [], // 资源
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
  setCityCode(e) {
    this.setData({
      cityCode: e.city.code,
      cityText: e.city.name,
    })
    this.getProgrammeCodes()
  },
  // 获取方案编码
  getProgrammeCodes() {
    selActivityCode({
      userId: this.data.userId,
      companyId: this.data.cityCode
    }).then(res => {
      this.setData({
        programmes: res.data
      })
    })
  },
  clickCity() {
    dd.navigateTo({
      url: '/pages/common/selectCompany/selectCompany'
    })
  },
  programmeChange(e) {
    this.setData({
      programmeId: this.data.programmes[e.detail.value]['ACTIVITY_ID'],
      programmeType: this.data.programmes[e.detail.value]['ACTIVITYTYPE'],
      programmeIndex: e.detail.value
    })
    // 查询方案信息
    // 待做...
    // 查询资源明细
    selResourcesDetail({
      userId: this.data.userId,
      companyId: 24,
      activityId: 5570,
      executeType: 1,
    }).then(res => {
      this.setData({ resources: res.data })
    })
  },
  navTodec(){
    let programmeId = 5570
    let cityCode = 24
    if (programmeId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: `./decompose/decompose?programmeId=${programmeId}&cityCode=${cityCode}`
      })
    }
  },
  navToimp(){
    let programmeId = 5570
    let cityCode = 24
    let programmeType = 4
    if (programmeId == '') {
      my.showToast({
        type: 'none',
        content: '请先选择方案',
        duration: 1000
      })
    } else {
      dd.navigateTo({
        url: `./implement/implement?programmeId=${programmeId}&cityCode=${cityCode}&programmeType=${programmeType}`
      })
    }
  },
  onReady() {},
  onLoad() {
    this.setData({
      userId: app.globalData.userInfo.userId
    })
  }
})
