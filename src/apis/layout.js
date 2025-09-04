import httpInstance from "@/utils/http"

//此函数为promise
export function getCateroryAPI(){
  return httpInstance({
    url:'/home/category/head'
  })
}
