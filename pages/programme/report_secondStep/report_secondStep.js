// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain

Page({
  data: {
    bodyHeight:app.globalData.systemInfo.windowHeight * _ratio,//遮罩层高度
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 100 - 100,//滚动区高度
    activityId:'',
    userId:'0100271822890151',
    standard:'',
    formText:'',
    objects:[{
      targetId:'-1',
      tragetName:'请选择活动对象'
    }],
    objArrIndex:0,
    ifHideName:true,
    objectName:'',
    objectNum:'',
    items1:[1,2,3,4],
    items2:[1,2,3,4],
    items3:[1,2,3,4],
    items4:[{
      id:'1',
      name:'活动1',
      isChoose:false,
      content:'活动形式1'
    },{
      id:'2',
      name:'活动2',
      isChoose:false,
      content:'活动形式2'
    }],
  },
  onLoad() {
    dd.getStorage({
      key: 'report_options',
      success: function(res) {
        let option = res.data;
        if(option === 'add'){
          dd.setNavigationBar({
            title: '新增方案(2/3)',
          });
        } else {
          dd.setNavigationBar({
            title: '修改方案(2/3)',
          });
        }
      }
    });
    let _this = this;
    dd.getStorage({
      key: 'report_activityId',
      success: function(res) {
        _this.setData({
          activityId: res.data
        });
      }
    });
    this.getActionFormAndStandard(); 
    this.getActivityObjects();      
  },
  objectChange(e) {
    let index = e.detail.value;
    let objects = this.data.objects;
    this.setData({
      objArrIndex:index
    });
    if(objects[index].tragetName.trim() === '其他'){
      this.setData({
        ifHideName:false
      });      
    }
  },
  objectNameInput(e) {
    this.setData({
      objectName: e.detail.value
    });    
  },
  objectNumInput(e) {
    this.setData({
      objectNum: e.detail.value
    });    
  },
  ifChoose(e) {
    let id = e.target.dataset.value;
    let otype= e.target.dataset.otype;
    if(otype === '0'){//未选中->选中
      for(let i=0;i<this.data.items4.length;i++){
        if(this.data.items4[i].id === id){
          this.setData({
            ['items4['+i+'].isChoose']:true
          })
        }else{
          this.setData({
            ['items4['+i+'].isChoose']:false
          })          
        }
      }
    }else{//选中->未选中
      for(let i=0;i<this.data.items4.length;i++){
        if(this.data.items4[i].id === id){
          this.setData({
            ['items4['+i+'].isChoose']:false
          })
        }
      }
    }
  },
  deleteAction(e) {
    dd.confirm({
      title: '删除活动',
      content: '是否删除该活动？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let id = e.target.dataset.value;
          let arr = this.data.items4;
          for(let i=0;i<arr.length;i++){
            if(arr[i].id === id){
              arr.splice(i,1);
              break
            }
          }
          this.setData({
            items4:arr
          });
        }
      }
    });
  },
  addAction() {
    let arr = this.data.items4;
    arr.sort(this.orderActionId);
    let maxId = arr[arr.length - 1].id;
    let obj = {
      id:parseInt(maxId) + 1,
      name: '活动'+ (parseInt(maxId) + 1),
      isChoose: false,
      content:''
    }
    arr.push(obj);
    this.setData({
      items4:arr
    });
  },
  orderActionId(a,b) {
    let a_id = parseInt(a.id);
    let b_id = parseInt(b.id);
    return a_id - b_id;
  },
  refreshPreview() {
    dd.alert({
      content:'刷新预览'
    });
  },
  toThirdStep() {
    dd.navigateTo({
      url: '../report_thirdStep/report_thirdStep'
    })    
  },
  getActionFormAndStandard() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/programme/selPromoTypeText',
      method: 'GET',
      data: {
        userId: _this.data.userId,
        promoType: 2,
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        _this.setData({
          standard:res.data.data.standard,
          formText:res.data.data.formtext
        });
      }
    });
  },
  getActivityObjects() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selObjectElement',
      method: 'GET',
      data: {
        promoType: 2,
      },
      dataType: 'json',
      success: function(res) {
        let objects = _this.data.objects;
        let newArr = objects.concat(res.data.data);
        console.log(newArr)
        _this.setData({
          objects:newArr
        });
      }
    });   
  }
});
