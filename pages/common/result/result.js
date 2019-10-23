Page({
  data: {
    title: '',
    subTitle: '',
    type: ''
  },
  goBack() {
    dd.navigateBack()
  },
  onLoad(options) {
    this.setData({
      title: options.title || '保存失败',
      subTitle: options.subTitle || '',
      type: options.type || 'fail'
    })
  }
});