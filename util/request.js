import { SERVER_URL, DD_SERVER_URL } from '/constant/SERVER.js'
const servers = {
  'SERVER_URL': SERVER_URL,
  'DD_SERVER_URL': DD_SERVER_URL
}
const service = function (options){
  options.baseUrl =  options.baseUrl || 'SERVER_URL'
  options.url =  options.url || ''
  options.headers =  options.headers || {}
  options.data =  options.data || {}
  options.dataType =  options.dataType || 'json'
  options.param =  options.param || {}
  options.loading =  options.loading || false
  options.timeout =  options.timeout || 10000
  options.method =  options.method || 'get'
  let requestData = null
  if(options.method == 'get' || options.method == 'GET') {
    requestData = options.param
  } else if (options.method == 'post' || options.method == 'POST') {
    requestData = options.data
  }
  return new Promise((resolve,reject) => {
    if (options.loading) {
      dd.showLoading({
        content: '加载中...'
      })
    }
    console.log('baseUrl', servers[options.baseUrl])
    dd.httpRequest({
      headers: options.headers,
      dataType: options.dataType,
      url: servers[options.baseUrl] + options.url,
      method:options.method,
      data: requestData,
      timeout: options.timeout,
      success: function(res){
        if (options.loading) {
          dd.hideLoading()
        }
        resolve(res.data)
      },
      fail: function(error){
        if (options.loading) {
          dd.hideLoading()
        }
        dd.showToast({
          type: 'fail',
          content: `网络错误 (${error.error})`,
          duration: 3000
        })
        reject(error)
      }
    })
  })
}
export default service