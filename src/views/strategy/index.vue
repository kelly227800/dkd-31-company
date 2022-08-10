<template>
  <div>
    <div class="search">
      <viewsSearch
        text1="策略搜索:"
        :allTaskStatusList="[]"
        @search="searchHandler"
      ></viewsSearch>
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
        ref="currentItem"
      >
        <template>
          <span class="blue" @click="checkDetails">查看详情</span>
          <span class="blue" @click="editIdea">修改</span>
          <span class="red" @click="delIdea">删除</span>
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
      @closeDialog="closeFn"
      @renderPage="randerPageHandler"
      :currentItem="currentItem"
      @clearData="clearDataFn"
    ></dialogs>
    <detailsDialogs
      :showDetails.sync="showDetails"
      :currentNode="currentNode"
      :currentNodeData="currentNodeData"
      ref="getItem"
    ></detailsDialogs>
  </div>
</template>

<script>
import moment from "moment";

import viewsPage from "@/components/viewsPage";
import viewsForm from "@/components/viewsForm";
import viewsSearch from "@/components/viewsSearch";
import viewsButton from "@/components/viewsButton";
import detailsDialogs from "./components/details.vue";
import {
  getStrategyApi,
  delStrategyApi,
  searchStrategyApi,
  getStrategyDetailsApi,
} from "@/api/strategy";
import dialogs from "./components/dialog.vue";
export default {
  name: "Dialog",
  components: {
    viewsButton,
    viewsSearch,
    viewsForm,
    viewsPage,
    dialogs,
    detailsDialogs,
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
      showDetails: false,
      currentItem: {},
      currentNode: [],
      currentNodeData: {},
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
      // console.log(res);
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
    randerPageHandler() {
      this.getStrategyApi();
      this.currentPageIndex = 1;
    },
    delIdea() {
      setTimeout(async () => {
        const id = this.$refs.currentItem.currentRow.policyId;
        console.log(id);
        const res = await delStrategyApi(id);
        this.getStrategyApi();
      }, 0);
      // console.log("删除数据");
    },
    editIdea() {
      console.log("修改数据");
      this.dialogFormVisible = true;
      setTimeout(() => {
        console.log(this.$refs.currentItem.currentRow);
        this.currentItem = this.$refs.currentItem.currentRow;
      }, 0);
    },
    closeFn() {
      this.dialogFormVisible = false;
      this.currentItem = "";
      this.getStrategyApi();
    },
    clearDataFn() {
      this.currentItem = "";
    },
    async searchHandler(val) {
      // console.log(val);
      const data = {
        pageIndex: this.currentPageIndex,
        pageSize: 10,
        policyName: val.number,
      };
      const res = await searchStrategyApi(data);
      // console.log(res);
      this.getSearchList = res.currentPageRecords;
    },
    checkDetails() {
      this.showDetails = true;
      setTimeout(async () => {
        // console.log(this.$refs.currentItem.currentRow);
        this.currentItem = this.$refs.currentItem.currentRow;

        const data = {
          pageIndex: this.currentItem.pageIndex,
          pageSize: 10,
        };
        const res = await getStrategyDetailsApi(
          this.currentItem.policyId,
          data
        );
        console.log(res);
        this.currentNode = res.currentPageRecords;
        this.currentNodeData = res;
        console.log(this.$refs.getItem.getData());
      }, 0);
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
