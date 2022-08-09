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

        <viewsButton @click="onSet" type="warning">批量操作</viewsButton>
      </div>
      <!-- 表格 -->
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
        ref="form"
      >
        <div style="display: flex">
          <span class="span" @click="cargolanesfn">货道</span>
          <span class="span" @click="tacticsfn">策略</span>
          <span class="span" @click="revisefn">修改</span>
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
    <NewlyBuilt
      v-if="centerDialogVisible"
      :centerDialogVisible.sync="centerDialogVisible"
      :currentPageRecordslist="currentPageRecordslist"
      :PointscurrentPageRecordslist="PointscurrentPageRecordslist"
      @update="allTask(1)"
    ></NewlyBuilt>
    <Revise
      v-if="revisedialogVisible"
      :revisedialogVisible.sync="revisedialogVisible"
      :revisecurrentPageRecordslist="revisecurrentPageRecordslist"
      :revisecurrentRow="revisecurrentRow"
      @update="allTask(1)"
    ></Revise>
    <Tactics
      v-if="tacticsdialogVisible"
      :tacticsdialogVisible.sync="tacticsdialogVisible"
      :tacticsdialogVisibleitem="tacticsdialogVisibleitem"
      :tacticsdialogVisibleitemid="tacticsdialogVisibleitemid"
      @update="allTask(1)"
    ></Tactics>
    <Firesword
      v-if="FiresworddialogVisible"
      :FiresworddialogVisible.sync="FiresworddialogVisible"
      :Cargolanesdeitlist="Cargolanesdeitlist"
      :Cargolanestypedei="Cargolanestypedei"
    ></Firesword>
    <Bulkconfiguration
      v-if="batchdialogVisible"
      :batchdialogVisible.sync="batchdialogVisible"
      :batchdialogVisiblelist="batchdialogVisiblelist"
      @update="allTask(1)"
    ></Bulkconfiguration>
  </div>
</template>

<script>
import moment from "moment";
import { allTaskStatus } from "@/api/workOrder";
import {
  getequipmentlistapi,
  gettypelistapi,
  getPointsSearchapi,
  getInquiretacticsapi,
  getCargolanesdeitapi,
  getCargolanestypedeitapi,
} from "@/api/device";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "./components/viewsForm.vue";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
import NewlyBuilt from "./components/NewlyBuilt.vue";
import Revise from "./components/revise.vue";
import Tactics from "./components/tactics.vue";
import Firesword from "./components/Firesword.vue";
import Bulkconfiguration from "./components/Bulkconfiguration.vue";
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
      currentPageRecordslist: [],
      PointscurrentPageRecordslist: [],
      revisedialogVisible: false,
      revisecurrentPageRecordslist: [],
      revisecurrentRow: {},
      tacticsdialogVisible: false,
      tacticsdialogVisibleitem: {},
      tacticsdialogVisibleitemid: {},
      FiresworddialogVisible: false,
      batchdialogVisible: false,
      batchdialogVisiblelist: [],
      Cargolanesdeitlist: [],
      Cargolanestypedei: {},
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    NewlyBuilt,
    Revise,
    Tactics,
    Firesword,
    Bulkconfiguration,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    async onAdd() {
      // console.log("新建");
      const { currentPageRecords } = await gettypelistapi({
        pageIndex: 1,
        pageSize: 99999999,
      });
      this.currentPageRecordslist = currentPageRecords;
      const { currentPageRecords: PointscurrentPageRecords } =
        await getPointsSearchapi({
          pageIndex: 1,
          pageSize: 99999999,
        });
      this.PointscurrentPageRecordslist = PointscurrentPageRecords;
      this.centerDialogVisible = true;
    },
    onSet() {
      // console.log("批量配置");
      if (this.$refs.form.multipleSelection) {
        setTimeout(() => {
          this.batchdialogVisiblelist = this.$refs.form.multipleSelection;
          this.batchdialogVisible = true;
        });
      } else {
        this.$message.error("请先勾选售货机");
      }
    },
    searchForm() {
      this.params.innerCode = this.$refs.search.formInline.number;
      this.allTask(1);
    },
    // 初始获取页面内容
    async allTaskStatus() {
      const resStatus = await allTaskStatus();
      this.allTaskStatusList = resStatus;
    },
    async allTask(pageIndex) {
      this.params.pageIndex = pageIndex;
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
    cargolanesfn() {
      setTimeout(async () => {
        this.Cargolanesdeitlist = await getCargolanesdeitapi(
          this.$refs.form.currentRow.innerCode
        );
        this.Cargolanestypedei = await getCargolanestypedeitapi(
          this.$refs.form.currentRow.type.typeId
        );
        this.FiresworddialogVisible = true;
      });
    },
    tacticsfn() {
      setTimeout(async () => {
        this.tacticsdialogVisibleitemid = this.$refs.form.currentRow;
        this.tacticsdialogVisibleitem = await getInquiretacticsapi(
          this.$refs.form.currentRow.innerCode
        );
        this.tacticsdialogVisible = true;
      });
    },
    revisefn() {
      setTimeout(async () => {
        this.revisecurrentRow = this.$refs.form.currentRow;
        const { currentPageRecords: revisecurrentPageRecords } =
          await getPointsSearchapi({
            pageIndex: 1,
            pageSize: 99999999,
          });
        this.revisecurrentPageRecordslist = revisecurrentPageRecords;
        this.revisedialogVisible = true;
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
.span {
  display: flex;
  cursor: pointer;
  color: #5f84ff;
  padding: 5px;
}
</style>
