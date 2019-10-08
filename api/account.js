import request from '../util/request'

/**
 * 获取销区出入账单
 * @param userId String
 * @param companyId String
 * @param month String
 * @param year String
 */
export function selAccounts(param){
  console.log('获取销区出入账单', param)
  return request({
    url: '/account/selAccounts',
    param: param,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 锁定销区
 * @param userId String
 * @param companyId String
 * @param month String
 * @param year String
 */
export function saveLockAccount(param){
  console.log('锁定销区', param)
  return request({
    url: '/account/saveLockAccount',
    data: param,
    dataType: 'json',
    method: 'post'
  })
}

/**
 * 查询库存盘点
 * @param userId String
 * @param companyId String
 * @param month String
 * @param year String
 */
export function selRegionStock(param){
  console.log('查询库存盘点', param)
  return request({
    url: '/account/selRegionStock',
    param: param,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 实物盘点
 * @param userId String
 * @param companyId String 
 * @param month String
 * @param year String
 * @param goodsinfo String
 * @param state String
 */
export function saveRegionStock(param){
  console.log('实物盘点', param)
  return request({
    url: '/account/saveRegionStock',
    data: param,
    dataType: 'json',
    method: 'post'
  })
}