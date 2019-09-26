import { selCitys } from '/mock/account'
Page({
  data: {
    pickerShow: false,
    yearMonth: '',
    isArea: false,
    isYear: false,
    citys: [],
    regionCode: '',
    areaText: '',
    type: ''
  },
  testTimeClick() {
    let that = this
    dd.datePicker({
      format: 'yyyy-MM',
      success(res) {
        that.setData({
          isYear: true,
          'yearMonth': res.date
        })
      }
    })
  },
  // picker选择确认
  clickPickerConfirm(e) {
    this.setData({
      areaText: e[2].text,
      regionCode: e[2].value,
      isArea: true,
      pickerShow: false
    })
  },
  // picker选择取消
  clickPickerCancel() {
    this.setData({ pickerShow: false })
  },
  // 点击地市弹出picker
  clickCity() {
    this.setData({ pickerShow: true })
  },
  clickDefine() {
    let path = ''
    switch (this.data.type) {
      case 'locking' : path = `/pages/stock/locking/locking?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
        break
      case 'check' : path = `/pages/stock/check/check?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
        break
      case 'settle' : path = `/pages/stock/settle/settle?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
        break
      default : path = `/pages/stock/locking/locking?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
    }
    if (this.data.yearMonth != '' && this.data.regionCode != '') {
      dd.navigateTo({ url: path })
    }
  },
  onReady() {
    selCitys().then(res => {
      this.setData({ citys: res.data })
    })
  },
  onLoad(options) {
    this.setData({ type: options.type })
  },
})
