//axios基础的封装
import axios from 'axios'

//create方法
//用变量接收axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', //基础路径，根域名
  timeout: 5000 //请求超时时间，5秒
})
//create方法会返回一个axios实例，我们可以用这个实例去发请求


//请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //config是请求的配置信息对象
    //我们可以在这里对请求信息进行处理，比如统一设置token
    // config.headers.Authorization = `Bearer ${token}`
    return config //一定要返回配置对象
  },
  (error) => {
    //请求失败的回调函数，一般是网络异常
    return Promise.reject(error)
  }
)

//响应拦截器
httpInstance.interceptors.response.use(
  (response) => {
    //响应成功进入这里，状态码2xx都会进入这里
    return response.data //只返回响应体数据
  },
  (error) => {
    //响应失败进入这里，状态码4xx，5xx会进入这里
    return Promise.reject(error)
  }
)

//导出axios实例
export default httpInstance
