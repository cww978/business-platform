import { SERVER_URL } from '/constant/SERVER.js'


/**
 * 保存图片到服务器
 * @param path String
 */
export function uploadFile(path){
  return new Promise((resolve, reject) => {
    // 压缩图片
    dd.compressImage({
        filePaths:[path],
        compressLevel: 2,
        success:(res)=>{
          // 上传图片
          const compressImage = res.filePaths[0]
          dd.uploadFile({
            url: SERVER_URL + '/file/uploadFile',
            fileType: 'image',
            fileName: 'file',
            filePath: compressImage,
            success: response => {
              let res = JSON.parse(response.data)
              console.log('上传图片成功', JSON.parse(response.data).data)
              if (response.statusCode == 200 && 'data' in res) {
                if (res.data.state) {
                  resolve({ id: res.data.saveId, path: compressImage })
                } else {
                  reject()
                }
              } else {
                reject()
              }
            },
            fail: error => {
              reject(error)
            },
          })
        },
        fail: error => {
          reject(error)
        }
    })
    console.log('保存图片:', path)
  })
}