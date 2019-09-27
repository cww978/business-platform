import request from '../util/request'

/**
 * 保存执行登记
 * @param executeType int
 * @param location String
 * @param userId int
 * @param activityId String
 * @param companyId int
 * @param targetId int
 * @param imgs String
 * @param custCode String
 * @param longitude String
 * @param latitude String
 * @param resources Arrary
 * @param otherPoints Arrary
 * @param investigation String
 * @param investTarget String
 */
export function saveProgrammeImplement(param){
  console.log('保存执行登记', param)
  return request({
    url: '/programExecute/saveProgrammeImplement',
    data: param,
    loading: true,
    dataType: 'json',
    method: 'post'
  })
}

/**
 * 保存样烟调研
 * @param id int
 * @param regId int
 * @param testTime String
 * @param testDest String
 * @param adsgoodsId String
 * @param tobaQty int
 * @param personCount int
 * @param price String
 * @param packing String
 * @param taste String
 * @param suggestContent String
 */
export function saveInvestigationQuestion(param){
  console.log('保存样烟调研', param)
  return request({
    url: '/programExecute/saveInvestigationQuestion',
    loading: true,
    data: param,
    dataType: 'json',
    method: 'post'
  })
}

/**
 * 查询方案其他要素
 * @param activityId int
 */
export function selPromoItem(param){
  console.log('查询方案其他要素', param)
  return request({
    url: '/programExecute/selPromoItem',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 查询方案是否需要调研
 * @param activityId int
 */
export function selProgrammeInvestigation(param){
  console.log('查询方案是否需要调研', param)
  return request({
    url: '/programExecute/selProgrammeInvestigation',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 查询方案资源明细
 * @param userId String
 * @param companyId String
 * @param activityId int
 * @param executetype int
 */
export function selResourcesDetail(param){
  console.log('查询方案资源明细', param)
  return request({
    url: '/programExecute/selResourcesDetail',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 查询地市下的方案编码
 * @param userId String
 * @param companyId String
 */
export function selActivityCode(param){
  console.log('查询地市下的方案编码', param)
  return request({
    url: '/programExecute/selActivityCode',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}