<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <viewsSearch
      ref="equipmentstatussearch"
      text1="设备编号"
      :allTaskStatusList="allTaskStatusList"
      @search="searchForm"
    ></viewsSearch>
    <!-- 下边的整个表格 -->
    <div class="result">
      <!-- 表格 -->
      <viewsForm
        ref="form"
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :getSearchInfo="getSearchInfo"
      >
        <template #equipmentstate>
          <div class="spans">
            <span class="span offline">离线</span>
            <span class="span">货道</span>
            <span class="span">传动轴</span>
          </div>
        </template>
        <template #operate>
          <viewsButton @click="onMore" type="info">查看详情</viewsButton>
        </template>
      </viewsForm>
      <!-- 分页 -->
      <viewsPage
        :getSearchInfo="getSearchInfo"
        @pageIndex="allTask"
        :disabledUp="disabledUp"
        :disabledDown="disabledDown"
      ></viewsPage>
    </div>
    <DeviceDetails
      v-if="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      :list="merchandisesaleslist"
      :Replenishment="Replenishment"
      :Maintenance="Maintenance"
      :allSales="allSales"
      :sales="allsales"
    ></DeviceDetails>
  </div>
</template>

<script>
import moment from "moment";
import { allTaskStatus } from "@/api/workOrder";
import {
  getequipmentlistapi,
  getSalesapi,
  getReplenishmentapi,
  getMaintenanceapi,
  getallSalesapi,
  getallsalesapi,
} from "@/api/device";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "./components/viewsForm.vue";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
import DeviceDetails from "./components/DeviceDetails.vue";
import { timeFormat, getFirstDayOfMonth } from "@/gettimes";
export default {
  name: "marketing",
  data() {
    return {
      tableHead: [
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
          prop: "vmStatus",
          label: "运营状态",
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
      dialogVisible: false,
      merchandisesaleslist: [],
      Replenishment: 0,
      Maintenance: 0,
      allSales: 0,
      allsales: 0,
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
    DeviceDetails,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    onAdd() {
      console.log("新建");
    },
    onSet() {
      console.log("配置");
    },
    onMore() {
      console.log("详情");
      this.dialogVisible = true;
      setTimeout(async () => {
        let monthfirstitem = getFirstDayOfMonth(new Date());
        let monthfirstitems = getFirstDayOfMonth(new Date()) + " 00:00:00";
        let newtimes = timeFormat(new Date());
        let newtime = timeFormat(new Date()) + " 23:59:59";
        let innerCodes = "";
        let datas = {};
        const res = this.$refs.form.currentRow;
        // datas.vmType = res.vmType;
        // datas.nodeId = res.nodeId;
        datas.createUserId = res.createUserId;
        innerCodes = res.innerCode;
        const paramsparameter = {};
        paramsparameter.innerCode = res.innerCode;
        // paramsparameter.partnerId = res.partnerId;
        paramsparameter.start = monthfirstitems;
        paramsparameter.end = newtime;
        this.allSales = await getallSalesapi(paramsparameter);
        this.allsales = await getallsalesapi(paramsparameter);
        this.merchandisesaleslist = await getSalesapi(
          innerCodes,
          monthfirstitem,
          newtimes
        );
        this.Replenishment = await getReplenishmentapi(
          innerCodes,
          monthfirstitem,
          newtimes
        );
        this.Maintenance = await getMaintenanceapi(
          innerCodes,
          monthfirstitem,
          newtimes
        );
      });
    },
    searchForm() {
      this.params.innerCode =
        this.$refs.equipmentstatussearch.formInline.number;
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
.spans {
  display: flex;
}
.span {
  display: block;
  height: 23px;
  padding: 0px 12px;
  background: linear-gradient(135deg, rgb(63, 201, 151), rgb(75, 218, 152))
    rgb(255, 102, 95);
  border-radius: 14px;
  text-align: center;
  color: rgb(255, 255, 255);
  line-height: 23px;
  margin-right: 5px;
}
.offline {
  background: linear-gradient(135deg, rgb(255, 176, 67), rgb(255, 192, 32))
    rgb(255, 102, 95);
}
</style>
