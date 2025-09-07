//引用初始化的样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入懒加载插件，注册
import { lazyPlugin } from '@/directives'

//引入全局组件插件
import { componentPlugin } from '@/components'

const app = createApp(App)

//这里都是插件
app.use(createPinia())
app.use(router)
//执行过程：先执行use方法，在执行插件
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

