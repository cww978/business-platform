// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain

Page({
  data: {
    bodyHeight:app.globalData.systemInfo.windowHeight * _ratio,//遮罩层高度
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 100,//滚动区高度
    toba_showAlert:false,
    goods_showAlert:false,
    area_showAlert:false,
    toba_checkedAlert:false,
    goods_checkedAlert:false,
    activityId:'',
    userId:'0100271822890151',
    themes:[],
    themesArrIndex:0,
    themesList:[],
    activityType:[],
    typeArrIndex:0,
    activityTypeList:[],    
    startDate:'2019-09-17',
    endDate:'2019-09-17',
    tobaType:[{
      tobaTypeId:-1,
      tobaTypeName:'请选择样烟类型'
    },{
      tobaTypeId:1,
      tobaTypeName:'市场营销烟'
    },{
      tobaTypeId:2,
      tobaTypeName:'品吸烟'
    },{
      tobaTypeId:3,
      tobaTypeName:'试制烟'
    }],
    tobaTypeArrIndex:0,
    ifChooseToba:'请选择样烟',
    tobas:[],
    tobaArrIndex:0,
    tobaList:[],
    tobaCheckedList:[],
    tobaCheckedNum:0,
    ifChooseGoods:'请选择物料',
    goods:[],
    goodsArrIndex:0,
    goodsList:[],
    goodsCheckedList:[],
    goodsCheckedNum:0,    
    ifChooseArea:'请选择销区',
    areas:[],
    areaArrIndex:0,
    pros:[],
    proArrIndex:0,
    cities:[],
    cityArrIndex:0,
    counts:[],
    countArrIndex:0,
    areaList:[],
    provList:[],
    cityList:[],
    countyList:[]            
  },
  onLoad() {
    dd.getStorage({
      key: 'report_options',
      success: function(res) {
        let option = res.data;
        if(option === 'add'){
          dd.setNavigationBar({
            title: '新增方案(1/3)',
          });
        } else {
          dd.setNavigationBar({
            title: '修改方案(1/3)',
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
    this.getThemeAndTypeList();
    this.getTobaList();
    this.getGoodsList();
    this.getAreaList();
    this.getDate();   
  },
  themeChange(e) {
    this.setData({
      themesArrIndex: e.detail.value
    }); 
    this.selectActivityType();   
  },
  activityTypeChange(e) {
    this.setData({
      typeArrIndex: e.detail.value
    });    
  },
  selectThemes() {
    let themes = [{
      themeId:-1,
      themeName:'请选择主题'
    }];
    let themesList = this.data.themesList;
    this.setData({
      themes:themes.concat(themesList),
      themesArrIndex:0
    });
    this.selectActivityType()
  },
  selectActivityType() {
    let themeId = this.data.themes[this.data.themesArrIndex].themeId
    let activityType = [{
      promotypeId:-1,
      promotypeName:'请选择活动类型'
    }]
    for(let i=0;i<this.data.activityTypeList.length;i++){
      if(this.data.activityTypeList[i].themeId === themeId){
        activityType.push(this.data.activityTypeList[i]);
      }
    }
    this.setData({
      activityType:activityType,
      typeArrIndex:0
    });
  },
  selectStartDate() {
    let _this = this;   
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: _this.data.startDate,
      success: (res) => {
        _this.setData({
          startDate:res.date
        })              
      }
    });
  },
  selectEndDate() {
    let _this = this;   
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: _this.data.endDate,
      success: (res) => {
        _this.setData({
          endDate:res.date
        })              
      }
    });
  },
  tobaTypeChange(e) {
    this.setData({
      tobaTypeArrIndex: e.detail.value
    });
    this.selectToba();
  },
  selectToba() {
    let tobaTypeId = this.data.tobaType[this.data.tobaTypeArrIndex].tobaTypeId
    let tobaList = this.data.tobaList;
    let tobas = new Array();
    for(let i=0;i<tobaList.length;i++){
      if(tobaList[i].TOBA_TYPE * 1 === tobaTypeId) {
        tobas.push(tobaList[i]);
      }
    }
    this.setData({
      tobas:tobas
    });    
  },
  showToba() {
    let tobaTypeId = this.data.tobaType[this.data.tobaTypeArrIndex].tobaTypeId
    if(tobaTypeId * 1 === -1) {
      dd.alert({
        content:'请选择样烟类型！'
      });
      return false;
    }
    this.setData({
      toba_showAlert:true
    });
  },
  isChooseToba(e) {
    const index = e.target.dataset.index;
    let str = 'tobas['+index+'].ISCHECK';
    this.setData({
      [str]:this.data.tobas[index].ISCHECK * 1 > 0 ? 0 : 1
    });
    if(this.data.tobas[index].ISCHECK * 1 > 0) {
      let obj = {
        ORDERNUM:index * 1 +1,
        ADSGOODSID:this.data.tobas[index].ADSGOODSID,
        ADSGOODSNAME:this.data.tobas[index].ADSGOODSNAME
      }
      let tobaCheckedList = this.data.tobaCheckedList;
      tobaCheckedList.push(obj);
      this.setData({
        tobaCheckedList:tobaCheckedList,
        tobaCheckedNum:tobaCheckedList.length
      });
    } else {
      let tobaCheckedList = this.data.tobaCheckedList;
      for(let i=0;i<tobaCheckedList.length;i++){
        if(tobaCheckedList[i].ORDERNUM === (index * 1 +1)){
          tobaCheckedList.splice(i,1);
        }
      }
      this.setData({
        tobaCheckedList:tobaCheckedList,
        tobaCheckedNum:tobaCheckedList.length
      });
    }    
  },
  showTobaChecked(){
    this.setData({
      toba_checkedAlert: !this.data.toba_checkedAlert
    });
  },
  deleteAllSelectedToba() {
    let _this = this;
    dd.confirm({
      title: '删除选中样烟',
      content: '是否删除所有选中样烟？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          this.setData({
            tobaCheckedList:[],
            tobaCheckedNum:0,
            toba_checkedAlert:false
          });
          let tobas = _this.data.tobas;
          for(let i=0;i<tobas.length;i++){
            let str = 'tobas['+i+'].ISCHECK';
            _this.setData({
              [str]:0
            });
          }          
        }
      }
    });
  },
  cancel_checkedTobaAlert() {
    this.setData({
      toba_checkedAlert:false
    });    
  },
  deleteSelectedToba(e) {
    let adsgoodsid = e.target.dataset.adsgoodsid;
    let _this = this;
    dd.confirm({
      title: '删除选中样烟',
      content: '是否删除该选中样烟？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let tobaCheckedList = _this.data.tobaCheckedList;
          for(let i=0;i<tobaCheckedList.length;i++){
            if(tobaCheckedList[i].ADSGOODSID === adsgoodsid){
              tobaCheckedList.splice(i,1);
              this.setData({
                tobaCheckedList:tobaCheckedList,
                tobaCheckedNum:tobaCheckedList.length
              }); 
              if(tobaCheckedList.length*1 === 0){
                this.setData({
                  toba_checkedAlert:false
                });                
              }        
            }
          }
          let tobas = _this.data.tobas;
          for(let i=0;i<tobas.length;i++){
            if(tobas[i].ADSGOODSID === adsgoodsid){
              let str = 'tobas['+i+'].ISCHECK';
              _this.setData({
                [str]:0
              });
            }
          }          
        }
      }
    });
  },
  closeTobaAlert() {
    let length = this.data.tobaCheckedList.length;
    if(length*1 >0){
      this.setData({
        ifChooseToba:'已选择样烟'
      });
    }else {
      this.setData({
        ifChooseToba:'请选择样烟'
      });
    }
    this.setData({
      toba_checkedAlert:false,
      toba_showAlert:false
    });
  },
  showGoods() {
    this.setData({
      goods_showAlert:true
    });    
  },
  isChooseGoods(e) {
    const index = e.target.dataset.index;
    let str = 'goods['+index+'].ISCHECK';
    this.setData({
      [str]:this.data.goods[index].ISCHECK * 1 > 0 ? 0 : 1
    });
    if(this.data.goods[index].ISCHECK * 1 > 0) {
      let obj = {
        ORDERNUM:index * 1 +1,
        ADSGOODSID:this.data.goods[index].ADSGOODSID,
        ADSGOODSNAME:this.data.goods[index].ADSGOODSNAME
      }
      let goodsCheckedList = this.data.goodsCheckedList;
      goodsCheckedList.push(obj);
      this.setData({
        goodsCheckedList:goodsCheckedList,
        goodsCheckedNum:goodsCheckedList.length
      });
    } else {
      let goodsCheckedList = this.data.goodsCheckedList;
      for(let i=0;i<goodsCheckedList.length;i++){
        if(goodsCheckedList[i].ORDERNUM === (index * 1 +1)){
          goodsCheckedList.splice(i,1);
        }
      }
      this.setData({
        goodsCheckedList:goodsCheckedList,
        goodsCheckedNum:goodsCheckedList.length
      });
    }    
  },
  showGoodsChecked(){
    this.setData({
      goods_checkedAlert:!this.data.goods_checkedAlert
    });    
  },
  deleteAllSelectedGoods() {
    let _this = this;
    dd.confirm({
      title: '删除选中物料',
      content: '是否删除所有选中物料？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          this.setData({
            goodsCheckedList:[],
            goodsCheckedNum:0,
            goods_checkedAlert:false
          });
          let goods = _this.data.goods;
          for(let i=0;i<goods.length;i++){
            let str = 'goods['+i+'].ISCHECK';
            _this.setData({
              [str]:0
            });
          }          
        }
      }
    });
  },
  cancel_checkedGoodsAlert() {
    this.setData({
      goods_checkedAlert:false
    });    
  },
  deleteSelectedGoods(e) {
    let adsgoodsid = e.target.dataset.adsgoodsid;
    let _this = this;
    dd.confirm({
      title: '删除选中物料',
      content: '是否删除该选中物料？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let goodsCheckedList = _this.data.goodsCheckedList;
          for(let i=0;i<goodsCheckedList.length;i++){
            if(goodsCheckedList[i].ADSGOODSID === adsgoodsid){
              goodsCheckedList.splice(i,1);
              this.setData({
                goodsCheckedList:goodsCheckedList,
                goodsCheckedNum:goodsCheckedList.length
              }); 
              if(goodsCheckedList.length*1 === 0){
                this.setData({
                  goods_checkedAlert:false
                });                
              }        
            }
          }
          let goods = _this.data.goods;
          for(let i=0;i<goods.length;i++){
            if(goods[i].ADSGOODSID === adsgoodsid){
              let str = 'goods['+i+'].ISCHECK';
              _this.setData({
                [str]:0
              });
            }
          }          
        }
      }
    });
  },  
  closeGoodsAlert() {
    let length = this.data.goodsCheckedList.length;
    if(length*1 >0){
      this.setData({
        ifChooseGoods:'已选择物料'
      });
    }else {
      this.setData({
        ifChooseGoods:'请选择物料'
      });
    }
    this.setData({
      goods_checkedAlert:false,
      goods_showAlert:false
    });
  },  
  openArea() {
    this.setData({
      area_showAlert:true
    });
  },
  areaChange(e){
    this.setData({
      areaArrIndex: e.detail.value
    });
    this.selectPro();
  },
  proChange(e){
    this.setData({
      proArrIndex: e.detail.value
    });
    this.selectCity();
  },
  cityChange(e){
    this.setData({
      cityArrIndex: e.detail.value
    });
    this.selectCounty();
  },
  countChange(e){
    this.setData({
      countArrIndex: e.detail.value
    });
  },
  selectArea() {
    let areas = [{
      areaCode:'-1',
      areaName:'请选择区域'
    }];
    let areaList = this.data.areaList; 
    this.setData({
      areas:areas.concat(areaList),
      areaArrIndex:0
    });
    this.selectPro();
  },   
  selectPro() {
    let areaCode = this.data.areas[this.data.areaArrIndex].areaCode;
    let pros = [{
      provCode:'-1',
      provName:'请选择省份'
    }];
    for(let i=0;i<this.data.provList.length;i++){
      if(this.data.provList[i].parentCode === areaCode){
        pros.push(this.data.provList[i]);
      }
    }
    this.setData({
      pros:pros,
      proArrIndex:0
    });
    this.selectCity();
  },
  selectCity() {
    let provCode = this.data.pros[this.data.proArrIndex].provCode;
    let cities = [{
      cityCode:'-1',
      cityName:'请选择地市'
    }];
    for(let i=0;i<this.data.cityList.length;i++){
      if(this.data.cityList[i].parentCode === provCode){
        cities.push(this.data.cityList[i]);
      }
    }
    this.setData({
      cities:cities,
      cityArrIndex:0
    });
    this.selectCounty(); 
  },
  selectCounty() {
    let cityCode = this.data.cities[this.data.cityArrIndex].cityCode;
    let counts = [{
      countyId:'-1',
      countyName:'请选择库点'
    }];
    for(let i=0;i<this.data.countyList.length;i++){
      if(this.data.countyList[i].cityCode === cityCode){
        counts.push(this.data.countyList[i]);
      }
    }
    this.setData({
      counts:counts,
      countArrIndex:0
    });
  },   
  closeAreaAlert() {
    let areaStr = '';
    let areaArrIndex = this.data.areaArrIndex;
    if(areaArrIndex > 0) {
      areaStr = this.data.areas[areaArrIndex].areaName;
    }
    let proArrIndex = this.data.proArrIndex;
    if(proArrIndex > 0) {
      if(areaStr === '') {
        areaStr = this.data.pros[proArrIndex].provName;
      }else{
        areaStr = areaStr +'-'+ this.data.pros[proArrIndex].provName;
      }
    }
    let cityArrIndex = this.data.cityArrIndex;
    if(cityArrIndex > 0) {
      if(areaStr === '') {
        areaStr = this.data.cities[cityArrIndex].cityName;
      }else{
        areaStr = areaStr +'-'+ this.data.cities[cityArrIndex].cityName;
      }
    }
    let countArrIndex = this.data.countArrIndex;
    if(countArrIndex > 0) {
      if(areaStr === '') {
        areaStr = this.data.counts[countArrIndex].countyName;
      }else{
        areaStr = areaStr +'-'+ this.data.counts[countArrIndex].countyName;
      }
    }
    if(areaStr === '') {
      areaStr = '请选择销区';
    }            
    this.setData({
      ifChooseArea:areaStr,
      area_showAlert:false
    });
  },
  toSecondStep() {
    dd.navigateTo({
      url: '../report_secondStep/report_secondStep'
    })
  },
  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month<=9 ? '0'+month : month;
    day = day<=9 ? '0'+day : day;
    this.setData({
      startDate:year + '-' + month + '-' + day,
      endDate:year + '-' + month + '-' + day
    });
  },  
  getTobaList() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selTobaList',
      method: 'GET',
      data: {
        userId: _this.data.userId,
        companyId: 98,
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        _this.setData({
          tobaList:res.data.data
        })
      }
    });
  },
  getGoodsList() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selAdsgoodsList',
      method: 'GET',
      data: {
        userId: this.data.userId,
        companyId:98
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        _this.setData({
          goods:res.data.data,
          goodsList:res.data.data
        });
      }
    });     
  },  
  getAreaList() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selSynthesizeArea',
      method: 'GET',
      data:{
        userId:_this.data.userId
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        _this.setData({
          areaList:res.data.data.areaList,
          provList:res.data.data.provList,
          cityList:res.data.data.cityList,
          countyList:res.data.data.countyList
        });
        _this.selectArea();      
      }
    });
  }, 
  getThemeAndTypeList() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selActivityThemePromo',
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        let arr = res.data.data;
        let activityTypeList = new Array();
        let themeslist = new Array();
        let theme_obj = new Object();
        for(let i=0;i<arr.length;i++) {
          activityTypeList.push({
            promotypeId:arr[i].promotypeId,
            promotypeName:arr[i].promotypeName,
            themeId:arr[i].themeId
          });
          if(!theme_obj[arr[i].themeId]) {
            themeslist.push({
              themeId:arr[i].themeId,
              themeName:arr[i].themeName
            });
            theme_obj[arr[i].themeId] = true;
          }
        }
        _this.setData({
          themesList:themeslist,
          activityTypeList:activityTypeList
        })
        _this.selectThemes();
      }
    });    
  }    
});
