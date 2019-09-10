import { getUserMenus } from '../../api/user'
let app = getApp()
Page({
  data: {
    loading: true,
    hasLine: false,
    menus: []
  },
  onLoad(query) {
    // 获取权限菜单
    getUserMenus().then((data) => {
      this.setData({ menus: data })
    })
    let that = this
    setTimeout(()=>{
      that.setData({ loading: false })
    }, 2000)
  },
  onItemClick(event){
    let index = event.target.dataset.index
    let childs = this.data.menus[index].child
    let title = this.data.menus[index].text
    let path = this.data.menus[index].path
    app.globalData.childMenus = childs
    if (childs instanceof Array) {
      dd.navigateTo({
        url: `child/child?title=${title}`
      })
    } else {
      dd.navigateTo({
        url: path
      })
    }
  }
})
