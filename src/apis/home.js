import service from "@/utils/http"

export function getBannerAPI(){
  return service({
    url:'/home/banner',
  })
}
