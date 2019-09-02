const service = function (options = {
  headers: {},
  url: '',
  data: '',
  dataType: '',
  params: '',
  timeout: 6000,
  method: 'get'}){
  let data = null
  if(options.method == 'get' ||options.method == 'GET') {
    data = options.params
  } else if (options.method == 'post' ||options.method == 'POST') {
    data = options.data
  }
  return new Promise((resolve,reject) => {
    dd.httpRequest({
      headers: options.headers,
      dataType: options.dataType,
      url: options.url,
      method:options.method,
      data: data,
      timeout: options.timeout,
      success: function(res){
        resolve(res)
      },
      fail: function(error){
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