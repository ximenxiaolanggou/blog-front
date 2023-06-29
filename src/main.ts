import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
// 引入md-editor-v3样式
import 'md-editor-v3/lib/style.css'

//引入路由鉴权文件
import './permisstion'

let app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
//注册模板路由
app.use(router)
//安装仓库
app.use(pinia)

app.mount('#app')
