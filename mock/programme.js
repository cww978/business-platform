// 模拟数据
let Mock = require ('/util/mock')

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
        'otherPoints|1-4': [{
          text: function() {
            return Mock.mock('@first()')
          },
          key: function() {
            return Mock.mock('@first()')
          },
          'type|1-3': 1,
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