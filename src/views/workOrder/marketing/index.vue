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
        <addDialog
          @addSave="allTask"
          :visible.sync="dialogAddVisible"
          :productType="productType"
        ></addDialog>
        <viewsButton @click="onSet" type="warning">工单配置</viewsButton>
        <setDialog
          @addSave="allTask"
          :visible.sync="dialogSetVisible"
        ></setDialog>
      </div>

      <!-- 表格 -->
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
      >
        <viewsButton @click="onMore()" type="info">查看详情</viewsButton>
        <moreDialog
          @addSave="allTask"
          :visible.sync="dialogMoreVisible"
        ></moreDialog>
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
import { allTaskStatus, getSearch,taskInfo } from "@/api/workOrder";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "@/components/viewsForm";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
// 弹层的组件
import addDialog from "./components/addDialog.vue";
import setDialog from "./components/setDialog.vue";
import moreDialog from "./components/moreDialog.vue";
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
      allTaskStatusList: [], //所有的工单状态
      getSearchList: [], //10条表格数据
      getSearchInfo: {}, //整体信息，带页码
      disabledUp: false, //上一页是否禁用
      disabledDown: false, //下一页是否禁用
      params: {
        pageIndex: 1, //页码
        innerCode: "", //设备编号
        userId: "", //工单所属人Id
        taskCode: "", //工单编号
        status: "", //工单状态
        isRepair: false, //是否是维修工单
        start: "", //开始日期
        end: "", //结束日期
      },
      dialogAddVisible: false, //添加弹层的显示隐藏
      productType: [], //工单类型，添加弹层需要
      dialogSetVisible: false,
      dialogMoreVisible: false,
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    addDialog,
    setDialog,
    moreDialog,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    onAdd() {
      this.dialogAddVisible = true;
    },
    onSet() {
      this.dialogSetVisible = true;
    },
    async onMore() {
      this.dialogMoreVisible = true;
      await taskInfo()
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
    },
    async allTask(pageIndex) {
      this.params.pageIndex = pageIndex;
      const resSearch = await getSearch(this.params);
      this.getSearchInfo = resSearch;
      this.getSearchList = resSearch.currentPageRecords;
      // 筛选出所有的工单类型，得到数组对象
      this.productType = this.getSearchList.map((value) => {
        return value.taskType;
      });
      this.productType = this.unique(this.productType, "typeId");
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
    // 对工单类型进行去重
    unique(arr, attrName) {
      const res = new Map();
      return arr.filter(
        (a) => !res.has(a[attrName]) && res.set(a[attrName], 1)
      );
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
