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
      <!-- 表格部分 -->
      <div class="bottom_form">
        <el-table
          :data="userWorkList"
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
              <el-button @click="details(scope.row)" type="text" size="small"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 底部导航 -->
      <div class="pagination-container">
        <div>
          共 {{ page.totalCount }} 条记录&nbsp;&nbsp; 第 {{ page.pageIndex }} /
          {{ page.totalPage }} 页
        </div>
        <el-pagination
          layout="prev,next"
          :small="false"
          prev-text="上一页"
          next-text="下一页"
          @prev-click="prevClick"
          @next-click="nextClick"
          :total="Number(page.totalCount)"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ViewsSearch from "@/components/viewsSearch";
import { getUserWork } from "@/api/people";
export default {
  data() {
    return {
      userWorkList: [],
      page: {},
      tableHead: [
        {
          prop: "userName",
          label: "人员名称",
        },
        {
          prop: "regionName",
          label: "角色",
        },
        {
          prop: "roleName",
          label: "角色",
        },
        {
          prop: "mobile",
          label: "联系电话",
        },
        {
          prop: "workCount",
          label: "完成工单",
        },
        {
          prop: "progressTotal",
          label: "当日进行中工单",
        },
        {
          prop: "cancelCount",
          label: "拒绝工单",
        },
      ],
      allTaskStatusList: [],
      params: {
        pageIndex: 0,
        pageSize: 10,
      },
    };
  },
  components: {
    ViewsSearch,
  },
  created() {
    this.getUserWork();
  },

  methods: {
    // 人员工作量列表
    async getUserWork() {
      // 解构一下
      this.params.pageIndex++;
      const { currentPageRecords, ...page } = await getUserWork(this.params);
      console.log(currentPageRecords);
      // console.log(page);
      this.userWorkList = currentPageRecords;
      this.page = page;
    },
    indexMethod(index) {
      return (this.page.pageIndex - 1) * 10 + index + 1;
    },
    // 搜索
    searchForm() {},
    // 上一页
    async prevClick() {
      // 解构一下
      this.params.pageIndex--;
      const { currentPageRecords, ...page } = await getUserWork(this.params);
      console.log(currentPageRecords);
      // console.log(page);
      this.userWorkList = currentPageRecords;
      this.page = page;
    },
    // 下一页
    nextClick() {
      this.getUserWork();
    },
    // 查看详情
    details(val) {
      console.log(val);
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
