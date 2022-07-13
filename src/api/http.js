import axios from 'axios'
import qs from 'qs'
import { isPlainObject } from '@/assets/utils'
import { Notify } from 'vant'

axios.defaults.baseURL = ''
axios.defaults.timeout = 60000
// axios.defaults.transformRequest：只能用在'PUT', 'POST' 和 'PATCH'这几个请求方法
// 请求体信息如果是对象，将对象转为application/x-www-form-urlencode格式发送给服务器
// application/x-www-form-urlencode格式：name=xxx&age=xxx&address=xxx
axios.defaults.transformRequest = (data) => {
  if (isPlainObject(data)) return qs.stringify(data)
  return data
}

// 请求拦截器
axios.interceptors.request.use((config) => {
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
