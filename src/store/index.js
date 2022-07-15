import { createStore, createLogger } from 'vuex'
import { checkLogin, userInfo } from '../api'

const ENV = process.env.NODE_ENV
export default createStore({
  state: {
    isLogin: null,
    info: null,
  },
  mutations: {
    changeIsLogin(state, payload) {
      state.isLogin = payload
    },
    changeInfo(state, payload) {
      state.info = payload
    },
  },
  actions: {
    async changeIsLoginAsync({ commit }) {
      let bool = false
      let { code } = await checkLogin()
      // code值为0，表示登录了
      if(code === 0) bool = true
      commit('changeIsLogin', bool)
    },
    async changeInfoAsync({ commit }) {
      let { code, data } = await userInfo()
      if(code === 0) {
        commit('changeInfo', data)
      }
    }
  },
  plugins: ENV === 'production' ? [] : [createLogger()],
})
