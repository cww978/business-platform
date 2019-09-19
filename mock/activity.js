// 模拟数据
let Mock = require ('/util/mock')

/**
 * 获取活动主题列表
 */
export function selActivityThemes(param){
  console.log('获取活动主题列表')
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|5-8': [{
        name: function() {
          return Mock.mock('@first()')
        },
        id: /\d{5,10}/
      }]
    })
    resolve(data)
  })
}

/**
 * 根据主题获取活动类型列表
 * @param themeId String
 */
export function selActivityTypesFromTheme(param){
  console.log('获取活动类型：', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|5-8': [{
        name: function() {
          return Mock.mock('@first()')
        },
        id: /\d{5,10}/
      }]
    })
    resolve(data)
  })
}

/**
 * 根据类型获取活动对象列表
 * @param typeId String
 */
export function selActivityTargetsFromType(param){
  console.log('获取活动对象：', param)
  return new Promise(resolve => {
    let data = Mock.mock({
      'data|5-8': [{
        name: function() {
          return Mock.mock('@first()')
        },
        'type|1-3': 1,
        id: /\d{5,10}/
      }]
    })
    resolve(data)
  })
}