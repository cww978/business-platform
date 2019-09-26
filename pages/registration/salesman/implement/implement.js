import { saveProgrammeImplement } from '/mock/programme'
import { saveImage } from '/api/common'
import { selResourcesDetail, selPromoItem, selProgrammeInvestigation } from '/api/programExecute'
import { selObjectElement } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    programmeType: '', // 活动类型
    resources: [], // 资源
    targets: [], //对象
    otherPoints: [], // 其他要素
    imgs: [],
    targetIndex: 0,
    hasInvestigation: false,
    objectives: [
      { id: 1, text: '新产品调研', active: true },
      { id: 2, text: '老产品调研', active: false }
    ],
    questions: [],
    swipeIndex: null,
    question: null,
    retail: {
      id: '',
      name: ''
    },
    hasLocation: false,
    // 提交表单数据
    form: {
      cityCode: '',
      address: '',
      longitude: 0,
      latitude: 0,
      id: '',// 方案id
      targetId: '',// 对象id
      retailId: '', // 零售户id
      otherPoints: [], // 其他要素
      resources: [], // 资源使用
      imgs: '', // 现场图片
      questionIds: '', // 问卷id
      objectives: '', // 调研目的
    }
  },
  // 选择活动对象
  targetPickerChange(e) {
    this.setData({
      targetIndex: e.detail.value
    })
  },
  // 判断是否需要调研
  hasInvestigation() {
    selProgrammeInvestigation({ activityId: this.data.form.id }).then(res =>{
      this.setData({
        hasInvestigation: res.data.investigate
      })
    })
  },
  // 点击地址查看具体值
  clickAddress() {
    dd.alert({
      content: this.data.form.address,
      buttonText: '确定'
    })
  },
  // 定位
  location() {
    return new Promise(resolve => {
      let that = this
      dd.getLocation({
        success(res){
          that.setData({
            hasLocation: true,
            'form.address': res.address,
            'form.longitude': res.longitude,
            'form.latitude': res.latitude
          })
          resolve()
        },
        fail() {
          dd.showToast({ content: '定位失败' })
        }
      })
    })
  },
  // 选择调研目的
  onObjectiveClick(e) {
    let objectives = this.data.objectives
    let active = objectives[e.target.dataset.index].active
    objectives[e.target.dataset.index].active = !active
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
  // 点击图片
  actionImage(e) {
    let index = e.target.dataset.index
    let that = this
    dd.showActionSheet({
      items: ['查看图片', '删除'],
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index == 0) {
          dd.previewImage({
            current: index,
            urls: that.data.imgs
          })
        } else if (res.index == 1) {
          let imgs = that.data.imgs
          imgs.splice(index, 1)
          that.setData({
            imgs: imgs
          })
        }
      }
    })
  },
  // 删除调研
  onRightItemClick(e) {
    e.done()
    let questions = this.data.questions
    questions.splice(e.extra, 1)
    this.setData({ questions: questions })
  },
  onSwipeStart(e) {
    this.setData({
      swipeIndex: e.index,
    })
  },
  // 点击调研查看修改
  onQuestionClick(e){
    this.setData({
      question: this.data.questions[e.index]
    })
    dd.navigateTo({
      url: `/pages/common/investigation/investigation?question=${e.index}`
    })
  },
  // 选择上传图片
  chooseImage() {
    let that = this
    dd.chooseImage({
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0])
        saveImage(path).then(res => {
          let imgs = that.data.imgs
          imgs.push(res.data)
          that.setData({ imgs: imgs })
        }).catch(() => {
          dd.showToast({ content: '上传图片失败' })
        })
      }
    })
  },
  // 其他要素输入
  inputOtherPoint(e) {
    let otherPoints = this.data.otherPoints
    otherPoints[e.target.dataset.index].value = e.detail.value
    this.setData({
      otherPoints: otherPoints
    })
  },
  // 资源使用情况输入
  inputResourcesUse(e) {
    let index = e.target.dataset.index
    let inputValue = e.detail.value
    let resources = this.data.resources
    resources[index].useNum = inputValue
    this.setData({
      resources: resources
    })
  },
  // 增加调研测试
  addQuestion(question) {
    let questions = this.data.questions
    questions.push(question)
    this.setData({ questions: questions })
  },
  // 修改调研测试
  updateQuestion(index, question) {
    let questions = this.data.questions
    questions[index] = question
    this.setData({ questions: questions })
  },
  // 点击新增调研测试
  investigClick() {
    dd.navigateTo({
      url: '/pages/common/investigation/investigation'
    })
  },
  // 打开零售户搜索
  openSearchPage() {
    dd.navigateTo({
      url: '/pages/common/search/search'
    })
  },
  save() {
    let retailId = this.data.retail.id
    let targetId = this.data.targets[this.data.targetIndex].targetId
    let otherPoints = []
    for (let item of this.data.otherPoints) {
      otherPoints.push({ itemId: item.itemId, value: item.value })
    }
    let resources = []
    for (let item of this.data.resources) {
      resources.push({ id: item.ADSGOODS_ID, useNum: item.useNum })
    }
    let imgs = this.data.imgs.join(',')
    let questionIds = []
     for (let item of this.data.questions) {
      questionIds.push(item.id)
    }
    questionIds = questionIds.join(',')
    let objectives = []
    for (let item of this.data.objectives) {
      if (item.active) {
        objectives.push(item.id)
      }
    }
    objectives = objectives.join(',')
    this.setData({
      'form.targetId': targetId,
      'form.retailId': retailId,
      'form.otherPoints': otherPoints,
      'form.resources': resources,
      'form.imgs': imgs,
      'form.questionIds': questionIds,
      'form.objectives': objectives
    })
    saveProgrammeImplement(this.data.form).then(res => {
      let type = res.data == 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `./result/result?type=${type}`
      })
    })
  },
  // 获取其他要素
  getOtherPoints() {
    selPromoItem({ activityId: this.data.form.id }).then(res => {
      this.setData({ otherPoints: res.data })
    })
  },
  // 获取对象
  getTargets() {
    selObjectElement({ promoType: this.data.programmeType}).then(res => {
      this.setData({ targets: res.data })
    })
  },
  // 获取资源明细
  getResources() {
    selResourcesDetail({
      userId: app.globalData.userInfo.userId,
      activityId: this.data.form.id,
      companyId: this.data.form.cityCode,
      executeType: 1
    }).then(res => {
      this.setData({ resources: res.data })
    })
  },
  onReady() {
    this.getOtherPoints()
    this.hasInvestigation()
    this.location()
    this.getResources()
    this.getTargets()
  },
  onLoad(options) {
    console.log('方案编码', options.programmeId)
    console.log('地市编码', options.cityCode)
    this.setData({
      questions: [],
      resources: [],
      programmeType: options.programmeType,
      'form.id': options.programmeId,
      'form.cityCode': options.cityCode
    })
  }
})
