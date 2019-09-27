import { saveImage } from '/api/common'
import { selResourcesDetail, selPromoItem, selProgrammeInvestigation, saveProgrammeImplement } from '/api/programExecute'
import { selObjectElement } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    cityCode: '',
    programmeId: '',
    programmeType: '', // 活动类型
    address: '',
    longitude: 0,
    latitude: 0,
    mans: 0,
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
    swipeIndex: null,
    question: null,
    retail: {
      id: '',
      name: ''
    },
    hasLocation: false
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
    selProgrammeInvestigation({ activityId: this.data.programmeId }).then(res =>{
      this.setData({
        hasInvestigation: res.data.investigate
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
  // 定位
  location() {
    return new Promise(resolve => {
      let that = this
      dd.getLocation({
        success(res){
          that.setData({
            hasLocation: true,
            address: res.address || '',
            longitude: res.longitude,
            latitude: res.latitude
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
      url: `/pages/common/investigation/investigation?question=${e.index}&cityCode=${this.data.cityCode}`
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
      url: `/pages/common/investigation/investigation?cityCode=${this.data.cityCode}`
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
    let imgs = this.data.imgs.join(',')
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
      executeType: 1,
      location: this.data.address,
      userId: app.globalData.userInfo.userId,
      activityId: this.data.programmeId,
      companyId: this.data.cityCode,
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
      let type = res.data.saveState == 0 ? 'success' : 'fail'
      dd.navigateTo({
        url: `./result/result?type=${type}`
      })
    })
  },
  // 获取其他要素
  getOtherPoints() {
    selPromoItem({ activityId: this.data.programmeId }).then(res => {
      if (res.data.list != 0) {
        this.setData({ otherPoints: res.data })
      }
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
      activityId: this.data.programmeId,
      companyId: this.data.cityCode,
      executeType: 2
    }).then(res => {
      this.setData({ resources: res.data })
    })
  },
  // 准备数据
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
      programmeId: options.programmeId,
      cityCode: options.cityCode
    })
  }
})
