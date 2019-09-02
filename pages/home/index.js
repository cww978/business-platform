import { getUserMenus } from '../../api/user'
Page({
  data: {
    hasLine: false,
    menus: []
  },
  onLoad(query) {
    // 获取权限菜单
    getUserMenus().then(() => {
      let list = [
        {
          path: 'https://gw.alipayobjects.com/',
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
          text: '产品盘库',
        },
        {
          path: 'https://gw.alipayobjects.com/',
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
          text: '品吸情况登记',
        },
        {
          path: 'https://gw.alipayobjects.com/',
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
          text: '协同计划',
        },
        {
          path: 'https://gw.alipayobjects.com/',
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
          text: '品牌文化宣讲',
        },
        {
          path: 'https://gw.alipayobjects.com/',
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
          text: '驻点品吸',
        },
        {
          path: 'https://gw.alipayobjects.com/',
          icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
          text: '婚庆营销',
        }
      ]
      this.setData({ menus: list })
    })
  },
  onItemClick(e){
    let path = this.data.menus[e.detail.index].path
    console.info('click', path)
    dd.showToast({
      content: path,
      duration: 2000
    })
  }
})
