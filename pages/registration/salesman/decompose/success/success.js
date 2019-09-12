Page({
  data: {
    title: "",
    subTitle: "",
    messageButton: {
      mainButton: {
        buttonText: "返回首页"
      },
      subButton: {
        buttonText: "继续分配方案"
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
        title: '分配成功',
        subTitle: `成功将方案分至${options.companyName}`,
        type: options.type
      })
    } else {
      this.setData({
        title: '分配失败',
        subTitle: `方案分至${options.companyName}失败`,
        type: options.type
      })
    }
  }
});