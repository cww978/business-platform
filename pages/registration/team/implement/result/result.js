Page({
  data: {
    title: "",
    subTitle: "",
    messageButton: {
      mainButton: {
        buttonText: "返回首页"
      },
      subButton: {
        buttonText: "继续查看方案"
      }
    }
  },
  goHome() {
    dd.navigateBack({
      delta: 3
    })
  },
  goBack() {
    dd.navigateBack({
      delta: 2
    })
  },
  onLoad(options) {
    if (options.type == 'success') {
      this.setData({
        title: '执行成功',
        subTitle: `方案执行成功`,
        type: options.type
      })
    } else {
      this.setData({
        title: '执行失败',
        subTitle: `方案执行失败`,
        type: options.type
      })
    }
  }
});