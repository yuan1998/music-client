import { createApp } from 'vue' // 前端框架
import ElementPlus from 'element-plus' // element ui 组件库
import App from './App.vue' // App vue 文件
import router from './router' // vue router
import store from './store' // vuex
import 'element-plus/dist/index.css' // element ui 组件库 css 样式资源
import './assets/css/index.scss' // index css 文件
import './assets/icons/index.js' // icon 文件

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
