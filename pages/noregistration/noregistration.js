import { selProgrammeInvestigation, saveNoProgrammeImplement } from '/mock/programme'
import { saveImage } from '/api/common'
import { selActivityThemes, selActivityTypesFromTheme, selActivityTargetsFromType } from '/mock/activity'
Page({
  data: {
    imgs: [],
    targets: [], //对象
    targetIndex: 0,
    themes: [],
    themeIndex: 0,
    types: [],
    typeIndex: 0,
    retail: {
      id: '',
      name: ''
    },
    // 提交表单数据
    form: {
      cityCode: '',
      themeId: '',
      modality: '',
      typeId: '',
      targetId: '',// 对象id
      retailId: '', // 零售户id
      imgs: '' // 现场图片
    }
  },
  clickAddress() {
    dd.alert({
      content: this.data.form.address,
      buttonText: '确定'
    })
  },
  inputTheme(e) {
    this.setData({
      'form.theme': e.detail.value
    })
  },
  inputModality(e) {
    this.setData({
      'form.modality': e.detail.value
    })
  },
  setRetail(retail) {
    this.setData({
      'retail.id': retail.id,
      'retail.name': retail.name
    })
  },
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
  openSearchPage() {
    dd.navigateTo({
      url: '/pages/common/search/search'
    })
  },
  save() {
    let retailId = this.data.retail.id
    let typeId = this.data.types[this.data.typeIndex].id
    let targetId = this.data.targets[this.data.targetIndex].id
    let themeId = this.data.themes[this.data.themeIndex].id
    let imgs = this.data.imgs.join(',')
    this.setData({
      'form.targetId': targetId,
      'form.retailId': retailId,
      'form.themeId': themeId,
      'form.typeId': typeId,
      'form.imgs': imgs
    })
    saveNoProgrammeImplement(this.data.form).then(res => {
      let type = res.data == 0 ? 'fail' : 'success'
      dd.navigateTo({
        url: `./result/result?type=${type}`
      })
    })
  },
  activityThemeChanged(e) {
    this.setData({
      themeIndex: e.detail.value
    })
    let that = this
    selActivityTypesFromTheme({themeId: that.data.themes[that.data.themeIndex]}).then(res2 => {
      that.setData({ types: res2.data })
      selActivityTargetsFromType({typeId: that.data.types[that.data.typeIndex]}).then(res3 => {
        that.setData({ targets: res3.data })
      })
    })
  },
  activityTypeChanged(e) {
    this.setData({
      typeIndex: e.detail.value
    })
    let that = this
    selActivityTargetsFromType({typeId: that.data.types[that.data.typeIndex]}).then(res3 => {
      that.setData({ targets: res3.data })
    })
  },
  activityTargetChanged(e) {
    this.setData({
      targetIndex: e.detail.value
    })
  },
  onReady() { 
    let that = this
    selActivityThemes().then(res1 => {
      that.setData({ themes: res1.data })
      selActivityTypesFromTheme({themeId: that.data.themes[that.data.themeIndex]}).then(res2 => {
        that.setData({ types: res2.data })
        selActivityTargetsFromType({typeId: that.data.types[that.data.typeIndex]}).then(res3 => {
          that.setData({ targets: res3.data })
        })
      })
    })
  },
  onLoad(options) {}
})
