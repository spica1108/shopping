// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

//定义懒加载插件
export const lazyPlugin = {
  //提供一个方法，名字是固定的install
  install(app) {
    //在插件编写懒加载指令逻辑
    //定义全局指令

    //第一个参数是指令名字，第二个参数是指令的定义对象
    app.directive('img-lazy', {
      //el表示指令绑定的元素img
      // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
      mounted(el, binding) {
        //targrt监听谁(el即img)是否进入视口区域就传过来
        //isIntersecting布尔值，当前监听的元素是否进入了视口区域
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting);
            if (isIntersecting) {
              // 进入视口区域
              //之后发送网络请求，给img标签的src属性赋值
              //给src属性附地址，就会自动发送网络请求
              el.src = binding.value;
              // 完成第一次加载就要停止监听
              stop
            }
          }
        )
      }
    })
  }
}
