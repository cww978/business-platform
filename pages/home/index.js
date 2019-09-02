import { getUserMenus } from '../../api/user'
let app = getApp()
Page({
  data: {
    hasLine: false,
    menus: []
  },
  onLoad(query) {
    // 获取权限菜单
    getUserMenus().then((data) => {
      this.setData({ menus: data })
    })
  },
  onItemClick(e){
    let childs = this.data.menus[e.detail.index].child
    let title = this.data.menus[e.detail.index].text
    app.globalData.childMenus = childs
    dd.navigateTo({
      url: `./child/child?title=${title}`
    })
  }
})
