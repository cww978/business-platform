import { SERVER_URL } from '/constant/SERVER.js'
const service = function (options = {
  headers: {},
  url: '',
  data: '',
  dataType: '',
  param: '',
  loading: false,
  timeout: 6000,
  method: 'get'}){
  let data = null
  if(options.method == 'get' ||options.method == 'GET') {
    data = options.param
  } else if (options.method == 'post' ||options.method == 'POST') {
    data = options.data
  }
  return new Promise((resolve,reject) => {
    if (options.loading) {
      dd.showLoading({
        content: '加载中...'
      })
    }
    console.log('baseUrl', SERVER_URL)
    dd.httpRequest({
      headers: options.headers,
      dataType: options.dataType,
      url: SERVER_URL + options.url,
      method:options.method,
      data: data,
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