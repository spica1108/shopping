import service from "@/utils/http"

//此函数为promise
export function getCateroryAPI(){
  return service({
    url:'/home/category/head'
  })
}
