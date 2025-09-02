// createRouter:创建router实例
// createWebHistory：创建history模式路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path:'/', // 当用户访问网站根目录,https://yourwebsite.com/
      component:Layout, // 显示 Layout 组件
      //二级路由，先配置home，因为是默认选项
      children:[
        {
          //空，访问首页默认页也会得到渲染
          path:'',
          component:Home
        },
        {
          path:'category',
          component:Category
        }
        //记得路由出口
      ]

    },
    {
      path:'/login', // 当用户访问 /login 路径,https://yourwebsite.com/login
      component:Login // 显示 Login 组件
    }
  ]
})

export default router
