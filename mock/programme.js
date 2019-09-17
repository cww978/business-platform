// 模拟数据
let Mock = require ('/util/mock')

/**
 * 执行方案
 * @param cityCode String
 */
export function saveProgrammeImplement(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    console.log('方案执行:', param)
    resolve(data)
  })
}

/**
 * 保存调研信息
 * @param cityCode String
 */
export function saveInvestigationQuestion(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        id: /\d{5,10}/
      }
    })
    console.log('保存调研信息:', param)
    resolve(data)
  })
}

/**
 * 查询方案是否需要调研 
 * @param cityCode String
 */
export function selProgrammeInvestigation(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        id: /\d{5,10}/,
        'objectives|3-5': [{
          text: function() {
            return Mock.mock('@first()')
          },
          id:/\d{5,10}/
        }]
      }
    })
    console.log('获取方案编码:', param)
    resolve(data)
  })
}

/**
 * 根据位置、关键字搜索零售户 
 * @param cityCode String
 */
export function selRetailersFromCoord(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|1-30': [{
        name:function() {
          return Mock.mock('@first()')
        },
        address: function() {
          return Mock.mock('@first(5)')
        },
        longitude: /\d{5,10}/,
        latitude: /\d{5,10}/,
        id: /\d{5,10}/
      }]
    })
    console.log('获取方案编码:', param)
    resolve(data)
  })
}

/**
 * 根据地市编码获取方案编码 
 * @param cityCode String
 */
export function selProgrammeCodes(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|1-30': [{
        name:function() {
          return Mock.mock('@first()')
        },
        code: /\d{5,10}/,
        id: /\d{5,10}/
      }]
    })
    console.log('获取方案编码:', param)
    resolve(data)
  })
}
/**
 * 分解至终端公司 
 * @param id String
 * @param companyCode String
 * @param mans int
 * @param resources Array
 */
export function saveResolveCompany(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    console.log('分解至终端公司:', param)
    resolve(data)
  })
}

/**
 * 获取该角色所属的终端公司
 * @param id String
 */
export function selCompanys(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|1-30': [{
        companyName: function() {
          return Mock.mock('@first()')
        },
        companyCode: /\d{5,10}/
      }]
    })
    resolve(data)
  })
}

/**
 * 根据方案ID查询方案信息
 * @param id String
 */
export function selProgrammeInfo(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        modality: function() {
          return Mock.mock('@title(20)')
        },
        themeName: function() {
          return Mock.mock('@title(10)')
        },
        typeNmae: function() {
          return Mock.mock('@first(10)')
        },
        time: function() {
          return Mock.mock('@datetime(yyyy-MM-dd)')
        },
        'investigation|0-1': 1,
        typeId: /\d{5,10}/,
        themeId: /\d{5,10}/,
        'targets|1-4': [{
          name: function() {
            return Mock.mock('@first()')
          },
          'type|1-3': 1,
          id: /\d{5,10}/
        }],
        'otherPoints|2-5': [{
          text: function() {
            return Mock.mock('@first()')
          },
          key: function() {
            return Mock.mock('@first()')
          },
          'type|1-2': 1,
          id: /\d{5,10}/
        }],
        'resources|1-4': [{
          name: function() {
            return Mock.mock('@first()')
          },
          'qty|1-100': 1,
          id: /\d{5,10}/
        }]
      }
    })
    resolve(data)
  })
}