import { selProgrammeCodes, selCitys } from '/mock/programme'
import { selActivityCode, selResourcesDetail } from '/api/programExecute'
import { selProgrammeInfo } from '/api/shareHelp'
import { activitType } from '/constant/other.js'
const app = getApp()
Page({
  data: {
    userId: '',
    programmeId: '',
    activitTypes: activitType, // 活动类型
    programmes: [],
    programmeIndex: '',
    programmeType: '',
    cityCode: '',
    cityText: '',
    resources: [], // 资源
    programmeInfo: {}
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
      programmeType: this.data.programmes[e.detail.value]['ACTIVITY_TYPE'],
      programmeIndex: e.detail.value
    })
    // 查询方案信息
    selProgrammeInfo({
      userId: this.data.userId,
      activityId: this.data.programmeId,
      companyId: this.data.cityCode
    }).then(res => {
      // 将方案信息保存在全局变量中
      app.globalData.programmeDetail = res.data.programmeDetail[0]
      this.setData({ programmeInfo: res.data.programmeDetail[0] })
      // 查询资源明细
      selResourcesDetail({
        userId: this.data.userId,
        companyId: this.data.cityCode,
        activityId: this.data.programmeId,
        executeType: 1,
      }).then(res => {
        this.setData({ resources: res.data })
      })
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
    let programmeId = this.data.programmeId
    let cityCode = this.data.cityCode
    let programmeType = this.data.programmeType
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
