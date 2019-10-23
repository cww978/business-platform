import request from '../util/request'
/**
 * 获取用户信息
 * 256634511022855974
 * 0100271822890151
 * @param authCode String
 */
export function getUserInfo(param){
    return request({
      url: '/login',
      baseUrl: 'DD_SERVER_URL',
      param: param,
      loading: true,
      dataType: 'json',
      method: 'get'
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