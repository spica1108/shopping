<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

//触发获取导航列表的action
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

//得到实例对象,通过实例对象，就可以调用action函数
const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCaterory())
//可以在子组件使用里面数据

</script>

<template>
  <LayoutFixed/>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
