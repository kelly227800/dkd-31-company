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
          <goodsButton @click="onEdit" class="goods_edit" size="small"
            >修改</goodsButton
          >
          <goodsButton @click="onDel" class="goods_delete" size="small"
            >删除</goodsButton
          >
        </div>
      </goodsForm>
      <!-- 分页 -->
      <goodsPage
        :searchInfo="searchInfo"
        @changePage="changePageFn"
      ></goodsPage>
    </div>
    <!-- 新增弹框 -->
    <goodsDialog
      :dialogVisible="dialogVisible"
      :pageIndex="searchInfo.pageIndex"
      @close="closeAddDialog"
      @changePage="changePageFn"
    />
    <!-- 修改弹框 -->
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import goodsTypeSearch from "../components/goodsTypeSearch.vue";
import goodsForm from "../components/goodsForm.vue";
import goodsButton from "../components/goodsButton.vue";
import goodsPage from "../components/goodsPage.vue";
import goodsDialog from "../components/goodsDialog.vue";
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
      dialogVisible: false,
    };
  },
  components: {
    viewsButton,
    goodsTypeSearch,
    goodsForm,
    goodsButton,
    goodsPage,
    goodsDialog,
  },
  created() {
    this.searchGoodsType();
  },

  methods: {
    // 进入页面获取商品类型数据
    async searchGoodsType() {
      try {
        const res = await searchGoodsType(1, 10);
        // console.log(res);
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (e) {
        this.$message.error("获取商品类型数据失败");
      }
    },
    // 搜索关键词获取商品类型数据
    async searchForm(className) {
      try {
        const res = await searchGoodsType(1, 10, className);
        // console.log(res)
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (e) {
        this.$message.error("获取商品类型数据失败");
      }
    },
    // 点击改变页码
    async changePageFn(val) {
      try {
        // console.log('进入了')
        const res = await searchGoodsType(val, 10);
        console.log(res);
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (err) {
        this.$message.error("获取商品类型数据失败");
      }
    },
    // 点击新增
    onAdd() {
      // console.log("新增");
      this.dialogVisible = true;
    },
    // 关闭新增弹框
    closeAddDialog() {
      this.dialogVisible = false;
    },
    // 修改商品类型
    onEdit() {
      console.log("查看详情");
    },
    // 删除商品类型
    onDel() {
      console.log('删除')
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
