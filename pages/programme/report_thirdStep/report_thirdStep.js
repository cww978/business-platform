// 生成 app 实例
var app = getApp();
let _ratio = 750 / app.globalData.systemInfo.screenWidth;
let domain = app.globalData.domain

Page({
  data: {
    bodyHeight:app.globalData.systemInfo.windowHeight * _ratio,//遮罩层高度
    srcollviewHeight:app.globalData.systemInfo.windowHeight * _ratio - 100 - 100,//滚动区高度
    srcollviewHeight2:app.globalData.systemInfo.windowHeight * _ratio - 100,//滚动区高度
    store_showAlert:false,
    cost_showAlert:false,
    activityId:'',
    userId:'0100271822890151',
    items1:[1,2,3,4],
    items2:[1,2,3,4],
    selectedCost:[],
    ifChooseStore:'请选择促销烟随货的到货库点',
    areas:[],
    areaArrIndex:0,
    pros:[],
    proArrIndex:0,
    cities:[],
    cityArrIndex:0,
    stores:[],
    storeArrIndex:0,
    areaList:[],
    provList:[],
    cityList:[],
    stationList:[], 
    address:[{
      destId:-1,
      destName:'请选择到货地址'
    }],
    addressArrIndex:0,    
    cost:[],           
  },
  onLoad() {
    dd.getStorage({
      key: 'report_options',
      success: function(res) {
        let option = res.data;
        if(option === 'add'){
          dd.setNavigationBar({
            title: '新增方案(3/3)',
          });
        } else {
          dd.setNavigationBar({
            title: '修改方案(3/3)',
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
    this.getCostList();
    this.getArriveAddress();
    this.getStoreList();
  },
  selectStore() {
    this.setData({
      store_showAlert:true
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
    this.selectStation();
  },
  storeChange(e){
    this.setData({
      storeArrIndex: e.detail.value
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
    this.selectStation(); 
  },
  selectStation() {
    let cityCode = this.data.cities[this.data.cityArrIndex].cityCode;
    let stores = [{
      stationId:'-1',
      stationName:'请选择库点'
    }];
    for(let i=0;i<this.data.stationList.length;i++){
      if(this.data.stationList[i].cityCode === cityCode){
        stores.push(this.data.stationList[i]);
      }
    }
    this.setData({
      stores:stores,
      storeArrIndex:0
    });
  },  
  closeStoreAlert() {
    let storeStr = '';
    let areaArrIndex = this.data.areaArrIndex;
    if(areaArrIndex > 0) {
      storeStr = this.data.areas[areaArrIndex].areaName;
    }
    let proArrIndex = this.data.proArrIndex;
    if(proArrIndex > 0) {
      if(storeStr === '') {
        storeStr = this.data.pros[proArrIndex].provName;
      }else{
        storeStr = storeStr +'-'+ this.data.pros[proArrIndex].provName;
      }
    }
    let cityArrIndex = this.data.cityArrIndex;
    if(cityArrIndex > 0) {
      if(storeStr === '') {
        storeStr = this.data.cities[cityArrIndex].cityName;
      }else{
        storeStr = storeStr +'-'+ this.data.cities[cityArrIndex].cityName;
      }
    }
    let storeArrIndex = this.data.storeArrIndex;
    if(storeArrIndex > 0) {
      if(storeStr === '') {
        storeStr = this.data.stores[storeArrIndex].stationName;
      }else{
        storeStr = storeStr +'-'+ this.data.stores[storeArrIndex].stationName;
      }
    }
    if(storeStr === '') {
      storeStr = '请选择促销烟随货的到货库点';
    }            
    this.setData({
      ifChooseStore:storeStr,
      store_showAlert:false
    });
  },
  addressChange(e) {
    this.setData({
      addressArrIndex: e.detail.value
    });    
  },
  isIncludeCost() {
    this.setData({
      ifIncludeCost:!this.data.ifIncludeCost
    });
  },
  addCost() {
    let nowCostList = this.data.selectedCost
    let allCostList = this.data.cost
    for(let i=0;i<allCostList.length;i++){
      for(let j=0;j<nowCostList.length;j++){
        if(nowCostList[j].feeTypeId === allCostList[i].feeTypeId){
          allCostList[i].feeTypeNum = nowCostList[j].feeTypeNum
          break
        }
      }
    }
    this.setData({
      cost:allCostList,
      cost_showAlert:true
    }); 
  },
  setCostNum(e) {
    let inputValue = e.detail.value;
    let index = e.target.dataset.index;
    let allCostList = this.data.cost;
    allCostList[index].feeTypeNum = inputValue;
    this.setData({
      cost:allCostList
    });    
  },
  closeCostAlert() {
    let allCostList = this.data.cost;
    let newArr = new Array();
    for(let i=0;i<allCostList.length;i++){
      if(allCostList[i].feeTypeNum * 1 > 0){
        let obj = {
          feeTypeId:allCostList[i].feeTypeId,
          feeTypeName:allCostList[i].feeTypeName,
          feeTypeNum:allCostList[i].feeTypeNum
        }
        newArr.push(obj);
      }
    }
    this.setData({
      selectedCost:newArr,
      cost_showAlert:false
    });
  },
  deleteCost(e) {
    let _this = this;
    dd.confirm({
      title: '删除其他费用',
      content: '是否删除该费用？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let feeTypeId = e.target.dataset.value;
          let allCostList = _this.data.cost;
          let nowCostList = _this.data.selectedCost;
          for(let i=0;i<allCostList.length;i++){
            if(allCostList[i].feeTypeId === feeTypeId){
              allCostList[i].feeTypeNum = ''
              break
            }
          }
          for(let i=0;i<nowCostList.length;i++){
            if(nowCostList[i].feeTypeId === feeTypeId){
              nowCostList.splice(i,1)
              break
            }
          }
          _this.setData({
            cost:allCostList,
            selectedCost:nowCostList
          });
        }
      }
    });    
  },
  getCostList() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selFeeType',
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        let arr = res.data.data;
        let newArr = new Array();
        for(let i=0;i<arr.length;i++) {
          let obj = {
            feeTypeId:arr[i].feeTypeId,
            feeTypeName:arr[i].feeTypeName,
            feeTypeNum:''
          }
          newArr.push(obj);
        }
        _this.setData({
          cost:newArr
        });
      }
    });    
  },
  getArriveAddress() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selDestAddress',
      method: 'GET',
      data:{
        companyId:98
      },
      dataType: 'json',
      success: function(res) {
        let address = _this.data.address;
        let newArr = address.concat(res.data.data);
        console.log(newArr)
        _this.setData({
          address:newArr
        });
      }
    });    
  },
  getStoreList() {
    let _this = this;
    dd.httpRequest({
      url: domain + '/shareHelp/selSynthesizeSite',
      method: 'GET',
      data:{
        userId: this.data.userId
      },
      dataType: 'json',
      success: function(res) {
        _this.setData({
          areaList:res.data.data.areaList,
          provList:res.data.data.provList,
          cityList:res.data.data.cityList,
          stationList:res.data.data.stationList
        });
        _this.selectArea();        
      }
    });    
  }        
});
