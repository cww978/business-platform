import { uploadFile } from '/api/common'
Component({
  mixins: [],
  data: {},
  props: {
    urls: [],
    onDeleteImg: () => {},
    onUploadImg: () => {}
  },
  didMount() {
    if (this.props.urls.length > 0) {
      for (let item of this.props.urls) {
        if (('path' in item)) {
          if (!('id' in item)) {
            console.error('图片', '没有id')
          }
        } else {
          console.error('图片', '没有path')
        }
      }
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 点击图片
    actionImage(e) {
      let index = e.target.dataset.index
      let that = this
      dd.showActionSheet({
        items: ['查看图片', '删除'],
        cancelButtonText: '取消',
        success: (res) => {
          if (res.index == 0) {
            let showImgs = []
            for (let img of that.props.urls) {
              showImgs.push(img.path)
            }
            dd.previewImage({
              current: index,
              urls: showImgs
            })
          } else if (res.index == 1) {
            let imgs = that.props.urls
            imgs.splice(index, 1)
            that.setData({ urls: imgs })
            this.props.onDeleteImg(imgs)
          }
        }
      })
    },
    // 选择上传图片
    chooseImage() {
      dd.chooseImage({
        success: res => {
          const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0])
          uploadFile(path).then(res => {
            let imgs = this.props.urls
            imgs.push(res)
            this.setData({ urls: imgs })
            this.props.onUploadImg(imgs)
          }).catch((e) => {
            dd.showToast({ content: '上传图片失败' })
          })
        }
      })
    }
  }
});
