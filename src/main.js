import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 移动端适配，设置根html标签的font-size大小
import 'amfe-flexible'

// 重置样式表
import './assets/reset.min.css'

const app = createApp(App)
app.use(Vant)
app.use(store)
app.use(router)
app.mount('#app')
