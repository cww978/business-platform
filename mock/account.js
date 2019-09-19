// 模拟数据
let Mock = require ('/util/mock')

/**
 * 查询入库出库账单
 */
export function saveAccounts(param){
  console.log('查询入库出库账单', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        'join|5-15': [{
          accountId: /\d{5,10}/,
          title: function() {
            return Mock.mock('@first()')
          },
          'tobaccos|1000-1500': 1,
          'products|1000-1500': 1,
          personName: function() {
            return Mock.mock('@first()')
          },
          date: function() {
            return Mock.mock('@datetime(yyyy-MM-dd)')
          }
        }],
        'out|5-15': [{
          accountId: /\d{5,10}/,
          title: function() {
            return Mock.mock('@first()')
          },
          'tobaccos|1000-1500': 1,
          'products|1000-1500': 1,
          personName: function() {
            return Mock.mock('@first()')
          },
          date: function() {
            return Mock.mock('@datetime(yyyy-MM-dd)')
          }
        }]
      }
    })
    resolve(data)
  })
}