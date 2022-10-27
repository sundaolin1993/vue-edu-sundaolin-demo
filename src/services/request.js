import store from '@/store'
import axios from '@/utils/axiosTool'
import { Message } from 'element-ui'
import router from '@/router'

function getBaseURL (url) {
  if (url.startsWith('/boss')) return 'http://eduboss.lagounews.com'
  if (url.startsWith('/front')) return 'http://edufront.lagounews.com'
  throw Error('requestURL error')
}
// 请求拦截器
axios.interceptors.request.use(config => {
  config.baseURL = getBaseURL(config.url)
  const { userInfo } = store.state
  if (userInfo && userInfo.access_token) config.headers = { Authorization: userInfo.access_token }
  return config
})
// 跳转登录页面
function redirectLogin () {
  Message({
    message: '请先登录',
    type: 'warning'
  })
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
let isredirecting = false
let requests = []
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // 1. 没有token
      if (!store.state.userInfo) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 2. token无效
      if (isredirecting) {
        return requests.push(() => {
          axios(error.config)
        })
      }
      isredirecting = true
      return axios({
        method: 'POST',
        url: '/front/user/refresh_token',
        params: { refreshtoken: store.state.userInfo.refresh_token }
      }).then(resolve => {
        // 刷新token失败
        if (resolve.data.state !== 1) {
          store.commit('setUserInfo', null)
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新token成功
        store.commit('setUserInfo', resolve.data.content)
        // 重新发送 刷新token之前的 请求
        requests.forEach(callback => callback())
        requests = []
        return axios(error.config)
      }).catch(reject => {
        return Promise.reject(reject)
      }).finally(() => {
        isredirecting = false
      })
    }
    Message.error(error.message)
    return Promise.reject(error)
  }
)
export default axios
