import request from "@/utils/http.js";
//因为之前的httpInstance 是export default 所以可以换个名称导入
// 如果是export const 就要按照原名导入
/**
 * @description: 获取分类数据
 * @param {*} id 分类id
 * @return {*}
 */
export const getTopCategoryAPI = (id) => {
  return request({
    url: "/category",
    // 网络请求中，params 通常指代“查询参数”或“URL参数”
    params: {
      id,
    },
  });
};

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 二级分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/**
 * @description: 获取导航数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}
