import request from '../util/request'
/**
 * 获取用户信息
 * 256634511022855974
 * 0100271822890151
 * @param authCode String
 */
export function getUserInfo(params){
  return new Promise(resolve => {
    console.log('获取用户信息', params)
    resolve({
      userId: '0100271822890151',
      userName: ''
    })
  })
}

/**
 * 获取用户菜单
 * @param
 */
export function getUserMenus(){
  return new Promise(resolve => {
    resolve(list)
  })
}