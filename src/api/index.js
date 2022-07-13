import axios from './http'

// 获取今日新闻
export const queryNewsLatest = () => axios.get('/api/news_latest')

// 获取往日新闻
export const queryNewsBefore = (time) => {
  return axios.get('/api/news_before', {
    params: { time },
  })
}
