import { getUserMenus } from '../../api/user'
import { selProgramExecuteRole } from '/api/role'
import { getUserInfo } from '/api/user'
let app = getApp()
//industry 中烟业务员角色
//terminal 终端公司管理员角色
//salesman 终端公司业务员角色
const roles = ['industry', 'terminal', 'salesman']
Page({
  data: {
    userType: -1,
    loading: true,
    hasLine: false,
    menus: [
      {
        path: '/pages/programme/report/report',
        icon: 'report.png',
        name: 'report',
        role: ['industry', 'terminal', 'salesman'],
        show: false,
        text: '方案申报'
      },
      {
        path: '/pages/programme/assess/assess',
        icon: 'assess.png',
        name: 'assess',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '方案评估'
      },
      {
        path: '/pages/programme/verify/verify',
        icon: 'verify.png',
        name: 'verify',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '方案审核'
      },
      {
        path: '/pages/programme/sample/sample',
        icon: 'sample.png',
        name: 'sample',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '评估抽查'
      },
      {
        path: '/pages/common/areaAndYearMonth/areaAndYearMonth?type=locking',
        icon: 'locking.png',
        name: 'locking',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '销区关账'
      },
      {
        path: '/pages/common/areaAndYearMonth/areaAndYearMonth?type=check',
        icon: 'check.png',
        name: 'check',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '销区盘点'
      },
      {
        path: '/pages/common/areaAndYearMonth/areaAndYearMonth?type=settle',
        icon: 'settle.png',
        name: 'settle',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '销区结账'
      },
      {
        path: '/pages/common/upload/upload',
        icon: 'upload.png',
        name: 'upload',
        show: false,
        role: ['industry', 'terminal', 'salesman'],
        text: '文件上传测试'
      },
      {
        icon: 'registration.png',
        name: 'registration',
        show: false,
        role: ['industry', 'terminal', 'salesman'], 
        text: '执行登记',
        child: [
          { role: ['terminal'], show: false ,path: '/pages/registration/registration', text: '终端确定收货' },
          { role: ['industry', 'salesman'], show: false ,path: '/pages/registration/registration', text: '方案执行登记' },
          { role: ['industry', 'salesman'], show: false, path: '/pages/noregistration/noregistration', text: '非方案执行登记' },
          { role: ['industry', 'salesman'], show: false, path: '/pages/registrationmodify/registrationmodify', text: '方案执行修改' }
        ]
      }
    ]
  },
  // 更新并保存个人信息
  updateUserInfo(){
    // 获取本地保存的用户信息
    return new Promise(resolve => {
      dd.getStorage({
        key: 'userInfo',
        success: function(res) {
          // 本地是否保存了用户信息
          if (res.data) {
            app.globalData.userInfo = res.data
          } else {
            // 获取授权码保存个人信息
            dd.getAuthCode({
              success:function(res){
                getUserInfo(res).then((data) => {
                  console.log('用户信息', data.result)
                  dd.setStorage('userInfo', data.result)
                  app.globalData.userInfo = data.result
                  resolve()
                  console.info('authcode', res)
                })
              }
            })
          }
        }
      })
    })
  },
  onReady() {
    this.updateUserInfo().then(() => {
      selProgramExecuteRole({ userId: app.globalData.userInfo.userId }).then(res => {
        app.globalData.registration['userType'] = res.data.type
        this.setData({ userType: res.data.type, loading: false })
        this.filterMenu()
      })
    })
  },
  // 根据人员角色过滤菜单
  filterMenu() {
    // 是终端管理员角色身份
    let menus = this.data.menus
    let role = roles[ parseInt(this.data.userType) - 1]
    for (let item of menus) {
      if (item.role.includes(role)) {
        item.show = true
      }
      if (item.child != void 0 && item.child.length > 0) {
        for (let child of item.child) {
          if (child.role.includes(role)) {
            child.show = true
          }
        }
      }
    }
    this.setData({ menus: menus })
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
