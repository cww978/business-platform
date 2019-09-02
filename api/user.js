import request from '../util/request'
/**
 * 获取用户信息
 * @param
 */
export function getUserInfo(){
  return new Promise(resolve => {
    console.log('api-user-getUserInfo', '请求ing')
    resolve()
  })
}

/**
 * 获取用户菜单
 * @param
 */
export function getUserMenus(){
  return new Promise(resolve => {
    let list = [
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '常规数据接入',
        child: [
          { text: '二支装品吸情况登记表', icon: ''},
          { text: '库存盘点', icon: ''},
          { text: '年度、季度、月度目标', icon: ''},
          { text: '客户经理操作协同计划', icon: ''},
          { text: '营销方案资源预报', icon: ''},
          { text: '婚庆营销开展计划', icon: ''},
          { text: '驻点品吸开展计划', icon: ''},
          { text: '品牌文化宣讲开展计划', icon: ''},
          { text: '营销方案申报', icon: ''},
          { text: '营销方案分级审批', icon: ''},
          { text: '营销方案评估', icon: ''},
          { text: '营销方案评估审核', icon: ''},
          { text: '营销方案评估抽查', icon: ''}
        ]
      },
      {
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '工作写实类数据',
        child: [
          { text: '驻点品吸写实数据录入', icon: ''},
          { text: '烟模陈列写实数据录入', icon: ''},
          { text: '微信群转发写实数据录入', icon: ''},
          { text: '集赞活动配置', icon: ''},
          { text: '集赞奖项配置', icon: ''},
          { text: '集赞写实数据录入', icon: ''},
          { text: '婚庆营销写实数据录入', icon: ''},
          { text: '工作写实类数据录入完成进度查询', icon: ''}
        ]
      }
    ]
    console.log('api-user-getUserMenu', '请求ing')
    resolve(list)
  })
}