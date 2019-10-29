import { uploadFile } from '/api/common'
import { downLoadFile } from '/api/file'
import { getLocation } from '/util/location.js'
import { selResourcesDetail, selPromoItem, selRegDetail, saveProgrammeImplement } from '/api/programExecute'
import { selObjectElement, selProgrammeInvestigation } from '/api/shareHelp'
import { dateFormat } from '/util/tool'
const app = getApp()
Page({
  data: {
    // 执行单信息
    regExecution: [],
    regExecutiondetail: null,
    regId: 0,
    // 位置坐标
    address: '',
    longitude: 0,
    latitude: 0,
    loading: true,
    objectives: [
      { id: 1, text: '新产品调研', active: false },
      { id: 2, text: '老产品调研', active: false }
    ],
    // 活动对象
    targets: [],
    targetIndex: 0,
    // 调研问卷
    hasInvestigation: false,
    regInvest: [],
    question: null,
    // 零售户
    retailerInfo: {},
    // 图片
    regPicture: [],
    // 其他要素
    regElement: [],
    // 物资使用
    regGoods: [],
    imgs: []
  },
  addImage(e) {
    this.setData({ imgs: e })
  },
  deleteImage(e) {
    this.setData({ imgs: e })
  },
  // 选择活动对象
  targetPickerChange(e) {
    this.setData({
      targetIndex: e.detail.value
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
      content: this.data.regGoods[e.target.dataset.index]['ADSGOODS_NAME'],
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
  // 其他要素输入
  inputOtherPoint(e) {
    let key = `regElement[${e.target.dataset.index}].VALUE`
    this.setData({ [key]: e.detail.value })
  },
  // 资源使用情况输入
  inputResourcesUse(e) {
    let key = `regGoods[${e.target.dataset.index}].QTY`
    this.setData({ [key]: e.detail.value })
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
      'retailerInfo.custCode': retail.id,
      'retailerInfo.custName': retail.name
    })
  },
  // 删除调研
  onRightItemClick(e) {
    let regInvest = this.data.regInvest
    regInvest.splice(e.target.dataset.index, 1)
    this.setData({ regInvest: regInvest })
  },
  // 点击调研查看修改
  onQuestionClick(e) {
    this.setData({
      question: this.data.regInvest[e.target.dataset.index]
    })
    dd.navigateTo({
      url: `/pages/common/investigation/investigation?question=${e.target.dataset.index}`
    })
  },
  // 增加调研测试
  addQuestion(question) {
    let regInvest = this.data.regInvest
    regInvest.push(question)
    this.setData({ regInvest: regInvest })
  },
  // 修改调研测试
  updateQuestion(index, question) {
    let key = `regInvest[${index}]`
    this.setData({ [key]: question })
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
  submission() {
    this.setData({ showModal: true })
  },
  // 申请修改
  save() {
    // 活动对象
    let targetId = this.data.targets[this.data.targetIndex].targetId
    // 零售户
    let retailId = this.data.retailerInfo.custCode
    // 图片
    let imgs = []
    for (let img of this.data.imgs) {
      imgs.push(img.id)
    }
    imgs = imgs.join(',')
    // 其他要素
    let otherPoints = []
    for (let item of this.data.regElement) {
      otherPoints.push(item['ITEM_ID'] + ',' + item['VALUE'])
    }
    otherPoints = otherPoints.join(';')
    // 物资
    let resources = []
    for (let item of this.data.regGoods) {
      resources.push(item['ADSGOODSID'] + ',' + item['QTY'])
    }
    resources = resources.join(';')
    // 调研
    let regInvest = []
    for (let item of this.data.regInvest) {
      regInvest.push(item.id)
    }
    regInvest = regInvest.join(';')
    // 调研目的
    let objective = ''
    for (let item of this.data.objectives) {
      if (item.active) {
        objective = item.id
        break
      }
    }
    let data = {
      regId: this.data.regId,
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
      investigation: regInvest,
      investTarget: objective,
      personNum: 0
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
  // 查询执行单详细信息
  getRegDetail() {
    return new Promise(resolve => {
      selRegDetail({ regId: this.data.regId }).then((res) => {
        let detail = {}
        // 如果修改了就显示修改之后的信息
        if (res.data.listMod == void 0) {
          detail = res.data.listPro
        } else {
          detail = res.data.listMod
        }
        console.log('执行单信息', res.data)
        this.setData({
          loading: false,
          regExecution: detail[0].regExecution[0],
          regExecutiondetail: detail[1].regExecutiondetail,
          address: detail[1].regExecutiondetail.location,
          longitude: detail[1].regExecutiondetail.longitude,
          latitude: detail[1].regExecutiondetail.latitude,
          regGoods: detail[3].regGoods,
          regElement: detail[4].regElement,
          regPicture: detail[5].regPicture,
          retailerInfo: detail[6].retailerInfo
        })
        this.setRegInvest(detail[2].regInvest)
        resolve()
      })
    })

  },
  handleModalLeft() {
    this.setData({ showModal: false })
  },
  handleModalRight() {
    this.save()
  },
  // 准备数据
  onReady() {
    this.getRegDetail().then(() => {
      if (this.data.regInvest.length > 0) {
        this.setInvestTarget()
      }
      this.hasInvestigation()
      this.getImgs()
      this.getObjectElement()
    })
  },
  // 获取活动对象
  getObjectElement() {
    selObjectElement({ promoType: this.data.regExecution['PROMO_TYPE_ID'] }).then(res => {
      console.log('活动对象', res.data)
      let index = 0
      for(let i = 0; i < res.data.length; i++) {
        if (this.data.regExecution['TARGET_ID'] == res.data[i].targetId) {
          index = i
        }
      }
      this.setData({ targetIndex: index, targets: res.data })
      console.log('活动', this.data)
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
  // 获取其他要素
  getOtherPoints() {
    return new Promise(resolve => {
      selPromoItem({ activityId: app.globalData.registration['activityId'] }).then(res => {
        if (res.data.list.length != 0 && res.data.list[0] != null) {
          for (let item of this.data.regElement) {
            for (let element of res.data.list) {
              if (item['ITEM_ID'] == element.itemId) {
                element.value = item['VALUE']
              }
            }
          }
          this.setData({ regElement: res.data.list })
          console.log('其他要素', this.data.regElement)
        }
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
        for (let reggood of this.data.regGoods) {
          for (let item of res.data) {
            if (reggood['ADSGOODSID'] == item['ADSGOODS_ID']) {
              item['QTY'] = reggood['QTY']
            }
          }
        }
        this.setData({ regGoods: res.data })
        console.log('物资', this.data.regGoods)
        resolve()
      })
    })
  },
  // 设置调研目的
  setInvestTarget() {
    let objectives = this.data.objectives
    for(let item of objectives) {
      if (item.id == this.data.regExecutiondetail.investTarget) {
        item.active = true
      }
    }
    this.setData({ objectives })
  },
  // 获取图片
  getImgs() {
    let fileIds = []
    for (let item of this.data.regPicture) {
      fileIds.push(item['PICTURE_ID'])
    }
    fileIds = fileIds.join(',')
    if (fileIds != '') {
      let imgs = []
      downLoadFile({ fileIds: fileIds }).then(res => {
        for(let img of res.data) {
          imgs.push(img.filePath)
        }
        this.setData({ imgs })
      })
    }
  },
  setRegInvest(regInvests) {
    let regs = []
    for (let item of regInvests) {
      if (item !== null) {
        regs.push({
          id: item['ID'],
          time: item['TEST_TIME'],
          address: item['TEST_DEST'],
          tobacco: item['ADSGOODS_NAME'],
          tobaccoId: item['ADSGOODS_ID'],
          num: item['TOBA_QTY'],
          mans: item['PERSON_COUNT'],
          qty: item['PRICE'],
          branch: item['PACKING'],
          taste: item['TASTE'],
          other: item['SUGGEST_CONTENT']
        })
      }
    }
    this.setData({ regInvest: regs })
  },
  onLoad(options) {
    this.setData({
      regId: options.id,
      regInvest: [],
      imgs: [],
      targets: [],
      objectives: [
        { id: 1, text: '新产品调研', active: false },
        { id: 2, text: '老产品调研', active: false }
      ]
    })
  }
})
