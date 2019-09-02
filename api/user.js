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
    console.log('api-user-getUserMenu', '请求ing')
    resolve()
  })
}