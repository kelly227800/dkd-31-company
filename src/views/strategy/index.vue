<template>
  <div>
    <div class="search">
      <viewsSearch text1="工单编号:" :allTaskStatusList="[]"></viewsSearch>
    </div>
    <div class="card">
      <viewsButton :type="'success'" @click="openDailog">
        <i class="el-icon-circle-plus-outline"></i>
        新建
      </viewsButton>
      <viewsForm
        class="formarea"
        :tableHead="tableHead"
        :getSearchList="getSearchList"
        :getSearchInfo="getSearchInfo"
      >
        <template>
          <span @click.prevent="" class="blue">查看详情</span>
          <span @click.prevent="" class="blue">修改</span>
          <span @click.prevent="" class="red">删除</span>
        </template>
      </viewsForm>
      <viewsPage
        :getSearchInfo="getSearchInfo"
        @pageIndex="getCurrentPageIndex"
        :disabledUp="disabledUp"
        :disabledDown="disabledDown"
      ></viewsPage>
    </div>
    <dialogs
      :dialogFormVisible="dialogFormVisible"
      @closeDialog="dialogFormVisible = false"
      @renderPage="getStrategyApi"
    ></dialogs>
  </div>
</template>

<script>
import moment from "moment";

import viewsPage from "@/components/viewsPage";
import viewsForm from "@/components/viewsForm";
import viewsSearch from "@/components/viewsSearch";
import viewsButton from "@/components/viewsButton";
import { getStrategyApi } from "@/api/strategy";
import dialogs from "./components/dialog.vue";
export default {
  components: {
    viewsButton,
    viewsSearch,
    viewsForm,
    viewsPage,
    dialogs,
  },
  data() {
    return {
      tableHead: [
        {
          prop: "policyName",
          label: "策略名称",
        },
        {
          prop: "discount",
          label: "策略方案",
        },
        {
          prop: "updateTime",
          label: "创建日期",
        },
      ],
      getSearchList: [],
      getSearchInfo: {},
      pageIndex: 1,
      currentPageIndex: 1,
      dialogFormVisible: false,
    };
  },
  computed: {
    disabledUp() {
      return this.currentPageIndex <= 1 ? true : false;
    },
    disabledDown() {
      return this.currentPageIndex >= this.getSearchInfo.totalPage
        ? true
        : false;
    },
  },
  created() {
    this.getStrategyApi();
    // this.tableHead[0].prop=['2','1','3']
  },

  methods: {
    async getStrategyApi() {
      const res = await getStrategyApi(
        `search?pageIndex=${this.pageIndex}&pageSize=10`
      );
      console.log(res);
      this.getSearchList = res.currentPageRecords;
      this.getSearchInfo = res;
      // console.log(this.getSearchList);

      this.dataformat(this.getSearchList);
    },
    dataformat(val) {
      this.getSearchList = val.map((value, index, array) => {
        value.createTime = moment(value.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return value;
      });
      // console.log(this.getSearchList);
    },
    async getCurrentPageIndex(val) {
      console.log(val);
      this.currentPageIndex = val;
      const res = await getStrategyApi(
        `search?pageIndex=${this.currentPageIndex}&pageSize=10`
      );
      this.getSearchList = res.currentPageRecords;
      this.getSearchInfo = res;
    },
    openDailog() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
  },
};
</script>

<style scoped>
.maincontainer {
  padding: 20px;
  /* background-color: #fff; */
}
.search {
  margin-bottom: 20px;
}
.card {
  padding: 20px 15px 19px 17px;
  background: #fff;
  /* margin-top: 15px; */
}
.formarea {
  margin-top: 20px;
}
.formarea span {
  margin-right: 5px;
}
.blue {
  color: #5f84ff;
}
.red {
  color: #ff5a5a;
}
</style>
