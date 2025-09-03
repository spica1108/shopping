import service from "@/utils/http"

export function getBannerAPI(){
  return service({
    url:'/home/banner',
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return service({
    url:'/home/new'
  })
}
