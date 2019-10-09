// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain;

Page({
  data: {
    loading:true,
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 100,//滚动区高度
    userId:'0100271822890151',
    activityId:'',
    companyId:'',
    activityInfo:{}
  },
  onLoad() {
    let _this = this;
    dd.getStorage({
      key: 'assess_DetailCondition',
      success: function(res) {
        _this.setData({
          activityId: res.data.activityId,
          companyId: res.data.companyId
        });
      }
    });
    this.getActivityDetailInfo();
  },
  getActivityDetailInfo() {
    let _this = this;
    _this.setData({
      loading: true 
    });     
    dd.httpRequest({
      url: domain + '/shareHelp/selProgrammeInfo',
      method: 'GET',
      data: {
        userId: _this.data.userId,
        activityId: _this.data.activityId,
        companyId: _this.data.companyId
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        _this.setData({
          activityInfo:res.data.data,
          loading: false 
        });        
      }
    });
  },
  assess() {
    dd.navigateTo({
      url: '../assess_assess/assess_assess?activityId=' + this.data.activityId
    })    
  }
});
