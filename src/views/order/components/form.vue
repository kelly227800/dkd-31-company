<template>
  <div class="bottom_form">
    <el-table
      :data="getSearchList"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      :header-cell-style="{
        background: 'rgb(243, 246, 251)',
        color: 'rgb(102, 102, 102)',
        fontWeight: '500',
      }"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        ref="currentItem"
      >
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
          <div class="details" @click="getDetails(scope.row)">查看详情</div>
        </template>
      </el-table-column>
    </el-table>
    <gPage
      :getSearchInfo="getSearchInfo"
      :disabledUp="disabledUp"
      :disabledDown="disabledDown"
      @pageIndex="getCurrentPageIndex"
    ></gPage>
    <el-dialog
      title="订单详情"
      :visible="dialogTableVisible"
      width="630px"
      @close="closeFn"
    >
      <div class="picTitle">
        <div class="leftpic">
          <img src="@/assets/images/true.png" alt="" />出货成功
        </div>
        <div class="rightpic">
          <img src="@/assets/images/workOrder-finish.png" alt="" />
        </div>
      </div>
      <div class="textarea">
        <div class="lefttext">
          <div class="textG">订单编号：{{ detailsData.orderNo }}</div>
          <div class="textG">设备编号：{{ detailsData.innerCode }}</div>
          <div class="textG">完成编号：{{ detailsData.updateTime }}</div>
          <div class="textG">设备地址：{{ detailsData.addr }}</div>
        </div>
        <div class="righttext">
          <div class="textG">商品名称：{{ detailsData.skuName }}}}</div>
          <div class="textG">订单金额：{{ detailsData.price }}</div>
          <div class="textG">创建时间：{{ detailsData.createTime }}</div>
          <div class="textG">支付方式：{{ detailsData.payStatus }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { getOrderApi, getSeachOrderApi } from "@/api/order";
import gPage from "./page.vue";
export default {
  props: {
    dateData: {
      type: Object,
      default: () => ({}),
    },
    num: {
      type: Number,
    },
  },
  watch: {
    dateData: {
      handler() {
        console.log(123);
      },
      deep: true,
    },
  },
  data() {
    return {
      tableHead: [
        {
          prop: "orderNo",
          label: "订单编号",
        },
        {
          prop: "skuName",
          label: "商品名称",
        },
        {
          prop: "price",
          label: "订单金额",
        },
        {
          prop: "innerCode",
          label: "设备编号",
        },
        {
          prop: "status",
          label: "订单状态",
        },
        {
          prop: "updateTime",
          label: "订单日期",
        },
      ],
      getSearchList: [],
      getSearchInfo: {},
      pageIndex: 1,
      currentPageIndex: 1,
      dialogTableVisible: false,
      detailsData: {},
    };
  },
  components: {
    gPage,
  },
  created() {
    this.getOrderApi();
    // this.getCurrentPageIndex();
  },

  methods: {
    async getSeachOrderApi() {
      // console.log(this.dateData);

      let data = {};
      setTimeout(async () => {
        data = {
          pageIndex: this.currentPageIndex,
          pageSize: 10,
          orderNo: this.dateData.number,
          startDate: this.dateData.value1[0],
          endDate: this.dateData.value1[1],
        };
        const { currentPageRecords, ...getSearchInfo } = await getSeachOrderApi(
          data
        );
        console.log(currentPageRecords);
        this.getSearchList = currentPageRecords;
        this.getSearchInfo = getSearchInfo;
      }, 0);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    indexMethod(index) {
      return (this.getSearchInfo.pageIndex - 1) * 10 + index + 1;
    },
    async getOrderApi() {
      const res = await getOrderApi(
        `?pageIndex=${this.currentPageIndex}&pageSize=10`
      );
      console.log(res.currentPageRecords);
      this.getSearchList = res.currentPageRecords;
      this.getSearchInfo = res;
      // this.currentPageIndex = res.pageIndex;
    },
    async getCurrentPageIndex(val) {
      this.currentPageIndex = val;
      const res = await getOrderApi(
        `?pageIndex=${this.currentPageIndex}&pageSize=10`
      );
      this.getSearchList = res.currentPageRecords;
      this.getSearchInfo = res;
      console.log(this.currentPageIndex);
      // this.$emit("getcurrentPageIndex", this.currentPageIndex);
    },
    getDetails(val) {
      console.log("查看详情");
      console.log(val);
      this.detailsData = val;
      this.dialogTableVisible = true;
    },
    closeFn() {
      this.dialogTableVisible = false;
    },
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
};
</script>

<style scoped lang="scss">
.details {
  color: #5f84ff;
}
.el-dialog .el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
}
.picTitle {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 54px;
  margin-bottom: 30px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  justify-content: space-between;
  .leftpic {
    margin-left: 10px;
  }
  .rightpic {
    margin-right: 45px;
  }
}
.textarea {
  width: 100%;
  height: 180px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  .textG {
    width: 185px;
    height: 36px;
  }
  .lefttext {
    flex: 1;
  }
  .righttext {
    flex: 1;
  }
}
</style>
