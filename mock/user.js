// 模拟数据
let Mock = require ('/util/mock')
/**
 * 获取该角色所属的终端公司
 * @param id String
 */
export function selUserCompany(param){
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        companyName: function() {
          return Mock.mock('@first()')
        },
        companyCode: /\d{5,10}/
      }
    })
    resolve(data)
  })
}