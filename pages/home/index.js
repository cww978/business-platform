import { getUserMenus } from '../../api/user'
let app = getApp()
Page({
  data: {
    loading: true,
    hasLine: false,
    menus: [
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '方案申报'
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '方案评估'
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '方案审核'
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '评估抽查'
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '销区盘点'
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '销区关账'
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '销区结账'
      },
      {
        path: '/pages/registration/registration',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '执行登记'
      }
    ]
  },
  onLoad(query) {
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
