Page({
  data: {},
  onLoad() {
    this.webViewContext = dd.createWebViewContext('web-view-1')
  },
  onmessage(e) {
    console.log('传递的文件列表', e.detail)
    dd.navigateBack()
  },
})
