<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <viewsSearch text1="区域搜索" @search="searchForm"></viewsSearch>
    <!-- 下边的整个表格 -->
    <div class="result">
      <!-- 按钮 -->
      <div class="bottom_button">
        <viewsButton @click="onAdd" type="success">
          <i class="el-icon-circle-plus-outline"></i>
          新建
        </viewsButton>
        <!-- 添加新建弹层 -->
        <addDialog
          @addSave="allTask"
          :visible.sync="dialogAddVisible"
        ></addDialog>
      </div>

      <!-- 表格 -->
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
        @onMore="onMore"
        @onChange="onChange"
        @onDelete="onDelete"
      >
      </viewsForm>
      <!-- 分页 -->
      <viewsPage
        :getSearchInfo="getSearchInfo"
        @pageIndex="allTask"
        :disabledUp="disabledUp"
        :disabledDown="disabledDown"
      ></viewsPage>
    </div>

    <!-- 弹层 -->
    <moreDialog :visible.sync="dialogMoreVisible" ref="moreDept"></moreDialog>
    <changeDialog
      :visible.sync="dialogChangeVisible"
      ref="changeDept"
      @addSave="allTask"
    ></changeDialog>
    <!-- <deleteDialog
      :visible.sync="dialogDeleteVisible"
      ref="deleteDept"
    ></deleteDialog> -->
  </div>
</template>

<script>
import { getPointSearch, getDeleteList } from "@/api/point";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "./components/form";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
// 弹层的组件
import addDialog from "./components/addDialog";
import moreDialog from "./components/moreDialog";
import changeDialog from "./components/changeDialog";
// import deleteDialog from "./components/deleteDialog";
export default {
  name: "marketing",
  data() {
    return {
      tableHead: [
        {
          prop: "name",
          label: "区域名称",
        },
        {
          prop: "nodeCount",
          label: "点位数",
        },
        {
          prop: "remark",
          label: "备注说明",
        },
      ],
      getSearchList: [], //10条表格数据
      getSearchInfo: {}, //整体信息，带页码
      disabledUp: false, //上一页是否禁用
      disabledDown: false, //下一页是否禁用
      params: {
        pageIndex: 1, //页码
        name: "",
      },
      dialogAddVisible: false, //添加弹层的显示隐藏
      dialogMoreVisible: false,
      dialogChangeVisible: false,
      // dialogDeleteVisible: false,
      clickId: "",
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    addDialog,
    moreDialog,
    changeDialog,
    // deleteDialog,
  },

  created() {
    this.allTask(1);
  },

  methods: {
    // 新建
    onAdd() {
      this.dialogAddVisible = true;
    },
    onMore(id) {
      this.dialogMoreVisible = true;
      this.$refs.moreDept.getDetailsList(id);
    },
    onChange(id) {
      this.dialogChangeVisible = true;
      this.$refs.changeDept.getChangeDetailsList(id);
    },
    onDelete(id) {
      //   this.dialogDeleteVisible = true;
      //   // this.$refs.deleteDept.
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await getDeleteList(id);
          this.allTask(1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 搜索
    searchForm(formInline) {
      this.params.name = formInline.number;
      this.allTask(1);
    },
    async allTask(pageIndex) {
      this.params.pageIndex = pageIndex;
      const resSearch = await getPointSearch(this.params);
      this.getSearchInfo = resSearch;
      this.getSearchList = resSearch.currentPageRecords;
      // 判断上一页和下一页的禁用情况
      if (resSearch.pageIndex == 1) {
        this.disabledUp = true;
      } else {
        this.disabledUp = false;
      }
      if (resSearch.pageIndex == resSearch.totalPage) {
        this.disabledDown = true;
      } else {
        this.disabledDown = false;
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
</style>
