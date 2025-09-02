//导入写好的实例
import service from "@/utils/http"

//封装测试接口函数
//用实例发送网络请求,promise对象
export function testAPI() {
  //准备url参数
  return service({
    url: 'home/category/head'
  })
}
