let app = getApp()
Page({
  data: {
    menus: []
  },
  clickMenu(e){
    console.info('path', this.data.menus[e.index].path)
  },
  onLoad(options) {
    dd.setNavigationBar({
      title: options.title  //修改title
    })
    this.setData({menus: app.globalData.childMenus})
  },
});
