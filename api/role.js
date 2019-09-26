import request from '../util/request'

/**
 * 获取角色执行登记权限
 * @param userId String
 */
export function selProgramExecuteRole(param){
  console.log('获取角色执行登记权限', param)
  return request({
    url: '/role/selProgramExecuteRole',
    param: param,
    dataType: 'json',
    method: 'get'
  })
}