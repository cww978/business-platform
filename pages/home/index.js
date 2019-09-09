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
    app.globalData.childMenus = childs
    dd.navigateTo({
      url: `child/child?title=${title}`
    })
  }
})
