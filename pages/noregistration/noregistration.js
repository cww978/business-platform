import { saveImage } from '/api/common'
import { selProgramExecuteRole } from '/api/role'
import { saveNoProgrammeImplement } from '/api/programExecute'
import { selTheme, selPromotype, selObjectElement } from '/api/shareHelp'
const app = getApp()
Page({
  data: {
    userId: 0,
    imgs: [],
    targets: [], //对象
    targetIndex: 0,
    themes: [],
    themeIndex: 0,
    types: [],
    pickerShow: false,
    citys: [],
    typeIndex: 0,
    retail: {
      id: '',
      name: ''
    },
    address: '',
    longitude: 0,
    latitude: 0,
    hasLocation: false,
    companyId: 0,
    companyText: '',
    modality: ''
  },
  // 跳转到选择商业公司页面
  clickCity() {
    dd.navigateTo({
      url: '/pages/common/selectCompany/selectCompany'
    })
  },
  // 设置商业公司
  setCityCode(e) {
    this.setData({
      companyId: e.city.code,
      companyText: e.city.name
    })
  },
  // 点击地址查看
  clickAddress() {
    dd.alert({
      content: this.data.address,
      buttonText: '确定'
    })
  },
  // 定位
  location() {
    return new Promise(resolve => {
      let that = this
      dd.getLocation({
        success(res){
          that.setData({
            hasLocation: true,
            address: res.address || '',
            longitude: res.longitude,
            latitude: res.latitude
          })
          resolve()
        },
        fail() {
          dd.showToast({ content: '定位失败' })
        }
      })
    })
  },
  // 监听输入活动形式
  inputModality(e) {
    this.setData({
      modality: e.detail.value
    })
  },
  // 设置零售户
  setRetail(retail) {
    this.setData({
      'retail.id': retail.id,
      'retail.name': retail.name
    })
  },
  // 点击图片
  actionImage(e) {
    let index = e.target.dataset.index
    let that = this
    dd.showActionSheet({
      items: ['查看图片', '删除'],
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index == 0) {
          dd.previewImage({
            current: index,
            urls: that.data.imgs
          })
        } else if (res.index == 1) {
          let imgs = that.data.imgs
          imgs.splice(index, 1)
          that.setData({
            imgs: imgs
          })
        }
      }
    })
  },
  chooseImage() {
    let that = this
    dd.chooseImage({
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0])
        saveImage(path).then(res => {
          let imgs = that.data.imgs
          imgs.push(res.data)
          that.setData({ imgs: imgs })
        }).catch(() => {
          dd.showToast({ content: '上传图片失败' })
        })
      }
    })
  },
  // 打开搜索零售户页面
  openSearchPage() {
    dd.navigateTo({
      url: '/pages/common/search/search'
    })
  },
  // 保存执行
  save() {
    // 验证是否选择了地市
    if (this.data.companyId != 0) {
      let retailId = this.data.retail.id
      let typeId = this.data.types[this.data.typeIndex].promotypeId
      let targetId = this.data.targets[this.data.targetIndex].targetId
      let themeId = this.data.themes[this.data.themeIndex].themeId
      let imgs = this.data.imgs.join(',')
      let param = {
        activityId: 0,
        location: this.data.address,
        userId: this.data.userId,
        companyId: this.data.companyId,
        themeId: themeId,
        promoTypeId: typeId,
        targetId: targetId,
        executeType: this.data.userType,
        form: this.data.modality,
        imgs: imgs,
        custCode: retailId,
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        personNum: 0,
      }
      saveNoProgrammeImplement(param).then(res => {
        let type = res.data.saveState == 0 ? 'success' : 'fail'
        dd.navigateTo({
          url: `/pages/common/result/result?type=${type}&title=${res.data.message}`
        })
      })
    } else {
      dd.showToast({ content: '请选择商业公司' })
    }
  },
  // 主题切换
  activityThemeChanged(e) {
    this.setData({
      themeIndex: e.detail.value
    })
    let that = this
    selPromotype({themeId: that.data.themes[that.data.themeIndex].themeId}).then(res2 => {
      that.setData({ types: res2.data })
      selObjectElement({promoType: that.data.types[that.data.typeIndex].promotypeId}).then(res3 => {
        that.setData({ targets: res3.data })
      })
    })
  },
  // 活动类型切换
  activityTypeChanged(e) {
    this.setData({
      typeIndex: e.detail.value
    })
    let that = this
    selObjectElement({promoType: that.data.types[that.data.typeIndex].promotypeId}).then(res3 => {
      that.setData({ targets: res3.data })
    })
  },
  // 活动对象切换
  activityTargetChanged(e) {
    this.setData({
      targetIndex: e.detail.value
    })
  },
  // 检测是否有权限执行操作非方案执行登记
  check() {
    if (this.data.userType != 1 && this.data.userType != 2) {
      dd.alert({
        title: '提示',
        content: '没有相关操作权限',
        buttonText: '知道了',
        success: () => {
          dd.navigateBack()
        },
      })
    }
  },
  onReady() {
    this.check()
    this.location()
    let that = this
    selTheme().then(res1 => {
      that.setData({ themes: res1.data })
      selPromotype({themeId: that.data.themes[that.data.themeIndex].themeId}).then(res2 => {
        that.setData({ types: res2.data })
        selObjectElement({promoType: that.data.types[that.data.typeIndex].promotypeId}).then(res3 => {
          that.setData({ targets: res3.data })
        })
      })
    })
  },
  onLoad(options) {
    this.setData({ userId: app.globalData.userInfo.userId })
    selProgramExecuteRole({ userId: this.data.userId }).then(res => {
      this.setData({ userType: res.data.type })
    })
  }
})
