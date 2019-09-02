import request from './util/request'
App({
  onLaunch(options) {
    // 第一次打开
    request({url: 'http://127.0.0.1:3000/meeting/getMeetings'})
    // options.query == {number:1}
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
})
