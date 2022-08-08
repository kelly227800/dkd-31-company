<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <goodsTypeSearch
      text1="商品类型搜索"
      @search="searchForm"
    ></goodsTypeSearch>
    <!-- 下边的整个表格 -->
    <div class="result">
      <!-- 按钮 -->
      <div class="bottom_button">
        <viewsButton @click="onAdd" type="success">
          <i class="el-icon-circle-plus-outline"></i>
          新建
        </viewsButton>
      </div>
      <!-- 表格 -->
      <goodsForm
        :searchList="searchList"
        :tableHead="tableHead"
        :searchInfo="searchInfo"
      >
        <div class="goods_type_btn">
          <goodsButton @click="onMore" class="goods_edit" size="small"
            >修改</goodsButton
          >
          <goodsButton @click="onMore" class="goods_delete" size="small"
            >删除</goodsButton
          >
        </div>
      </goodsForm>
      <!-- 分页 -->
      <goodsPage
        :searchInfo="searchInfo"
        :disabledPre="disabledPre"
        :disabledNext="disabledNext"
        @disabledPreFn="disabledPre = true"
        @cancelDisabledPre="disabledPre = false"
        @disabledNextFn="disabledNext = true"
        @cancelDisabledNext="disabledNext = false"
      ></goodsPage>
    </div>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import goodsTypeSearch from "../components/goodsTypeSearch.vue";
import goodsForm from "../components/goodsForm.vue";
import goodsButton from "../components/goodsButton.vue";
import goodsPage from "../components/goodsPage.vue";
import { searchGoodsType } from "@/api/goods";
export default {
  data() {
    return {
      tableHead: [
        {
          prop: "className",
          label: "商品类型名称",
        },
      ],
      searchList: [],
      searchInfo: {},
      disabledPre: true,
      disabledNext: false,
    };
  },
  components: {
    viewsButton,
    goodsTypeSearch,
    goodsForm,
    goodsButton,
    goodsPage,
  },
  created() {
    this.searchGoodsType();
  },

  methods: {
    // 进入页面获取商品类型数据
    async searchGoodsType() {
      const res = await searchGoodsType(1, 10);
      // console.log(res);
      this.searchInfo = res;
      this.searchList = res.currentPageRecords;
    },
    // 搜索关键词获取商品类型数据
    async searchForm(className) {
      const res = await searchGoodsType(1, 10, className);
      // console.log(res)
      this.searchInfo = res;
      this.searchList = res.currentPageRecords;
    },
    onAdd() {
      console.log("新增");
    },
    onMore() {
      console.log("查看详情");
    },
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
.goods_type_btn {
  display: flex;
  align-items: center;
  .goods_edit {
    background-color: unset;
    color: #5f84ff;
    padding-right: 10px;
  }
  .goods_delete {
    background-color: unset;
    color: #ff5a5a;
  }
}
</style>
