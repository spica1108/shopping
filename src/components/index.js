//把components中的所有组件进行全局化注册
//通过插件的方式
import ImageView from './ImageView/index.vue'
import Sku from './sku/index.vue'
//以下两行都是固定的，在内部可以用app.+方法进行插件开发

export const componentPlugin = {
  install(app){
    //app.component('组件名字'，组件配置对象)
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}
