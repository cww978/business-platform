import request from '../util/request'

/**
 * 查询执行单详细信息
 * @param regId String
 */
export function selRegDetail(param){
  console.log('查询执行单详细信息', param)
  return request({
    url: '/programExecute/selRegDetail',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}


/**
 * 判断地区是否已经锁定关账
 * @param companyId String
 */
export function selActivityAccount(param){
  console.log('判断地区是否已经锁定关账', param)
  return request({
    url: '/programExecute/selActivityAccount',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 查询终端公司方案
 * @param userId String
 * @param companyId String
 * @param type String
 */
export function selTerminalActivityCode(param){
  console.log('查询终端公司方案', param)
  return request({
    url: '/programExecute/selTerminalActivityCode',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 保存非方案执行登记
 * @param activityId int
 * @param location String
 * @param userId int
 * @param companyId int
 * @param themeId String
 * @param promoTypeId String
 * @param targetId int
 * @param personNum int
 * @param executeType int
 * @param form String
 * @param imgs String
 * @param custCode String
 * @param longitude String
 * @param latitude String
 */
export function saveNoProgrammeImplement(param){
  console.log('保存非方案执行登记', param)
  return request({
    url: '/programExecute/saveNoProgrammeImplement',
    data: param,
    loading: true,
    dataType: 'json',
    method: 'post'
  })
}

/**
 * 确认收货
 * @param regIdStr String
 */
export function saveConfirmResources(param){
  console.log('确认收货', param)
  return request({
    url: '/programExecute/saveConfirmResources',
    data: param,
    loading: true,
    dataType: 'json',
    method: 'post'
  })
}

/**
 * 提交分配方案
 * @param activityId int
 * @param userId int
 * @param companyId int
 * @param terminalCompanyId int
 * @param personNum int
 * @param resources String
 * @param standard String
 */
export function saveResolveCompany(param){
  console.log('查询终端公司分配到的资源', param)
  return request({
    url: '/programExecute/saveResolveCompany',
    data: param,
    loading: true,
    dataType: 'json',
    method: 'post'
  })
}

/**
 * 查询终端公司分配到的资源
 * @param terminalCompanyId int
 */
export function selResourcesDistribution(param){
  console.log('查询终端公司分配到的资源', param)
  return request({
    url: '/programExecute/selResourcesDistribution',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

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
    loading: false,
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
    loading: false,
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
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}