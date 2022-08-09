<template>
  <div>
    <!-- 搜索栏 -->
    <ViewsSearch
      text1="人员搜索:"
      :allTaskStatusList="allTaskStatusList"
      @search="searchForm"
    ></ViewsSearch>
    <!-- 下面的整个表格 -->
    <div class="result">
      <!-- 按钮 -->
      <div class="bottom_button">
        <ViewsButton @click="onAdd" type="success">
          <i class="el-icon-circle-plus-outline"></i>
          新建
        </ViewsButton>
      </div>
      <!-- 表格部分 -->
      <div class="bottom_form">
        <el-table
          :data="PeopleList"
          style="width: 100%"
          highlight-current-row
          :header-cell-style="{
            background: 'rgb(243, 246, 251)',
            color: 'rgb(102, 102, 102)',
            fontWeight: '500',
          }"
        >
          <el-table-column type="index" :index="indexMethod" label="序号">
          </el-table-column>
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            v-for="(item, index) in tableHead"
            :key="index"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button
                style="color: red"
                type="text"
                size="small"
                @click="delFn(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 底部导航 -->
      <div class="pagination-container">
        <div>
          共 {{ people.totalCount }} 条记录&nbsp;&nbsp; 第
          {{ people.pageIndex }} / {{ people.totalPage }} 页
        </div>
        <el-pagination
          layout="prev,next"
          :small="false"
          prev-text="上一页"
          next-text="下一页"
          @prev-click="prevClick"
          @next-click="nextClick"
          :total="Number(people.totalCount)"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增人员弹框 -->

    <Dialog
      :PeopleList="PeopleList"
      :dialogVisible.sync="dialogVisible"
      :Personnel="Personnel"
    ></Dialog>
  </div>
</template>

<script>
import ViewsSearch from "@/components/viewsSearch";
import ViewsButton from "@/components/viewsButton";
import Dialog from "./components/Dialog.vue";
// Api
import { searchPeopleList, delPersonnel } from "@/api/people";
export default {
  data() {
    return {
      dialogVisible: false,
      allTaskStatusList: [], //头部搜索框
      params: {
        pageIndex: 0,
        pageSize: 10,
      },
      people: {},
      PeopleList: [],
      tableHead: [
        {
          prop: "userName",
          label: "人员名称",
        },
        {
          prop: "regionName",
          label: "归属区域",
        },
        {
          prop: "role.roleName",
          label: "角色",
        },
        {
          prop: "mobile",
          label: "联系电话",
        },
      ],
      Personnel: {},
    };
  },
  components: {
    ViewsSearch,
    ViewsButton,
    Dialog,
  },

  created() {
    this.getPeopleList();
  },

  methods: {
    // 序号排列
    indexMethod(index) {
      return (this.people.pageIndex - 1) * 10 + index + 1;
    },
    // 获取
    async getPeopleList() {
      // 当前自加 1
      this.params.pageIndex++;
      // 把单独数组和的结构出来
      const { currentPageRecords, ...people } = await searchPeopleList(
        this.params
      );
      // console.log(people);
      console.log(currentPageRecords);
      this.PeopleList = currentPageRecords;
      this.people = people;
    },
    // 搜索人员
    async searchForm(val) {
      console.log(1);
      const params = { pageIndex: 0, pageSize: 10, userName: "" };
      params.userName = val.number;
      const { currentPageRecords, ...people } = await searchPeopleList(params);
      // console.log(people);
      // console.log(currentPageRecords);
      this.PeopleList = currentPageRecords;
      this.people = people;
    },
    // 新增人员
    onAdd() {
      console.log("新建");
      this.dialogVisible = true;
    },
    // 上一页
    async prevClick() {
      // console.log("上一页");
      // 当前自加 1
      this.params.pageIndex--;
      // 把单独数组和的结构出来
      const { currentPageRecords, ...people } = await searchPeopleList(
        this.params
      );
      // console.log(people);
      // console.log(currentPageRecords);
      this.PeopleList = currentPageRecords;
      this.people = people;
    },
    // 下一页
    nextClick() {
      // console.log("下一页");
      this.getPeopleList();
    },
    // 修改
    handleClick(val) {
      console.log(val);
      this.Personnel = val;
      this.dialogVisible = true;
    },
    // 删除人员
    async delFn(val) {
      try {
        await delPersonnel(val.id);
        // 把单独数组和的结构出来
        this.params = { pageIndex: 1, pageSize: 10 };
        const { currentPageRecords, ...people } = await searchPeopleList(
          this.params
        );
        this.PeopleList = currentPageRecords;
        this.people = people;
        this.$message.success("删除成功");
      } catch (error) {
        this.$message.error("删除失败");
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
  .el-table_1_column_6 {
    .buttons {
      // display: flex;

      .info {
        background: transparent;
      }
    }
  }
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 32px 16px;
    span {
      font-size: 12px;
      color: #999;
      flex: 10;
    }
    ::v-deep .el-pagination {
      .btn-next {
        background-color: #d5ddf8;
        margin-left: 30px;
      }
      .btn-prev {
        background-color: #d5ddf8;
      }
    }
  }
}
</style>
