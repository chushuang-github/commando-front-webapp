import axios from 'axios'
import qs from 'querystring'
import md5 from 'blueimp-md5'
import { isPlainObject } from '@/assets/utils'
import { Notify } from 'vant'

axios.defaults.baseURL = ''
axios.defaults.timeout = 60000
// axios.defaults.transformRequest：只能用在'PUT', 'POST' 和 'PATCH'这几个请求方法
// 请求体信息如果是普通的对象，将对象转为application/x-www-form-urlencode格式发送给服务器
// application/x-www-form-urlencode格式：name=xxx&age=xxx&address=xxx
axios.defaults.transformRequest = (data) => {
  if (isPlainObject(data)) return qs.stringify(data)
  return data
}

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 针对部分接口，携带t令牌和签名信息
  // authorzation: token「客户端登录成功后存储在本地的令牌信息(从服务器获取)」
  // time: 时间戳
  // sign: 签名信息「客户端基于md5，把token和时间戳进行加密生成(加密规则：md5(token@time@zhufeng))」
  let apiList = [
    '/check_login',
    '/user_info',
    '/user_update',
    '/store',
    '/store_remove',
    '/store_list'
  ]
  let url = config.url.replace('/api', '')
  let token = localStorage.getItem('token')
  if(apiList.includes(url) && token) {
    // +new Date()：获取当前的时间戳
    let time = +new Date()
    let sign = md5(`${token}@${time}@zhufeng`) // 签名规则(和后端约定的)
    // 请求头里面携带下面3个信息
    config.headers.authorzation = token
    config.headers.time = time
    config.headers.sign = sign
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (reason) => {
    Notify({
      type: 'danger',
      message: '小主，当前网络繁忙，请稍后再试...',
    })
    return Promise.reject(reason)
  }
)
export default axios
