import { selProgrammeInvestigation, saveProgrammeImplement, selResourcesDistribution } from '/mock/programme'
import { saveImage } from '/api/common'
let app = getApp()
Page({
  data: {
    resources: [], // 资源
    targets: [], //对象
    targetIndex: 0,
    otherPoints: [], // 其他要素
    targetId: '',
    mans: 0,
    imgs: [],
    hasInvestigation: false,
    objectives: [],
    questions: [],
    swipeIndex: null,
    question: null,
    retail: {
      id: '',
      name: ''
    },
    // 提交表单数据
    form: {
      cityCode: '',// 地市编码
      address: '',
      longitude: 0,
      latitude: 0,
      id: '',// 方案id
      targetId: '',// 对象id
      retailId: '', // 零售户id
      mans: '',// 人数
      otherPoints: [], // 其他要素
      resources: [], // 资源使用
      imgs: '', // 现场图片
      questionIds: '', // 问卷id
      objectives: '', // 调研目的
    }
  },
  targetPickerChange(e) {
    this.setData({
      targetId: this.data.targets[e.detail.value].id,
      targetIndex: e.detail.value
    })
  },
  hasInvestigation() {
    selProgrammeInvestigation().then(res =>{
      let objectives = res.data.objectives
      for (let item of objectives) {
        item.active = false
      }
      objectives[0].active = true
      this.setData({
        hasInvestigation: true,
        objectives: objectives
      })
    })
  },
  clickAddress() {
    dd.alert({
      content: this.data.form.address,
      buttonText: '确定'
    })
  },
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
  onObjectiveClick(e) {
    let objectives = this.data.objectives
    let active = objectives[e.target.dataset.index].active
    objectives[e.target.dataset.index].active = !active
    this.setData({
      objectives: objectives
    })
  },
  setRetail(retail) {
    this.setData({
      'retail.id': retail.id,
      'retail.name': retail.name
    })
  },
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
  onQuestionClick(e){
    this.setData({
      question: this.data.questions[e.index]
    })
    dd.navigateTo({
      url: `/pages/common/investigation/investigation?question=${e.index}`
    })
  },
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
  inputMans(e) {
    this.setData({
      mans: e.detail.value
    })
  },
  inputOtherPoint(e) {
    let otherPoints = this.data.otherPoints
    otherPoints[e.target.dataset.index].value = e.detail.value
    this.setData({
      otherPoints: otherPoints
    })
  },
  inputResourcesUse(e) {
    let index = e.target.dataset.index
    let inputValue = e.detail.value
    let resources = this.data.resources
    resources[index].useNum = inputValue
    this.setData({
      resources: resources
    })
  },
  addQuestion(question) {
    let questions = this.data.questions
    questions.push(question)
    this.setData({ questions: questions })
  },
  updateQuestion(index, question) {
    let questions = this.data.questions
    questions[index] = question
    this.setData({ questions: questions })
  },
  investigClick() {
    dd.navigateTo({
      url: '/pages/common/investigation/investigation'
    })
  },
  openSearchPage() {
    dd.navigateTo({
      url: '/pages/common/search/search'
    })
  },
  onUnload() {
    console.log('方案执行', 'page unload')
  },
  save() {
    let mans = this.data.mans
    let retailId = this.data.retail.id
    let targetId = this.data.targetId
    let otherPoints = []
    for (let item of this.data.otherPoints) {
      otherPoints.push({ id: item.id, value: item.value })
    }
    let resources = []
     for (let item of this.data.resources) {
      resources.push({ id: item.id, useNum: item.useNum })
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
      'form.mans': mans,
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
  onReady() {
    let params = {
      id: this.data.form.id,
      cityCode: this.data.form.cityCode,
      companyCode: app.globalData.registration.companyCode
    }
    let that = this
    selResourcesDistribution(params).then(res => {
      that.setData({
        resources: res.data.resources
      })
    })
    this.hasInvestigation()
    this.location()
  },
  onLoad(options) {
    console.log('方案编码', options.programmeId)
    console.log('地市编码', options.cityCode)
    let that = this
    let targets = getCurrentPages()[getCurrentPages().length - 2].data.programme.targets
    let otherPoints = getCurrentPages()[getCurrentPages().length - 2].data.programme.otherPoints
    for (let item of otherPoints) {
      item.value = ''
    }
    that.setData({
      questions: [],
      targets: targets,
      otherPoints: otherPoints,
      'form.id': options.programmeId,
      'form.cityCode': options.cityCode,
      targetId: targets[that.data.targetIndex].id
    })
  }
})
