<!-- 面包屑导航，调接口，拿到数据，渲染 -->
<!-- <script setup>
import { ref, onMounted } from "vue";
// 获取路由参数
import { useRoute } from "vue-router";
import { getTopCategoryAPI } from "@/apis/category";
import { getBannerAPI } from '@/apis/home'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { onBeforeRouteUpdate } from "vue-router";

//ref()定义初始值，依照后端返回的数据类型来定义，这里是对象
const categoryData = ref({});
//调用方法
const route = useRoute();

//这里id是默认参数
const getCategory = async (id = route.params.id) => {
  // 拿到路由参数
  //如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
  const res = await getTopCategoryAPI(id);

  categoryData.value = res.result;
};

onMounted(() => {
  getCategory();
});

//目标：路由参数变化时，把分类数据重新获取
//to代表目标路由对象
onBeforeRouteUpdate((to) => {
  //to是即将要跳转的路由对象，会拿到最新的数据
  //调函数时用到的路由参数是最新的，但是route.params.id存在滞后性
  getCategory(to.params.id)
})

//获取banner
const bannerList = ref([])
onMounted(async () => {
  const res = await getBannerAPI({
    distributionSite: '2'
  })
  bannerList.value = res.result
  console.log(res);
})

</script> -->

<script setup>

import GoodsItem from '../Home/components/GoodsItem.vue'
import { useBanner } from './composables/useBanner'
import { useCategory } from './composables/useCategory'
//调用一个叫做 useCategory 的函数，这个函数返回一个对象，
// 然后从返回的对象中解构（提取）出一个名为 categoryData 的属性，
// 并把它赋值给一个同名的常量（const categoryData）
const { bannerList } = useBanner()
const { categoryData } = useCategory()

</script>


<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <!-- 由两部分组成，外层提供分隔符（这里是>） -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <!-- 导航项
           点击后会跳到路由为/的路径下-->
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <!-- 查看接口文档 -->
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
