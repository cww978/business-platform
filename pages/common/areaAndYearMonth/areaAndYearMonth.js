Page({
  data: {
    yearMonth: '',
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
          'yearMonth': res.date
        })
      }
    })
  },
  clickDefine() {
    let path = ''
    switch (this.data.type) {
      case 'locking' : path = `/pages/stock/locking/locking?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
        break
      case 'check' : path = `/pages/stock/locking/check?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
        break
      case 'settle' : path = `/pages/stock/locking/settle?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
        break
      default : path = `/pages/stock/locking/locking?regionCode=${this.data.regionCode}&yearMonth=${this.data.yearMonth}`
    }
    dd.navigateTo({ url: path })
  },
  onLoad(options) {
    this.setData({ type: options.type })
  },
})
