import request from '../util/request'

/**
 * 根据关键字搜索零售户
 * @param param String
 * @param userId String
 */
export function selRetailersByParam(param){
  console.log('根据坐标获取零售户', param)
  return request({
    url: '/retailer/selRetailersByParam',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 根据坐标获取零售户
 * @param longitude String
 * @param latitude String
 */
export function selRetailersFromCoord(param){
  console.log('根据坐标获取零售户', param)
  return request({
    url: '/retailer/selRetailersFromCoord',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}
