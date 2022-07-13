import { createRouter, createWebHistory } from 'vue-router'

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

export default router
