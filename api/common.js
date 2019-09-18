import { UPLOAD_IMAGE_URL } from '/constant/SERVER.js'
/**
 * 保存图片到服务器
 * @param path String
 */
export function saveImage(path){
  return new Promise((resolve, reject) => {
    // 压缩图片
    dd.compressImage({
        filePaths:[path],
        compressLevel:1,
        success:(res)=>{
          let compressPath = res.filePaths[0]
          // 上传图片
          dd.uploadFile({
            url: UPLOAD_IMAGE_URL,
            fileType: 'image',
            fileName: 'file',
            filePath: compressPath,
            success: response => {
              resolve(response)
            },
            fail: error => {
              reject(error)
            },
          })
        },
        fail: () => {
          reject()
        }
    })
    console.log('保存图片:', path)
  })
}