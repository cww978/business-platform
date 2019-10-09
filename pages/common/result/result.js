Page({
  data: {
    title: "",
    subTitle: "",
    messageButton: {
      mainButton: {
        buttonText: "返回首页"
      },
      subButton: {
        buttonText: "继续查看"
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
    this.setData({
      title: options.title,
      subTitle: options.subTitle,
      type: options.type
    })
  }
});