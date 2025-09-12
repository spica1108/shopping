// createRouter:创建router实例
// createWebHistory：创建history模式路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

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
          //需要一个参数，加上占位的id参数
          path:'category/:id',
          component:Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path:'pay',
          component: Pay
        },
        {
          path: 'paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },
        {
          path: '/member',
          component: Member,

          children: [
            {
              path: 'user',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }

        //记得路由出口
      ]

    },
    {
      path:'/login', // 当用户访问 /login 路径,https://yourwebsite.com/login
      component:Login // 显示 Login 组件
    }
  ],

  scrollBehavior(){
    return{
      top:0
    }
  }

})

export default router
