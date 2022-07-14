import axios from './http'

// 获取今日新闻 (里面有一项数据就是轮播图数据)
export const queryNewsLatest = () => axios.get('/api/news_latest')

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
