import axios from 'axios'
const as = axios.create({
  timeout: 2000
})
as.interceptors.response.use(
  response => response, // 成功
  error => { // 失败
    let errorMessage = ''
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        errorMessage = '参数错误'
      } else if (status === 403) {
        errorMessage = '没有权限，请联系管理员'
      } else if (status === 404) {
        errorMessage = '请求资源不存在'
      } else if (status >= 500) {
        errorMessage = '服务端错误，请联系管理员'
      } else {
        errorMessage = error.Message
      }
    } else if (error.request) {
      errorMessage = '请求超时，请重试'
    } else {
      errorMessage = error.Message
    }
    error.message = errorMessage
    return Promise.reject(error)
  }
)
export default as
