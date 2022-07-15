import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { checkLogin } from '../api'
import { Toast } from 'vant'

const routes = [
  {
    path: '/',
    component: () => import(/*webpackChunkName: 'home'*/ '../pages/Home.vue'),
  },
  {
    path: '/detail/:id',
    component: () =>
      import(/*webpackChunkName: 'detail'*/ '../pages/Detail.vue'),
  },
  {
    path: '/login',
    component: () => import(/*webpackChunkName: 'login'*/ '../pages/Login.vue'),
  },
  {
    path: '/person',
    component: () =>
      import(/*webpackChunkName: 'person'*/ '../pages/Person.vue'),
  },
  {
    path: '/updateperson',
    component: () =>
      import(/*webpackChunkName: 'updateperson'*/ '../pages/UpdatePerson.vue'),
  },
  {
    path: '/store',
    component: () => import(/*webpackChunkName: 'store'*/ '../pages/Store.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// vue3导航守卫里面可以通过回调函数的返回值来控制路由的跳转
// 注意：回调函数里面有第三个可选参数next，如果写了第三个参数next，就需要使用next函数控制路由跳转
// 如果没写第三个参数，就通过回调函数的返回值来控制路由的跳转
router.beforeEach(async (to, from) => {
  // 需要登录的路由页面
  let arr = ['/person', '/updateperson', '/store']
  if (arr.includes(to.path)) {
    // 校验是否登录
    let isLogin = store.state.isLogin
    // isLogin为true，表示登录了
    if (isLogin) {
      return undefined
    }
    // isLogin为false，表示登录信息失效 (未登录)
    if (isLogin === false) {
      Toast('小主，请您先去登录')
      return { path: '/login' }
    }
    // isLogin为null，表示从未登录过 或者 登录过后刷新了页面导致vuex里面的数据重置为null(这种请求是登录的，token存在)
    if (isLogin === null) {
      try {
        let { code, data } = await checkLogin()
        if (code === 0) { // 表示登录了
          store.commit('changeIsLogin', true)
          store.commit('changeInfo', data)
        } else { // 未登录
          Toast('小主，请您先去登录')
          store.commit('changeIsLogin', false)
          return { path: '/login' }
        }
      } catch (err) {}
      return undefined
    }
  }
  return undefined
})

export default router
