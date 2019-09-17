import { selRetailersFromCoord } from '/mock/programme'
Page({
  data: {
    value: '',
    placeholder: '请输入零售户地址、店名、专卖证号',
    address: '',
    longitude: '',
    latitude: '',
    retails: [],
    hasLocation: false
  },
  onClear() {
    this.setData({ value: '' })
  },
  onInput(value){
    this.setData({ value: value })
  },
  location() {
    return new Promise(resolve => {
      let that = this
      dd.getLocation({
        success(res){
          console.log('位置', res.address)
          that.setData({
            hasLocation: true,
            address: res.address,
            longitude: res.longitude,
            latitude: res.latitude
          })
          resolve()
        },
        fail() {
          dd.alert({ title: '定位失败' })
        }
      })
    })
  },
  resLocationClick(){
    this.location().then(() => {
      selRetailersFromCoord().then(res => {
        this.setData({ retails: res.data })
      })
    })
  },
  onSubmit(val) {
    if (val != '') {
      selRetailersFromCoord().then(res => {
        this.setData({ retails: res.data })
      })
    }
  },
  onRetailClick(e) {
    let lastPage = getCurrentPages()[getCurrentPages().length - 2]
    lastPage.setRetail(this.data.retails[e.index])
    dd.navigateBack()
  },
  onLoad() {
    this.location().then(() => {
      selRetailersFromCoord().then(res => {
        this.setData({ retails: res.data })
      })
    })
  },
});
