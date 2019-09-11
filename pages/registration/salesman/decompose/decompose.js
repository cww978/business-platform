import { selCompanys } from '/mock/programme'

Page({
  data: {
    companys: [1,3,2,4,5,6],
    resources: [],
    mans: 5,
    defaultSplit: 5
  },
  inputMans(e){
    let inputValue = e.detail.value
    let resources = this.data.resources
    for (let item of resources) {
      item.split = inputValue * item.default
    }
    this.setData({
      mans: inputValue,
      resources: resources
    })
  },
  openCompanySelect(){
    my.multiLevelSelect({
      title: '请选择',
      list: this.data.companys,
      success: (res) => {
        debugger
      }
    })
  },
  inputSplit(e){
    let index = e.target.dataset.index
    let inputValue = e.detail.value
    let split = this.data.mans * inputValue
    let resources = this.data.resources
    resources[index].split = split
    resources[index].default = inputValue
    this.setData({
      resources: resources
    })
  },
  onLoad() {
    let that = this
    let resources = getCurrentPages()[getCurrentPages().length - 2].data.programme.resources
    for (let item of resources) {
      item.split = this.data.mans * this.data.defaultSplit
      item.default = this.data.defaultSplit
    }
    this.setData({
      resources: resources
    })
    // 查询终端公司列表
    // selCompanys().then((res) => {
    //   that.setData({
    //     companys: res.data
    //   })
    // })
  },
});
