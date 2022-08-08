<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <viewsSearch
      text1="工单编号"
      text2="工单状态"
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
        <!-- 添加新建弹层 -->
        <addDialog :visible="dialogAddVisible"></addDialog>
      </div>

      <!-- 表格 -->
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
      >
        <viewsButton @click="onMore" type="info">查看详情</viewsButton>
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
import { allTaskStatus, getSearch } from "@/api/workOrder";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "@/components/viewsForm";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
import addDialog from "./components/addDialog.vue";
export default {
  name: "marketing",
  data() {
    return {
      tableHead: [
        {
          prop: "taskCode",
          label: "工单编号",
        },
        {
          prop: "innerCode",
          label: "设备编号",
        },
        {
          prop: "taskType.typeName",
          label: "工单类型",
        },
        {
          prop: "createType",
          label: "工单方式",
        },
        {
          prop: "taskStatusTypeEntity.statusName",
          label: "工单状态",
        },
        {
          prop: "userName",
          label: "运营人员",
        },
        {
          prop: "createTime",
          label: "创建日期",
        },
      ],
      allTaskStatusList: [],
      getSearchList: [],
      getSearchInfo: {},
      disabledUp: false,
      disabledDown: false,
      params: {
        pageIndex: 1, //页码
        innerCode: "", //设备编号
        userId: "", //工单所属人Id
        taskCode: "", //工单编号
        status: "", //工单状态
        isRepair: true, //是否是维修工单
        start: "", //开始日期
        end: "", //结束日期
      },
      dialogAddVisible: false,
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    addDialog,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    onAdd() {
      console.log("新建");
      this.dialogAddVisible = true;
    },
    onSet() {
      console.log("配置");
    },
    onMore() {
      console.log("详情");
    },
    searchForm(formInline) {
      this.params.taskCode = formInline.number;
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
      const resSearch = await getSearch(this.params);
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
