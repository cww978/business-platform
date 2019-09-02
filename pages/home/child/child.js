let app = getApp()
Page({
  data: {
    menus: []
  },
  onLoad(options) {
    dd.setNavigationBar({
      title: options.title  //修改title
    })
    this.setData({menus: app.globalData.childMenus})
  },
});
