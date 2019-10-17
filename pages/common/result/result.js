Page({
  data: {
    title: "",
    subTitle: "",
    messageButton: {
      mainButton: {
        buttonText: "返回"
      },
      subButton: {
        buttonText: "继续"
      }
    }
  },
  goHome() {
    dd.navigateBack({
      delta: 3
    })
  },
  goBack() {
    dd.navigateBack()
  },
  onLoad(options) {
    this.setData({
      title: options.title,
      subTitle: options.subTitle,
      type: options.type
    })
  }
});