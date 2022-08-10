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
      <goodsTypeForm
        :searchList="searchList"
        :tableHead="tableHead"
        :searchInfo="searchInfo"
        @editGoodsType="editGoodsTypeFn"
        @delGoodsType="delGoodsTypeFn"
      />
      <!-- 分页 -->
      <goodsPage
        :searchInfo="searchInfo"
        @changePage="changePageFn"
      ></goodsPage>
    </div>
    <!-- 新增/修改弹框 -->
    <goodsTypeDialog
      ref="goodsTypeDialog"
      :dialogVisible="dialogVisible"
      :pageIndex="searchInfo.pageIndex"
      :isEdit="isEdit"
      :currentRow="currentRow"
      @close="closeAddDialog"
      @changePage="changePageFn"
    />
    <!-- 删除弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="delDialogVisible"
      width="30%"
      center
      @close="delDialogVisible = false"
    >
      <span class="deltext">确认删除该商品类型？</span>
      <span slot="footer" class="dialog-footer">
        <goodsButton
          type="warning"
          @click="delDialogVisible = false"
          class="cancel"
          >取消</goodsButton
        >
        <goodsButton type="success" @click="confirmDel">确认</goodsButton>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import goodsTypeSearch from "../components/goodsTypeSearch.vue";
import goodsTypeForm from "../components/goodsTypeForm.vue";
import goodsButton from "../components/goodsButton.vue";
import goodsPage from "../components/goodsPage.vue";
import goodsTypeDialog from "../components/goodsTypeDialog.vue";
import { searchGoodsType, deleteGoodsType } from "@/api/goods";
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
      delDialogVisible: false,
      isEdit: false,
      currentRow: {},
      className: ''
    };
  },
  components: {
    viewsButton,
    goodsTypeSearch,
    goodsTypeForm,
    goodsButton,
    goodsPage,
    goodsTypeDialog,
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
        this.className = className
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (e) {
        this.$message.error("获取商品类型数据失败");
      }
    },
    // 点击改变页码
    async changePageFn(val) {
      try {
        const res = await searchGoodsType(val, 10,this.className);
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (err) {
        this.$message.error("获取商品类型数据失败");
      }
    },
    // 点击新增
    onAdd() {
      this.dialogVisible = true;
    },
    // 关闭弹框
    closeAddDialog() {
      this.dialogVisible = false;
      this.isEdit = false;
    },
    // 点击修改
    editGoodsTypeFn(row) {
      this.currentRow = row;
      this.isEdit = true;
      this.dialogVisible = true;
      // 数据回显
      this.$refs.goodsTypeDialog.form.typeName = row.className;
    },
    // 点击删除
    delGoodsTypeFn(row) {
      this.currentRow = row;
      this.delDialogVisible = true;
    },
    // 确认删除
    async confirmDel() {
      try {
        await deleteGoodsType(this.currentRow.classId);
        this.changePageFn(this.searchInfo.pageIndex);
      } catch (err) {
        this.$message.error("该类型正在使用，删除失败");
      } finally {
        this.delDialogVisible = false;
      }
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
    width: 30px;
    height: 40px;
    padding: 12px 0;
    background-color: unset;
    color: #5f84ff;
    padding-right: 10px;
  }
  .goods_delete {
    width: 30px;
    height: 40px;
    padding: 12px 0;
    background-color: unset;
    color: #ff5a5a;
  }
}
.dialog-footer {
  padding-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .cancel {
    margin-right: 34px;
  }
}
</style>
