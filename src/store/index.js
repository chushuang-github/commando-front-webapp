import { createStore, createLogger } from 'vuex'
const ENV = process.env.NODE_ENV
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: ENV === 'production' ? [] : [createLogger()]
})
