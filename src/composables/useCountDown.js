// 封装倒计时逻辑函数
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'


export const useCountDown = () => {

  //两个返回值，响应式数据formatTime，start函数

  // 1. 响应式的数据
  let timer = null
  const time = ref(0)

  // 格式化时间 为 xx分xx秒
  //计算属性是基于一个已经存在的显示数据做二次计算
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))


  // 2. 开启倒计时的函数
  //currentTime初始化倒计时逻辑
  const start = (currentTime) => {
    // 开始倒计时的逻辑
    // 核心逻辑的编写：每隔1s就减一
    //显示的是currentTime，赋值
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(() => {
    //timer存在就调用函数
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}
