import { createStore, createLogger } from 'vuex'
import { checkLogin, userInfo, storeList } from '../api'

const ENV = process.env.NODE_ENV
export default createStore({
  state: {
    isLogin: null,
    info: null,
    storeList: null
  },
  mutations: {
    changeIsLogin(state, payload) {
      state.isLogin = payload
    },
    changeInfo(state, payload) {
      state.info = payload
    },
    changeStoreList(state, payload) {
      state.storeList = payload
    },
    removeStoreList(state, id) {
      if(state.storeList === null) return
      state.storeList = state.storeList.filter(item => item.id !== id)
    }
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
    },
    async changeStoreListAsync({ commit }) {
      let { code, data } = await storeList()
      if(code !== 0) {
        data = []
      }
      commit('changeStoreList', data)
    }
  },
  plugins: ENV === 'production' ? [] : [createLogger()],
})
