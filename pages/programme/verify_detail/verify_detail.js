// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain;

Page({
  data: {
    loading:true,
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 100,//滚动区高度
    bodyHeight:app.globalData.systemInfo.windowHeight * _ratio,//遮罩层高度
    userId:'0100271822890151',
    activityId:'',
    companyId:'',
    evalId:'',
    activityInfo:{},
    isagreed:true,//审批意见栏是同意还是驳回
    showAlert:false,//审批弹出框
    checkState:true,//是否同意，默认同意1true，驳回0false
    checkMsg:''
  },
  onLoad() {
    let _this = this;
    dd.getStorage({
      key: 'verify_DetailCondition',
      success: function(res) {
        _this.setData({
          activityId: res.data.activityId,
          companyId: res.data.companyId,
          evalId: res.data.evalId
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
  auditShow() {
    this.setData({
      showAlert:true
    })   
  },
  alertCancel() {
    this.setData({
      showAlert:false
    })
  },
  alertSure() {
    let _this = this;
    if(!_this.data.checkState && _this.data.checkMsg === '') {
      dd.alert({
        content:'驳回必须填写驳回意见！'
      });
      return false;
    }
    let confirmText = _this.data.checkState ? '同意' : '驳回';
    dd.confirm({
      title: '提示',
      content: '您是否' + confirmText + '该方案评估？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          _this.saveVerity();
          _this.setData({
            showAlert:false
          })          
        }
      },
    });   
  },
  ifAgree(e) {
    let ifAgree = e.target.dataset.value;
    if(ifAgree * 1 === 1) {
      this.setData({
        checkState:true
      });
    } else {
      this.setData({
        checkState:false
      });
    }
  },
  textAreaInput(e) {
    this.setData({
      checkMsg: e.detail.value
    });
  },
  saveVerity() {
    let _this = this;
    _this.setData({
      loading: true 
    });        
    dd.httpRequest({
      url: domain + '/programme/saveAssessAudit',
      method: 'POST',
      data: {
        activityId: _this.data.activityId,
        checkLevel: 10,
        checkMsg: _this.data.checkMsg,
        checkState: _this.data.checkState ? 1 : 0,
        evalId: _this.data.evalId,
        userId: _this.data.userId       
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
        dd.alert({
          content:res.data.data.message
        });        
        _this.setData({
          loading: false 
        });        
      }
    });
  } 
});
