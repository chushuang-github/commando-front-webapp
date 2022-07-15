import axios from './http'

// 获取今日新闻 (里面有一项数据就是轮播图数据)
export const queryNewsLatest = () => {
  return axios.get('/api/news_latest')
}

// 获取往日新闻
export const queryNewsBefore = (time) => {
  return axios.get('/api/news_before', {
    params: { time },
  })
}

// 获取新闻详情
export const queryNewsInfo = (id) => {
  return axios.get('/api/news_info', {
    params: { id },
  })
}

// 获取新闻评论信息
export const queryNewsStory = (id) => {
  return axios.get('/api/story_extra', {
    params: { id },
  })
}

// 登录
export const login = (phone, code) => {
  return axios.post('/api/login', { phone, code })
}

// 获取手机验证码
export const phoneCode = (phone) => {
  return axios.post('/api/phone_code', { phone })
}

// ----------------------------上面接口都不需要携带token----------------------------

// 检测用户是否登录
export const checkLogin = () => axios.get('/api/check_login')

// 获取登录者信息
export const userInfo = () => axios.get('/api/user_info')

// 修改用户名和头像 (multipart/form-data格式)
export const userUpdate = (username, file) => {
  let formData = new FormData()
  formData.append('username', username)
  formData.append('file', file)
  return axios.post('/api/user_update', formData)
}

// 收藏新闻
export const store = (newsId) => {
  return axios.post('/api/store', { newsId })
}

// 取消收藏新闻
export const storeRemove = (id) => {
  return axios.get('/api/store_remove', {
    params: { id },
  })
}

// 收藏列表
export const storeList = () => {
  return axios.get('/api/store_list')
}
