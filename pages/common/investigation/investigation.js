import { saveInvestigationQuestion } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    companyId: '',
    investigList: [
      {
        title: '价格',
        form: 'qty',
        tests: ['低', '偏低', '合适', '偏高','高'] 
      },
      {
        title: '烟支',
        form: 'branch',
        tests: ['不喜欢', '不太喜欢', '一般', '喜欢', '很喜欢'] 
      },
      {
        title: '吸味',
        form: 'taste',
        tests: ['太浓', '偏浓', '合适', '偏淡', '太淡'] 
      }
    ],
    investigForm: {
      qty: [0, 0, 0, 0, 0],
      branch: [0, 0, 0, 0, 0],
      taste: [0, 0, 0, 0, 0]
    },
    questionIndex: null,
    form: {
      id: 0,
      time: '',
      address: '',
      tobacco: '',
      tobaccoId: '',
      num: 0,
      mans: 0,
      qty: '',
      branch: '',
      taste: '',
      other: ''
    }
  },
  inputTextarea(e) {
    this.setData({
      'form.other': e.detail.value
    })
  },
  testTimeClick() {
    let that = this
    dd.datePicker({
      success(res) {
        that.setData({
          'form.time': res.date
        })
      }
    })
  },
  clickTobacco() {
    dd.navigateTo({
      url: `/pages/common/selectAdsgoods/selectAdsgoods?type=1&companyId=${this.data.companyId}`
    })
  },
  setAdsgood(e) {
    this.setData({
      'form.tobacco': e['ADSGOODSNAME'],
      'form.tobaccoId': e['ADSGOODSID']
    })
  },
  addressInput(e) {
    this.setData({
      'form.address': e.detail.value
    })
  },
  numInput(e) {
    this.setData({
      'form.num': e.detail.value
    })
  },
  mansInput(e) {
    this.setData({
      'form.mans': e.detail.value
    })
  },
  onInputInvestig(e) {
    let form = this.data.investigForm
    form[e.target.dataset.form][e.target.dataset.index] = e.detail.value
    this.setData({
      investigForm: form
    })
  },
  save() {
    // 获取上个页面 调用上个页面的方法
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    let qty = this.data.investigForm.qty.join(',')
    let branch = this.data.investigForm.branch.join(',')
    let taste = this.data.investigForm.taste.join(',')
    this.setData({
      'form.qty': qty,
      'form.branch': branch,
      'form.taste': taste
    })
    let data = {
      id: 0,
      regId: app.globalData.userInfo.userId,
      testTime: this.data.form.time,
      testDest: this.data.form.address,
      adsgoodsId: this.data.form.tobaccoId + '',
      tobaQty: parseInt(this.data.form.num),
      personCount: parseInt(this.data.form.mans),
      price: this.data.form.qty,
      packing: this.data.form.branch,
      taste: this.data.form.taste,
      suggestContent: this.data.form.other
    }
    let that = this
    saveInvestigationQuestion(data).then(res => {
      // 判断是否保存成功
      console.log('测试调研', res)
      dd.alert({
        title: '操作提示',
        content: res.data.message,
        buttonText: '确定',
        success: () => {
          if (res.data.saveState == 0) {
            // 保存成功
            that.setData({ 'form.id': res.data.id })
            // 判断是新增还是修改
            if (that.data.questionIndex == null) { 
              lastPage.addQuestion(that.data.form)
            } else {
              lastPage.updateQuestion(that.data.questionIndex, that.data.form)
            }
            dd.navigateBack()
          }
        }
      })
    })
  },
  onLoad(options) {
    this.setData({ companyId: options.cityCode })
    if(options.question){
      let lastPage = getCurrentPages()[getCurrentPages().length - 2]
      let qty = lastPage.data.question.qty.split(',')
      let branch = lastPage.data.question.branch.split(',')
      let taste = lastPage.data.question.taste.split(',')
      this.setData({
        questionIndex: options.question,
        'investigForm.qty': qty,
        'investigForm.branch': branch,
        'investigForm.taste': taste,
        form: lastPage.data.question
      })
    }
  },
});
