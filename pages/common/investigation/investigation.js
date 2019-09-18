import { saveInvestigationQuestion } from '/mock/programme'
Page({
  data: {
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
      id: '',
      time: '',
      address: '',
      tobacco: '',
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
  addressInput(e) {
    this.setData({
      'form.address': e.detail.value
    })
  },
  tobaccoInput(e) {
    this.setData({
      'form.tobacco': e.detail.value
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
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    let qty = this.data.investigForm.qty.join(',')
    let branch = this.data.investigForm.branch.join(',')
    let taste = this.data.investigForm.taste.join(',')
    this.setData({
      'form.qty': qty,
      'form.branch': branch,
      'form.taste': taste
    })
    let that = this
    saveInvestigationQuestion(that.data.form).then(res => {
      that.setData({
        'form.id': res.data.id
      })
      if (that.data.questionIndex == null) { 
        lastPage.addQuestion(that.data.form)
      } else {
        lastPage.updateQuestion(that.data.questionIndex, that.data.form)
      }
      dd.showToast({
        type: 'success',
        content: '保存成功',
        duration: 1500
      })
      setTimeout(() => {
        dd.navigateBack()
      }, 1300)
    })
  },
  onLoad(options) {
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
