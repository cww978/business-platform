// 模拟数据
let Mock = require ('/util/mock')

/**
 * 确定实物盘点
 * @param yearMonth String
 * @param regionCode String
 * @param personId String
 */
export function defineRegionStock(param){
  console.log('确定实物盘点', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    resolve(data)
  })
}

/**
 * 保存实物盘点
 * @param yearMonth String
 * @param regionCode String
 * @param personId String
 * @param products Arrary
 */
export function saveRegionStock(param){
  console.log('保存实物盘点', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    resolve(data)
  })
}

/**
 * 获取促销用品列表
 */
export function savePromotionals(param){
  console.log('获取促销用品列表')
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        'products|10-15': [{
          type: 1,
          text: function() {
            return Mock.mock('@first()')
          },
          value: /\d{5,10}/
        }],
        'tobaccos|10-15': [{
          type: 2,
          text: function() {
            return Mock.mock('@first()')
          },
          value: /\d{5,10}/
        }]
      }
    })
    resolve(data)
  })
}

/**
 * 查询销区年月盘点
 * @param yearMonth String
 * @param regionCode String
 */
export function selRegionStock(param){
  console.log('查询销区年月盘点', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        savePerson: function() {
          return Mock.mock('@first()')
        },
        definitePerson: function() {
          return Mock.mock('@first()')
        },
        actionText: function() {
          return Mock.mock('@first()')
        },
        'actionType|0-2': 1,
        'products|5-10': [{
          name: function() {
            return Mock.mock('@first()')
          },
          'num|10-100': 1,
          'code': /\d{5,10}/,
          'unitName': '条',
          'unitType': 1,
          'type|1-2': 1
        }]
      }
    })
    resolve(data)
  })
}

/**
 * 确定结账操作
 * @param yearMonth String
 * @param regionCode String
 * @param personId String
 */
export function defineSettleStock(param){
  console.log('确定结账操作', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    resolve(data)
  })
}

/**
 * 结账操作
 * @param yearMonth String
 * @param regionCode String
 * @param personId String
 */
export function saveSettleStock(param){
  console.log('结账操作', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    resolve(data)
  })
}

/**
 * 查询结账信息
 * @param id String
 */
export function selSettleStock(param){
  console.log('查询结账信息', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        savePerson: function() {
          return Mock.mock('@first()')
        },
        definitePerson: function() {
          return Mock.mock('@first()')
        },
        actionText: function() {
          return Mock.mock('@first()')
        },
        'actionType|0-2': 1,
        'products|5-10': [{
          name: function() {
            return Mock.mock('@first()')
          },
          'localNum|10-100': 1,
          'remoteNum|10-100': 1,
          'balance|10-100': 1,
          'difference|10-100': 1
        }]
      }
    })
    resolve(data)
  })
}

/**
 * 查询入库、出库账单详情
 * @param id String
 */
export function selAccountDetail(param){
  console.log('查询账单详情', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        accountInfo: {
          themeName: function() {
            return Mock.mock('@first()')
          },
          personName: function() {
            return Mock.mock('@first()')
          },
          date: function() {
            return Mock.mock('@datetime(yyyy-MM-dd)')
          },
          code: /\d{5,10}/,
          programmeCode: /\d{5,10}/,
          sourceCode: /\d{5,10}/,
          sourceType: function() {
            return Mock.mock('@first()')
          },
          'tobaccoSum|100-200': 1,
          'productSum|100-200': 1
        },
        'tobaccos|3-6': [{
          name: function() {
            return Mock.mock('@first()')
          },
          'num|10-100': 1,
          unit: '条'
        }],
        'products|3-6': [{
          name: function() {
            return Mock.mock('@first()')
          },
          'num|10-100': 1,
          unit: '个'
        }]
      }
    })
    resolve(data)
  })
}

/**
 * 锁定区域账单
 * @param yearMonth String
 * @param regionCode String
 * @param personId String
 */
export function saveLockAccount(param){
  console.log('锁定区域账单', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|0-1': 1
    })
    resolve(data)
  })
}


/**
 * 查询入库出库账单
 */
export function selAccounts(param){
  console.log('查询入库出库账单', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data': {
        actionText: function() {
          return Mock.mock('@first()')
        },
        'actionType|0-1': 1,
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