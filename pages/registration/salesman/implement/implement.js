Page({
  data: {
    resources: [],
    targets: [],
    otherPoints: [],
    targetId: '',
    imgs: [],
    targetIndex: 0,
    investigation: 0,
    programmeId: ''
  },
  targetPickerChange(e) {
    this.setData({
      targetId: this.data.targets[e.detail.value].id,
      targetIndex: e.detail.value
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
        let imgs = that.data.imgs
        imgs = imgs.concat(res.filePaths)
        that.setData({
          imgs: imgs
        })
      }
    })
  },
  inputResourcesUse(e) {
    let index = e.target.dataset.index
    let inputValue = e.detail.value
    let resources = this.data.resources
    resources[index].useNum = inputValue
    this.setData({
      resources: resources
    })
  },
  onLoad(options) {
    let that = this
    let resources = getCurrentPages()[getCurrentPages().length - 2].data.programme.resources
    let targets = getCurrentPages()[getCurrentPages().length - 2].data.programme.targets
    let otherPoints = getCurrentPages()[getCurrentPages().length - 2].data.programme.otherPoints
    let investigation = getCurrentPages()[getCurrentPages().length - 2].data.programme.investigation
    for (let item of resources) {
      item.useNum = 0
    }
    that.setData({
      investigation: investigation,
      resources: resources,
      targets: targets,
      otherPoints: otherPoints,
      programmeId: options.programmeId,
      targetId: targets[that.data.targetIndex].id
    })
  },
});
