import request from '../util/request'

/**
 * 获取活动类型
 * @param themeId int
 */
export function selPromotype(param){
  console.log('获取主题')
  return request({
    url: '/shareHelp/selPromotype',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 获取活动主题
 */
export function selTheme(){
  console.log('获取主题')
  return request({
    url: '/shareHelp/selTheme',
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 查询用户所属的终端公司
 * @param userId int
 */
export function selUserTerminalCompany(param){
  console.log('查询用户所属的终端公司', param)
  return request({
    url: '/shareHelp/selUserTerminalCompany',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 获取商业公司下面终端公司列表
 * @param companyId String
 */
export function selterminalCompany(param){
  console.log('获取商业公司下面终端公司列表', param)
  return request({
    url: '/shareHelp/selterminalCompany',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 获取样烟列表
 * @param userId String
 * @param companyId String
 */
export function selTobaList(param){
  console.log('获取样烟列表', param)
  return request({
    url: '/shareHelp/selTobaList',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 获取物资列表
 * @param userId String
 * @param companyId String
 */
export function selAdsgoodsList(param){
  console.log('获取物资列表', param)
  return request({
    url: '/shareHelp/selAdsgoodsList',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 根据活动类型查询活动对象
 * @param promoType String
 */
export function selObjectElement(param){
  console.log('根据活动类型查询活动对象', param)
  return request({
    url: '/shareHelp/selObjectElement',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}


/**
 * 查询方案基本信息
 * @param userId String
 * @param activityId String
 */
export function selProgrammeInfo(param){
  param.menuType  = 4
  console.log('查询方案基本信息', param)
  return request({
    url: '/shareHelp/selProgrammeInfo',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 查询商业公司
 * @param userId String
 * @param provCode String
 */
export function selSalesArea(param){
  console.log('查询商业公司', param)
  return request({
    url: '/shareHelp/selSalesArea',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 通过省份查询地市
 * @param userId String
 * @param provCode String
 */
export function selCityByProv(param){
  console.log('通过省份查询地市', param)
  return request({
    url: '/shareHelp/selCityByProv',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 通过区域查询省份列表
 * @param userId String
 * @param areaCode String
 */
export function selProvByArea(param){
  console.log('通过区域查询省份列表', param)
  return request({
    url: '/shareHelp/selProvByArea',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 获取区域列表
 * @param userId String
 */
export function selAreaByUser(param){
  console.log('获取区域列表', param)
  return request({
    url: '/shareHelp/selAreaByUser',
    param: param,
    loading: true,
    dataType: 'json',
    method: 'get'
  })
}

/**
 * 获取区域省份地市
 * @param userId String
 */
export function selSynthesizeSite(param){
  console.log('获取区域省份地市', param)
  return request({
    url: '/shareHelp/selSynthesizeSite',
    param: param,
    dataType: 'json',
    method: 'get'
  })
}
