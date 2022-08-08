<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <goodsTypeSearch text1="商品搜索" @search="searchForm"></goodsTypeSearch>
    <!-- 下边的整个表格 -->
    <div class="result">
      <!-- 按钮 -->
      <div class="bottom_button">
        <viewsButton @click="onAdd" type="success">
          <i class="el-icon-circle-plus-outline"></i>
          新建
        </viewsButton>
        <viewsButton @click="update" type="warning">导入数据</viewsButton>
      </div>
    </div>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import goodsTypeSearch from "../components/goodsTypeSearch.vue";
export default {
  data() {
    return {};
  },

  created() {},
  components: {
    viewsButton,
    goodsTypeSearch,
  },
  methods: {
    searchForm() {
      console.log("搜索");
    },
    onAdd() {
      console.log('新建');
    },
    update() {
      console.log('导入数据');
    }
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .bottom_button {
    margin-bottom: 20px;
    display: flex;
  }
}
</style>
