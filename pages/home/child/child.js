let app = getApp()
Page({
  data: {
    menus: []
  },
  clickMenu(e){
    console.info('path', this.data.menus[e.info].path)
  },
  onLoad(options) {
    //修改title
    dd.setNavigationBar({
      title: options.title
    })
    this.setData({menus: app.globalData.childMenus})
  },
});
