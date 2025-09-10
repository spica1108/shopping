//封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

//第一个参数是模块名，第二个参数是回调函数，在内部编写store和action
export const useCartStore = defineStore('cart',() => {
  //定义state，购物车列表 —— cartList
  const cartList = ref([])
  //定义action，添加的方法 —— addCart
    const addCart = (goods) => {
    console.log('添加', goods)
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
  }

  //删除购物车
  //传skuId
  const delCart = (skuId) =>{
    //找到要删除的下标值 splice
    //使用数组的过滤方法 filter
    //使用传下来的参数skuid参数是否满足item自身的skuid，匹配上就是要删除的项
    //.findIndex(callback)这是JS数组的方法，用来找到符合条件的第一个元素的 索引（下标）
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    //splice删除或添加元素，idx找到的商品下标，1删除1个元素，所以就是把购物车里找到的商品删除掉
    cartList.value.splice(idx, 1)
  }

  //单选功能
  //接受左边调用action时传过来参数，
  const singleCheck = (skuId,selected)=>{
    //通过skuid找到要修改的那一项 把它的selected修改为传过来的selected
    //如果item的skuid和传过来的skuid发生匹配了，那就是要修改的那项
    const item = cartList.value.find((item)=>item.skuId===skuId)
    item.selected = selected
  }


  //计算属性
  //1.总的数量 所有项的count之和
  //reduce方法第一个参数是回调，编写计算逻辑，第二个参数有初始值
  //a是每次累加完都会传过来，c是每一项
  const allCount = computed(()=> cartList.value.reduce((a,c) => a + c.count ,0))
  //2.总价 所有项的count*price之和
  const allPrice = computed(()=> cartList.value.reduce((a,c) => a + c.count * c.price ,0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck
  }
}, {
  persist: true,
})
