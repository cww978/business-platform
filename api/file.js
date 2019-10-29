import request from '../util/request'

/**
 * 文件下载功能
 * @param fileIds String
 */
export function downLoadFile(param){
  console.log('根据坐标获取零售户', param)
  return request({
    url: '/file/downLoadFile',
    param: param,
    loading: false,
    dataType: 'json',
    method: 'get'
  })
}
