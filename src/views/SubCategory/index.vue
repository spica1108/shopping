<script setup>
import { ref, onMounted } from "vue";
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import GoodsItem from "../Home/components/GoodsItem.vue";

// 获取面包屑导航数据
const route = useRoute();
const filterData = ref({});
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  filterData.value = res.result;
};
onMounted(() => {
  getFilterData();
});

//获取基础列表渲染
//准备响应式数据
const goodList = ref([])
//准备基础参数
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})

const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.result.items
}

onMounted(() => getGoodList())

//sorField是决定排序的字段
//点击哪一项拿到激活状态的数据，放到这个字段上去，用新参数发送请求重新渲染列表
// tab切换回调
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  //页数重置为1，重新开始的意思，重新翻回第一页，看到重新排序后的最新结果
  reqData.value.page = 1
  //发送请求
  getGoodList()
}


</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }"
          >{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 看官网模板 -->
      <!-- 发生切换时会自动把值存到字段
        初始状态：reqData.sortField 的初始值决定了默认选中的标签
        用户点击标签：当用户点击不同的标签时
        自动更新：reqData.sortField 会自动更新为被点击标签的 name 值 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
