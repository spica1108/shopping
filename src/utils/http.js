//axios基础的封装
import axios from 'axios'
import { ElMessage } from "element-plus"
import { useUserStore } from '@/stores/user'
import router from '@/router'
import "element-plus/theme-chalk/el-message.css"

//create方法
//用变量接收axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', //基础路径，根域名
  timeout: 5000 //请求超时时间，5秒
})
//create方法会返回一个axios实例，我们可以用这个实例去发请求


// //请求拦截器
// httpInstance.interceptors.request.use(
//   (config) => {
//     //config是请求的配置信息对象
//     //我们可以在这里对请求信息进行处理，比如统一设置token
//     // config.headers.Authorization = `Bearer ${token}`
//     return config //一定要返回配置对象
//   },
//   (e) => {
//     //请求失败的回调函数，一般是网络异常
//     return Promise.reject(e)
//   }
// )

//设置token，因为请求会有多次都用到这个接口，一个一个配置太麻烦

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

//响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    //响应成功进入这里，状态码2xx都会进入这里
    return res.data //只返回响应体数据
  },
  (e) => {
    const userStore = useUserStore()
    //统一错误提示
    ElMessage({
      type:'warning',
      //不知道怎么获取可以把e打印一下
      message: e.response.data.message
    })
    //响应失败进入这里，状态码4xx，5xx会进入这里
    //401token失效处理
    //1.清除本地用户数据,本地数据在pinia,把pinia的数据清除
    //2.跳转到登录页,路由跳转
    if (e.response.status === 401){
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e)

  }
)

//导出axios实例
export default httpInstance
