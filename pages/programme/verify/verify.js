// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain;

Page({
  data: {
    loading:true,
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 240,//滚动区高度
    startTime:'2019年1月1日',
    endTime:'2019年9月10日',
    st:'2019-01-01',
    et:'2019-09-10',
    userId:'0100271822890151',
    verityState:[{
      stateId:0,
      stateName:'未审批'
    },{
      stateId:1,
      stateName:'已审批'
    }],
    arrIndex:0,
    arrLength:0,
    inputValue:'',
    activitiesList: [],
  },
  onLoad() {
    this.init();
  },
  onReady() {
  },
  init(){
    this.getDate();
  },
  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.setData({
      endTime:year + '年' + month + '月' + day + '日'
    });    
    month = month<=9 ? '0'+month : month;
    day = day<=9 ? '0'+day : day; 
    this.setData({
      et:year + '-' + month + '-' + day
    });
    date = new Date();
    date.setDate(date.getDate() - 30);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    this.setData({
      startTime:year + '年' + month + '月' + day + '日'
    });    
    month = month<=9 ? '0'+month : month;
    day = day<=9 ? '0'+day : day;
    this.setData({
      st:year + '-' + month + '-' + day
    });    
    this.checkInfo();
  },
  selectTime() {
    let _this = this;
    dd.showToast({
      content: '选择起始日期'
    });    
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: _this.data.st,
      success: (res) => {
        _this.setData({
          startTime:res.date.substring(0,4)+'年'+parseInt(res.date.substring(5,7))+'月'+parseInt(res.date.substring(8,10))+'日',
          st:res.date
        })
        dd.showToast({
          content: '选择截止日期'
        });        
        dd.datePicker({
          format: 'yyyy-MM-dd',
          currentDate: _this.data.et,
          success: (res) => {
            _this.setData({
              endTime:res.date.substring(0,4)+'年'+parseInt(res.date.substring(5,7))+'月'+parseInt(res.date.substring(8,10))+'日',
              et:res.date
            })
            _this.checkInfo()
          }
        });        
      }
    });
  },
  bindObjPickerChange(e) {
    this.setData({
      arrIndex: e.detail.value
    });
    this.checkInfo()
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  checkInfo() {
    this.getActivityList();
  },
  checkDetail(e) {
    let activityId = e.target.dataset.value;
    let activitiesList = this.data.activitiesList;
    for(let i=0;i<activitiesList.length;i++) {
      if(activitiesList[i].ACTIVITY_ID === activityId) {
        dd.setStorage({
          key: 'verify_DetailCondition',
          data: {
            activityId:activityId,
            companyId:activitiesList[i].COMPANY_ID2,
            evalId:activitiesList[i].EVAL_ID
          }
        });    
        dd.navigateTo({
          url: '../verify_detail/verify_detail'
        })
      }
    }    
  },
  getActivityList() {    
    let _this = this;
    _this.setData({
      loading: true 
    });   
    dd.httpRequest({
      url: domain + '/programme/selActivityApply',
      method: 'GET',
      data: {
        userId: _this.data.userId,
        beginDate: _this.data.st,
        endDate: _this.data.et,
        keyWord: _this.data.inputValue,
        state: _this.data.verityState[_this.data.arrIndex].stateId,
        menuType: '2' //方案评估审核
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data);
        for(let i=0;i<res.data.data.length;i++){
          if(res.data.data[i].TITLE.length > 15) {
            res.data.data[i].TITLE = res.data.data[i].TITLE.substring(0,15) + '...'
          }
        }
        _this.setData({
          arrLength:res.data.data.length,
          activitiesList: res.data.data,
          loading: false 
        });
      }
    });
  }  
});
