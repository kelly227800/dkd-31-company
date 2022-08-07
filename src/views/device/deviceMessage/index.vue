<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <viewsSearch
      ref="search"
      text1="设备编号"
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
        <NewlyBuilt
          :centerDialogVisible.sync="centerDialogVisible"
        ></NewlyBuilt>
        <viewsButton @click="onSet" type="warning">批量操作</viewsButton>
      </div>
      <!-- 表格 -->
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
        ref="form"
      >
        <viewsButton @click="onMore" type="info">货道</viewsButton>
        <viewsButton @click="onMore" type="info">策略</viewsButton>
        <viewsButton @click="onMore" type="info">修改</viewsButton>
      </viewsForm>
      <!-- 分页 -->
      <viewsPage
        :getSearchInfo="getSearchInfo"
        @pageIndex="allTask"
        :disabledUp="disabledUp"
        :disabledDown="disabledDown"
      ></viewsPage>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { allTaskStatus } from "@/api/workOrder";
import { getequipmentlistapi } from "@/api/device";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "./components/viewsForm.vue";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
import NewlyBuilt from "./components/NewlyBuilt.vue";
export default {
  name: "marketing",
  data() {
    return {
      tableHead: [
        {
          prop: "serial",
          label: "序号",
        },
        {
          prop: "innerCode",
          label: "设备编号",
        },
        {
          prop: "type.name",
          label: "设备型号",
        },
        {
          prop: "node.name",
          label: "详细地址",
        },
        {
          prop: "node.ownerName",
          label: "合作商",
        },
        {
          prop: "vmStatus",
          label: "设备状态",
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
      centerDialogVisible: false,
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    NewlyBuilt,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    onAdd() {
      console.log("新建");
      this.centerDialogVisible = true;
    },
    onSet() {
      console.log("配置");
    },
    onMore() {
      console.log("详情");
    },
    searchForm() {
      this.params.innerCode = this.$refs.search.formInline.number;
      this.allTask(1);
    },
    // 初始获取页面内容
    async allTaskStatus() {
      const resStatus = await allTaskStatus();
      this.allTaskStatusList = resStatus;
      //   console.log(this.allTaskStatusList);
    },
    async allTask(pageIndex) {
      this.params.pageIndex = pageIndex;
      console.log(this.params);
      const resSearch = await getequipmentlistapi(this.params);
      this.getSearchInfo = resSearch;
      this.getSearchList = resSearch.currentPageRecords;
      let indexMethod = 0;
      this.getSearchList.forEach((e) => {
        indexMethod++;
        e.serial = indexMethod + (this.params.pageIndex - 1) * 10;
        if (e.vmStatus === 0) {
          e.vmStatus = "未投放";
        }
        if (e.vmStatus === 1) {
          e.vmStatus = "运营";
        }
        if (e.vmStatus === 3) {
          e.vmStatus = "撤机";
        }
      });
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
      this.changeFormat(this.getSearchList);
    },
    // 对获取的数据进行格式修改
    changeFormat(getSearchList) {
      this.getSearchList = getSearchList.map((value, index, array) => {
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
