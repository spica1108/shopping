//引用初始化的样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//测试接口函数，导入
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
