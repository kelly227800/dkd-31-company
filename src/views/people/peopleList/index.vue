<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <viewsSearch
      text1="人员搜索"
      :allTaskStatusList="allTaskStatusList"
      @search="searchForm"
    ></viewsSearch>
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
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
      >
        <div style="display: flex; background: transparent">
          <viewsButton style="background: transparent" type="info"
            >修改</viewsButton
          >
          <viewsButton
            style="background: transparent; color: red"
            type="info"
            @click="delFn()"
            >删除</viewsButton
          >
        </div>
      </viewsForm>
      <!-- 分页 -->
      <viewsPage
        :getSearchInfo="getSearchInfo"
        @pageIndex="allTask"
        :disabledUp="disabledUp"
        :disabledDown="disabledDown"
      ></viewsPage>
    </div>

    <!-- 新增人员弹框 -->
    <el-dialog title="新增工单" :visible.sync="addIsShow" width="620px" center>
      <Dialog></Dialog>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { allTaskStatus, getSearch } from "@/api/workOrder";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "@/components/viewsForm";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
import Dialog from "./components/Dialog.vue";
//
import { searchPeopleList } from "@/api/people";
export default {
  name: "marketing",
  data() {
    return {
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
      allTaskStatusList: [],
      getSearchList: [],
      getSearchInfo: {},
      disabledUp: false,
      disabledDown: false,
      params: {
        pageIndex: 1,
        number: "",
        status: "",
      },
      addIsShow: false,
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    Dialog,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    onAdd() {
      console.log("新建");
      this.addIsShow = true;
    },
    onSet() {
      console.log("配置");
    },
    onMore() {
      console.log("详情");
    },
    // 查询
    searchForm(formInline) {
      console.log(2);
      this.params.number = formInline.number;
      this.params.status = formInline.status;
      this.allTask(1);
    },
    // 初始获取页面内容
    async allTaskStatus() {
      const resStatus = await allTaskStatus();
      this.allTaskStatusList = resStatus;
      //   console.log(this.allTaskStatusList);
    },
    async allTask(pageIndex) {
      // console.log(pageIndex);
      // console.log(this.$refs.searchForm.formInline);
      this.params.pageIndex = pageIndex;
      // console.log(this.params);
      const resSearch = await searchPeopleList(this.params);
      console.log(resSearch);
      this.getSearchInfo = resSearch;
      this.getSearchList = resSearch.currentPageRecords;
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
      // console.log(this.getSearchList);
      this.changeFormat(this.getSearchList);
    },
    // 对获取的数据进行格式修改
    changeFormat(getSearchList) {
      // console.log(getSearchList);
      this.getSearchList = getSearchList.map((value, index, array) => {
        // console.log(value.createType);
        if (value.createType === 1) {
          value.createType = "手动";
        } else {
          value.createType = "自动";
        }
        value.createTime = moment(value.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return value;
      });
    },
    delFn(val) {
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
}
</style>
