import { uploadFile } from '/api/common'
import { selResourcesDetail, selPromoItem, saveProgrammeImplement } from '/api/programExecute'
import { selObjectElement, selProgrammeInfo, selProgrammeInvestigation } from '/api/shareHelp'
import { getLocation } from '/util/location.js'
const app = getApp()
Page({
  data: {
    programmeInfo: {},
    loading: true,
    address: '',
    longitude: 0,
    latitude: 0,
    mans: 0,
    isClick: true,
    resources: [], // 资源
    targets: [], //对象
    otherPoints: [], // 其他要素
    imgs: [],
    targetIndex: 0,
    hasInvestigation: false,
    objectives: [
      { id: 1, text: '新产品调研', active: false },
      { id: 2, text: '老产品调研', active: false }
    ],
    questions: [],
    question: null,
    retail: {
      id: '',
      name: ''
    },
    hasLocation: false
  },
  addImage(e) {
    this.setData({ imgs: e })
  },
  deleteImage(e) {
    this.setData({ imgs: e })
  },
  // 输入人数
  inputMans(e) {
    this.setData({ mans: e.detail.value })
  },
  // 选择活动对象
  targetPickerChange(e) {
    this.setData({
      targetIndex: e.detail.value
    })
  },
  // 判断是否需要调研
  hasInvestigation() {
    return new Promise(resolve => {
      selProgrammeInvestigation({ activityId: app.globalData.registration['activityId'] }).then(res =>{
        this.setData({
          hasInvestigation: res.data.investigate
        })
        resolve()
      })
    })
  },
  // 点击地址查看具体值
  clickAddress() {
    dd.alert({
      content: this.data.address,
      buttonText: '确定'
    })
  },
  clickAdsgoods(e) {
    dd.alert({
      content: this.data.resources[e.target.dataset.index]['ADSGOODS_NAME'],
      buttonText: '确定'
    })
  },
  // 定位
  location() {
    getLocation().then(res => {
      this.setData({
        hasLocation: true,
        address: res.address || '',
        longitude: res.longitude,
        latitude: res.latitude
      })
    })
  },
  // 选择调研目的
  onObjectiveClick(e) {
    let objectives = this.data.objectives
    for (let item of objectives) {
      item.active = false
    }
    objectives[e.target.dataset.index].active = true
    this.setData({
      objectives: objectives
    })
  },
  // 设置零售户
  setRetail(retail) {
    this.setData({
      'retail.id': retail.id,
      'retail.name': retail.name
    })
  },
  // 删除调研
  onRightItemClick(e) {
    let questions = this.data.questions
    questions.splice(e.target.dataset.index, 1)
    this.setData({ questions: questions })
  },
  // 点击调研查看修改
  onQuestionClick(e){
    this.setData({
      question: this.data.questions[e.target.dataset.index]
    })
    dd.navigateTo({
      url: `/pages/common/investigation/investigation?question=${e.target.dataset.index}&cityCode=${app.globalData.registration['companyId']}`
    })
  },
  // 其他要素输入
  inputOtherPoint(e) {
    let key = `otherPoints[${e.target.dataset.index}].value`
    this.setData({ [key]: e.detail.value })
  },
  // 资源使用情况输入
  inputResourcesUse(e) {
    let key = `resources[${e.target.dataset.index}].useNum`
    this.setData({ [key]: e.detail.value })
  },
  // 增加调研测试
  addQuestion(question) {
    let questions = this.data.questions
    questions.push(question)
    this.setData({ questions: questions })
  },
  // 修改调研测试
  updateQuestion(index, question) {
    let key = `questions[${index}]`
    this.setData({ [key]: question })
  },
  // 点击新增调研测试
  investigClick() {
    dd.navigateTo({
      url: `/pages/common/investigation/investigation?cityCode=${app.globalData.registration['companyId']}`
    })
  },
  // 打开零售户搜索
  openSearchPage() {
    dd.navigateTo({
      url: '/pages/common/search/search'
    })
  },
  // 执行登记
  save() {
    // 构建参数
    let retailId = this.data.retail.id
    let targetId = this.data.targets[this.data.targetIndex].targetId
    let otherPoints = []
    for (let item of this.data.otherPoints) {
      otherPoints.push(item.itemId + ',' + item.value)
    }
    otherPoints = otherPoints.join(';')
    let resources = []
    for (let item of this.data.resources) {
      resources.push(item.ADSGOODS_ID + ',' + item.useNum)
    }
    resources = resources.join(';')
    let imgs = []
    for (let img of this.data.imgs) {
      imgs.push(img.id)
    }
    imgs = imgs.join(',')
    let questionIds = []
     for (let item of this.data.questions) {
      questionIds.push(item.id)
    }
    questionIds = questionIds.join(',')
    let objective = ''
    for (let item of this.data.objectives) {
      if (item.active) {
        objective = item.id
        break
      }
    }
    let data = {
      regId: 0,
      executeType: app.globalData.registration['userType'] == 1 ? 1 : 2,
      location: this.data.address,
      userId: app.globalData.userInfo.userId,
      activityId: app.globalData.registration['activityId'],
      companyId: app.globalData.registration['companyId'],
      targetId: targetId,
      imgs: imgs,
      custCode: retailId,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      resources: resources,
      otherPoints: otherPoints,
      investigation: questionIds,
      investTarget: objective,
      personNum: this.data.mans
    }
    // 保存操作
    saveProgrammeImplement(data).then(res => {
      let [ type, title ] = ['success', '保存成功']
      if (res.data.saveState != 0) {
        type = 'fail'
        title = '保存失败'
      }
      console.log('执行结果', res.data)
      dd.redirectTo({
        url: `/pages/common/result/result?type=${type}&title=${title}`
      })
    })
  },
  // 获取其他要素
  getOtherPoints() {
    return new Promise(resolve => {
      selPromoItem({ activityId: app.globalData.registration['activityId'] }).then(res => {
        console.log('其他要素', res.data)
        if (res.data.list.length != 0 && res.data.list[0] != null) {
          this.setData({ otherPoints: res.data.list })
        }
        resolve()
      })
    })
  },
  // 获取对象
  getTargets() {
    return new Promise(resolve => {
      selObjectElement({ promoType: this.data.programmeInfo['TYPEID']}).then(res => {
        this.setData({ targets: res.data, loading: false })
        resolve()
      })
    })
  },
  // 获取资源明细
  getResources() {
    return new Promise(resolve => {
      selResourcesDetail({
        userId: app.globalData.userInfo.userId,
        activityId: app.globalData.registration['activityId'],
        companyId: app.globalData.registration['companyId'],
        executeType: app.globalData.registration['userType'] == 1 ? 1 : 2
      }).then(res => {
        this.setData({ resources: res.data })
        resolve()
      })
    })
  },
  // 查询方案信息
  getProgrammeInfo() {
    return new Promise(resolve => {
      selProgrammeInfo({
        userId: app.globalData.userInfo.userId,
        activityId: app.globalData.registration['activityId'],
        companyId: app.globalData.registration['companyId']
      }).then(res => {
        this.setData({ programmeInfo: res.data.programmeDetail[0] })
        resolve()
      })
    })
  },
  // 准备数据
  onReady() {
    this.getProgrammeInfo().then(() => {
      this.getOtherPoints().then(() => {
        this.hasInvestigation().then(() => {
          this.getResources().then(() => {
            this.getTargets().then(() => {
              this.location()
            })
          })
        })
      })
    })
  },
  onLoad(options) {
    this.setData({
      questions: [],
      imgs: [],
      resources: [],
      objectives: [
        { id: 1, text: '新产品调研', active: false },
        { id: 2, text: '老产品调研', active: false }
      ]
    })
  }
})
