// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;

Page({
  data: {
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 100,//滚动区高度
  },
  onLoad(options) {
    console.log(options.activityId)
  },
  submit() {
    dd.alert({content:'提交评估'})
  }
});
