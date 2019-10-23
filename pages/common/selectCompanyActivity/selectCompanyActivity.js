import { selActivityCode, selTerminalActivityCode, selActivityAccount } from '/api/programExecute'
import { selProgramExecuteRole } from '/api/role'
import { selSalesArea } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    type: -1,
    tipsInfo: '请选择区地获取方案',
    modalContent: '',
    showModal: false,
    showProgrammePicker: false,
    realCity: 0,
    cityCode: 0,
    cityText: 0,
    loading: true,
    isCity: false,
    programmes: [],
    areaList: [],
    programmeIndex: 0,
    isActivityId: false
  },
  handleModalRight() {
    this.setData({ showModal: false })
  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  // 确定地区更改
  confirmCompany(e) {
    this.setData({
      realCity: e.realCity,
      cityCode: e.city.code,
      cityText: e.city.name,
      isCity: true,
      isActivityId: false,
      loading: true,
    })
    if (app.globalData.registration['userType'] == 1) {
      this.getProgrammeCodes()
    } else {
      this.getProgrammeCodesForTerminal()
    }
  },
  // 检验该地区是否已经锁定关账
  testAccount() {
    return new Promise(resolve => {
      selActivityAccount({ companyId: app.globalData.registration['companyId'] }).then(res => {
        if (res.data.saveState == 1) {
          this.setData({
            modalContent: res.data.message,
            showModal: true
          })
        } else {
          resolve()
        }
      })
    })
  },
  // 获取方案编码
  getProgrammeCodes() {
    selActivityCode({
      userId: app.globalData.userInfo.userId,
      companyId: this.data.cityCode
    }).then(res => {
      let isActivityId = false
      if (res.data.length > 0) {
        isActivityId = true
      } else {
        this.setData({
          showProgrammePicker: true,
          tipsInfo: '该地区下没有可操作的方案'
        })
      }
      this.setData({
        isActivityId: isActivityId,
        programmes: res.data,
        loading: false
      })
    })
  },
  // 获取终端公司的方案编码
  getProgrammeCodesForTerminal() {
    let type = app.globalData.registration['userType'] == 2?1:2
    selTerminalActivityCode({
      companyId: this.data.cityCode,
      type: type
    }).then(res => {
      let isActivityId = false
      if (res.data.length > 0) {
        // 格式化数据
        for (let item of res.data) {
          item['ACTIVITY_CODE'] = item.activityCode
          item['ACTIVITY_ID'] = item.activityId
          item['TITLE'] = item.title
          item['BEGIN_DATE'] = item.beginDate
          item['END_DATE'] = item.endDate
        }
        isActivityId = true
      } else {
        this.setData({
          showProgrammePicker: true,
          tipsInfo: '该地区下没有可操作的方案'
        })
      }
      this.setData({
        isActivityId: isActivityId,
        programmes: res.data,
        loading: false
      })
    })
  },
  programmeChange(e) {
    this.setData({ programmeIndex: e.detail.value })
  },
  setGlobalData() {
    app.globalData.registration['activityId'] = this.data.programmes[this.data.programmeIndex]['ACTIVITY_ID']
    app.globalData.registration['realCity'] = this.data.realCity
    app.globalData.registration['companyId'] = this.data.cityCode
  },
  // 分配方案
  navToRec() {
    this.setGlobalData()
    this.testAccount().then(() => {
      dd.navigateTo({
        url: `/pages/registration/salesman/decompose/decompose`
      })
    })
  },
  // 执行方案
  navToImp() {
    this.setGlobalData()
    this.testAccount().then(() => {
      dd.navigateTo({
        url: `/pages/common/implementation/implementation`
      })
    })
  },
  // 确认收货
  navToCheck() {
    this.setGlobalData()
    this.testAccount().then(() => {
      dd.navigateTo({
        url: `/pages/registration/company/receiving/receiving`
      })
    })
  },
  clickDefine() {
    this.setGlobalData()
    this.testAccount().then(() => {
      dd.navigateTo({
        url: `/pages/registrationmodify/implementationlist/implementationlist`
      })
    })
  },
  onReady() {
    selSalesArea({
      userId: app.globalData.registration['userType'] == 2 ? -1 : app.globalData.userInfo.userId
    }).then(res => {
      this.setData({ areaList: res.data, loading: false })
    })
  },
  onLoad(options) {
    this.setData({ type: options.type })
  },
})
