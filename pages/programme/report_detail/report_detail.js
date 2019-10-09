// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain;

Page({
  data: {
    loading:true,
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio,//滚动区高度
    bodyHeight:app.globalData.systemInfo.windowHeight * _ratio,//遮罩层高度
    options_showAlert:false,
    delete_showAlert:false,
    userId:'0100271822890151',
    activityId:'',
    companyId:'',
    activityInfo:{}
  },
  onLoad() {
    let _this = this;
    dd.getStorage({
      key: 'report_DetailCondition',
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
        companyId: _this.data.companyId,
        menuType:0
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
  selectOptions() {
    this.setData({ 
      options_showAlert: true 
    });
  },
  options_alertCancel() {
    this.setData({
      options_showAlert:false
    })
  },
  modify_activity() {
    this.setData({
      options_showAlert:false
    });    
    dd.setStorage({
      key: 'report_options',
      data: 'modify'
    });
    dd.navigateTo({
      url: '../report_firstStep/report_firstStep'
    })
  },
  delete_activity() {
    this.setData({
      options_showAlert:false,
      delete_showAlert:true
    });
  },
  delete_alertSure() {
    this.setData({
      delete_showAlert:false
    });
  },
  delete_alertCancel() {
    this.setData({
      delete_showAlert:false
    });
  }
});
