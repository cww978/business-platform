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
    if (options.type == 'success') {
      this.setData({
        title: '操作成功',
        subTitle: `锁定销区成功，请及时进行盘点和结账操作`,
        type: options.type
      })
    } else {
      this.setData({
        title: '操作失败',
        subTitle: `锁定销区失败`,
        type: options.type
      })
    }
  }
});