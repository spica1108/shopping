<!-- 面包屑导航，调接口，拿到数据，渲染 -->
<script setup>
import { ref, onMounted } from "vue";
// 获取路由参数
import { useRoute } from "vue-router";
import { getTopCategoryAPI } from "@/apis/category";

//ref()定义初始值，依照后端返回的数据类型来定义，这里是对象
const categoryData = ref({});
//调用方法
const route = useRoute();

const getCategory = async () => {
  // 拿到路由参数
  //如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
  const res = await getTopCategoryAPI(route.params.id);

  categoryData.value = res.result;
};

onMounted(() => {
  console.log("这里是category");
  getCategory();
});
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
</style>
