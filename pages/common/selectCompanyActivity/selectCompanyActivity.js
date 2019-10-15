import { selActivityCode, selTerminalActivityCode } from '/api/programExecute'
import { selProgramExecuteRole } from '/api/role'
const app = getApp()
Page({
  data: {
    showProgrammePicker: false,
    realCity: 0,
    cityCode: 0,
    cityText: 0,
    loading: false,
    isCity: false,
    programmes: [],
    programmeIndex: 0,
    isActivityId: false
  },
  switchUserType(type) {
    let programmeId = this.data.programmes[this.data.programmeIndex]['ACTIVITY_ID']
    let cityCode = this.data.cityCode
    type = parseInt(type)
    switch(type){
      // 根据操作人员类型跳转至不同的操作页面
      case 3 :
        dd.navigateTo({
          url: `/pages/registration/team/team?programmeId=${programmeId}&cityCode=${cityCode}`
        })
        break
      case 2 :
        dd.navigateTo({
          url: `/pages/registration/company/company?programmeId=${programmeId}&cityCode=${cityCode}`
        })
        break
      case 1 :
        dd.navigateTo({
          url: `/pages/registration/salesman/salesman?programmeId=${programmeId}&cityCode=${cityCode}`
        })
        break
      default: break
    }
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
  // 获取方案编码
  getProgrammeCodes() {
    selActivityCode({
      userId: app.globalData.userInfo.userId,
      companyId: this.data.cityCode
    }).then(res => {
      console.log('方案编码', res.data)
      let isActivityId = false
      if (res.data.length > 0) {
        isActivityId = true
      } else {
        this.setData({ showProgrammePicker: true })
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
      console.log('方案编码', res.data)
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
        this.setData({ showProgrammePicker: true })
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
  clickDefine() {
    app.globalData.registration['activityId'] = this.data.programmes[this.data.programmeIndex]['ACTIVITY_ID']
    app.globalData.registration['realCity'] = this.data.realCity
    app.globalData.registration['companyId'] = this.data.cityCode
    this.switchUserType(app.globalData.registration['userType'])
  },
  onLoad() {
    let userId = app.globalData.userInfo.userId
    selProgramExecuteRole({ userId: userId }).then(res => {
      console.log('用户类型', res.data)
      app.globalData.registration['userType'] = res.data.type
      // app.globalData.registration['userType'] = 3
    })
  },
});
