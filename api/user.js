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
        path: 'https://gw.alipayobjects.com/',
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png',
        text: '执行登记'
      }
    ]
    console.log('api-user-getUserMenu', '请求ing')
    resolve(list)
  })
}