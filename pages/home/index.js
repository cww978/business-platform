import { getUserMenus } from '../../api/user'
let app = getApp()
Page({
  data: {
    loading: true,
    hasLine: false,
    menus: [
      {
        path: '/pages/programme/report/report',
        icon: 'report.png',
        text: '方案申报'
      },
      {
        path: '/pages/programme/assess/assess',
        icon: 'assess.png',
        text: '方案评估'
      },
      {
        path: '/pages/programme/verify/verify',
        icon: 'verify.png',
        text: '方案审核'
      },
      {
        path: '/pages/programme/sample/sample',
        icon: 'sample.png',
        text: '评估抽查'
      },
      {
        path: '/pages/common/areaAndYearMonth/areaAndYearMonth?type=check',
        icon: 'check.png',
        text: '销区盘点'
      },
      {
        path: '/pages/common/areaAndYearMonth/areaAndYearMonth?type=locking',
        icon: 'locking.png',
        text: '销区关账'
      },
      {
        path: '/pages/common/areaAndYearMonth/areaAndYearMonth?type=settle',
        icon: 'settle.png',
        text: '销区月账'
      },
      {
        icon: 'registration.png',
        text: '执行登记',
        child: [
          { path: '/pages/registration/registration', text: '方案执行登记' },
          { path: '/pages/noregistration/noregistration', text: '非方案执行登记' }
        ]
      }
    ]
  },
  onLoad(query) {},
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
