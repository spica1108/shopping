import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCateroryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('catagory', () => {
  //导航列表的数据管理

  //state导航列表数据
  const categoryList = ref([])

  //获取数据的业务函数
  //action获取导航数据的方法
  const getCaterory = async () => {
    const res = await getCateroryAPI()
    console.log(res)
    categoryList.value = res.result
  }

  return{
    categoryList,
    getCaterory
  }

})
//写完了可以在组件使用 useCategoryStore 得到实例对象 使用
//在layout触发action函数
