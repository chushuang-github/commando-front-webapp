import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式表
import './assets/reset.css'
// Vant组件库
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 移动端适配，设置根html标签的font-size大小
import 'amfe-flexible'

// 控制我们这个移动端app在不同设备里面的最大宽度为750px，根html字体大小最大为75px
import { handleMaxWidth } from './assets/utils'
handleMaxWidth()
// 监听屏幕大小变化，自动调用handleMaxWidth函数，进行app宽度和font-size大小的设置
window.addEventListener('resize', () => {
  handleMaxWidth()
})

const app = createApp(App)
app.use(Vant)
// 图片懒加载 (注册之后会多一个v-lazy的自定义指令)
app.use(Lazyload, {
  lazyComponent: true,
})
app.use(store)
app.use(router)
app.mount('#app')
