let app = getApp()
Page({
  data: {
    menus: []
  },
  clickMenu(e){
    dd.navigateTo({
      url: e.target.dataset.path
    })
  },
  onLoad(options) {
    //修改title
    dd.setNavigationBar({
      title: options.title
    })
    this.setData({menus: app.globalData.childMenus})
  },
});
