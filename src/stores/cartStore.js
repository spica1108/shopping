//封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI,findNewCartListAPI } from '@/stores/cart'


//第一个参数是模块名，第二个参数是回调函数，在内部编写store和action
export const useCartStore = defineStore('cart',() => {

  const userStore = useUserStore()
  //token取到，islogin会拿到数据，是true，islogin当作判断条件
  const isLogin = computed(() => userStore.userInfo.token)


  //定义state，购物车列表 —— cartList
  const cartList = ref([])


  //定义action，添加的方法 —— addCart
    const addCart = async (goods) => {
      //用数据需要解构出来
      const { skuId,count } = goods

      if(isLogin.value){
        //登录之后加入购 物车逻辑
        //1.调用加入购物车接口 2.调用加入购物车列表接口
        //封装之后调用
        await insertCartAPI({ skuId,count })
        //获取最新购物车列表
        const res = await findNewCartListAPI()
        //覆盖本地列表
        cartList.value = res.result

      }else{
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
          //调用数组的 push 方法，把 goods 这个对象/数据添加到数组的最后
          // push 完就会变成 [goods]、[goods1, goods2] 这样
          cartList.value.push(goods)
        }
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

  //是否全选
  //rray.prototype.every 会遍历数组的每一项，判断回调函数是否对所有元素都返回 true
  //检查数组里的每个商品是否都被选中
  //当 cartList.value 中任意 selected 改变时，isAll.value 会自动重新计算。
  //isAll.value 的值是布尔型：true → 全选，false → 有未选中的商品
  const isAll = computed(()=>cartList.value.every((item) => item.selected))

  //全选功能
  const allCheck = (selected)=>{
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    //接收一个参数 selected（布尔值）true：全选，false：全不选，
    // 遍历购物车数组中的每一个商品项，将每个商品的 selected 属性设置为传入的状态值，
    // 会触发 Vue 的响应式更新
    //点击会触发函数，函数接受点击传过来的值，
    cartList.value.forEach(item => item.selected = selected)
  }

  // 3. 已选择数量
  //.reduce((a, c) => a + c.count, 0)
  //a：累加器（accumulator），保存累计结果
  //c：当前处理的数组元素（current item）
  //a + c.count：将当前商品的 count 数量加到累加器
  //0：初始值，从0开始累加
const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
// 4. 已选择商品价钱合计
const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true,
})
