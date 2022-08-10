<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 工单统计盒子 -->
        <div class="grid-content bg-purple headerBox bgc1">
          <div class="title">日销售统计</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="home-user-task-stats">
                <p>{{ dayOrderCount }}</p>
              </div>
              <div class="text-color2">
                <p>当日销售量（个）</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="home-user-task-stats">
                <p>{{ dayOrderAmount }}</p>
                <div class="text-color2">
                  <p>当日销售额（元）</p>
                </div>
              </div></el-col
            >
            <el-col :span="8">
              <div class="home-user-task-stats">
                <p>{{ dayTotalBill }}</p>
                <div class="text-color2">
                  <p>当日分成（元）</p>
                </div>
              </div></el-col
            >
          </el-row>
        </div></el-col
      >
      <el-col :span="11"
        ><div class="grid-content bg-purple headerBox bgc2">
          <div class="title">月销售统计</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="home-user-task-stats">
                <p style="color: red">{{ OrderCount }}</p>
              </div>
              <div class="text-color2">
                <p>当月销售量（个）</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="home-user-task-stats">
                <p style="color: red">{{ OrderAmount }}</p>
                <div class="text-color2">
                  <p>当月销售额（万元）</p>
                </div>
              </div></el-col
            >
            <el-col :span="8">
              <div class="home-user-task-stats">
                <p style="color: red">{{ TotalBill }}</p>
                <div class="text-color2">
                  <p>当月分成（元）</p>
                </div>
              </div></el-col
            >
          </el-row>
        </div></el-col
      >
    </el-row>
    <div class="main">
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="合作商">
            <el-select v-model="formInline.status" placeholder="请选择">
              <el-option
                :label="item"
                :value="formInline.status"
                v-for="item in formInline.status"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="formInline.value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <viewsButton type="default" @click="clickSearch">
              <i class="el-icon-search"></i>
              查询
            </viewsButton>
          </el-form-item>
        </el-form>
      </div>
      <div class="pricetitie">
        <span>笔数统计：{{ OrderCount }}个</span>
        <span>收入统计：{{ OrderAmount }}元</span>
        <span>分成统计：{{ TotalBill }}元</span>
      </div>
      <div class="table">
        <el-table
          :data="getSearchList"
          style="width: 100%"
          highlight-current-row
          :header-cell-style="{
            background: 'rgb(243, 246, 251)',
            color: 'rgb(102, 102, 102)',
            fontWeight: '500',
          }"
        >
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            v-for="(item, index) in tableHead"
            :key="index"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import dayjs from "dayjs";
import {
  getMoneyApi,
  totalBillApi,
  orderAmountApi,
  orderCountApi,
} from "@/api/checkmoney";
export default {
  components: {
    viewsButton,
  },
  data() {
    return {
      // 日期

      formInline: {
        status: "",
        value1: {
          start: "2022-08-01 00:00:00",
          end: "2022-08-09 23:59:59",
        },
      },

      tableHead: [
        {
          prop: "date",
          label: "订单日期",
        },
        {
          prop: "ownerName",
          label: "合作商",
        },
        {
          prop: "ratio",
          label: "分成比例",
        },
        {
          prop: "orderTotalMoney",
          label: "收入",
        },
        {
          prop: "orderCount",
          label: "笔数",
        },
        {
          prop: "totalBill",
          label: "分成金额",
        },
      ],
      getSearchList: [],
      allTaskStatusList: [],
      TotalBill: "",
      OrderAmount: "",
      OrderCount: "",
      dayTotalBill: "",
      dayOrderAmount: "",
      dayOrderCount: "",
      ownerNameList: [],
      ownerName: "",
    };
  },

  created() {
    this.getMoneyApi();
    this.getDayData();
    this.getMonthData();
  },

  methods: {
    async clickSearch() {
      console.log(this.formInline);
      const formatstarttime = dayjs(this.formInline.value1[0]).format(
        "YYYY-MM-DD"
      );
      const formatendtime = dayjs(this.formInline.value1[1]).format(
        "YYYY-MM-DD"
      );
      const data = {
        start: formatstarttime,
        end: formatendtime,
      };
      // console.log(this.data);
      const res = await getMoneyApi(data);
      this.getSearchList = res.currentPageRecords;
    },
    async getMoneyApi() {
      const time = new Date();
      const formatstarttime = dayjs(time).format("YYYY-MM") + "-01";
      const formatendtime = dayjs(time).format("YYYY-MM-DD");
      const data = {
        start: formatstarttime,
        end: formatendtime,
        pageIndex: 1,
        pageSize: 10,
      };

      const res = await getMoneyApi(data);

      // console.log(res);
      this.getSearchList = res.currentPageRecords;
      res.currentPageRecords.forEach((item) => {
        this.ownerNameList.push(item.ownerName);
      });

      this.formInline.status = new Set(this.ownerNameList);

      // console.log(this.formInline);
    },
    async getMonthData() {
      const daydata = this.formInline.value1;

      this.TotalBill = await totalBillApi(daydata);
      this.OrderAmount = await orderAmountApi(daydata);

      this.OrderAmount = Number(this.OrderAmount / 1000000).toFixed(2);
      console.log(this.OrderAmount);
      this.OrderCount = await orderCountApi(daydata);
    },
    async getDayData() {
      const time = new Date();
      const formatstarttime = dayjs(time).format("YYYY-MM-DD") + " 00:00:00";
      const formatendtime = dayjs(time).format("YYYY-MM-DD") + " 23:59:59";
      console.log(formatendtime);
      console.log(formatstarttime);
      const daydatas = {
        start: formatstarttime,
        end: formatendtime,
      };
      this.dayTotalBill = await totalBillApi(daydatas);
      this.dayOrderAmount = await orderAmountApi(daydatas);

      this.dayOrderAmount = Number(this.OrderAmount / 1000000).toFixed(2);
      console.log(this.OrderAmount);
      this.dayOrderCount = await orderCountApi(daydatas);
      console.log(this.dayOrderCount);
    },
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
.grid-content {
  margin-left: 20px !important;
  margin-top: 35px;
}
.Points {
  width: 154px;
  height: 230px;
  padding-top: 47px;
  padding-left: 38px;
  background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0,
    linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0,
    linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%,
    linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  p {
    height: 33px;
    margin-bottom: 10px;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
  }
  span {
    height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
  }
}

.textcol {
  font-size: 20px;
  color: #ff5757;
  font-weight: 500;
}
.title {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333;
  span {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #999;
  }
}
.bgc2 {
  background: #fbefe8 url(~@/assets/dashboard/bg33.png) no-repeat
    calc(100% - 12px) 100% !important;

  .home-user-task-stats {
    margin-top: 10px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }
  .text-color2 {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff5757;
    line-height: 17px;
  }
}
.bgc1 {
  background: #e9f3ff !important;
  background-image: url(~@/assets/dashboard/bg11.png),
    url(~@/assets/dashboard/bg22.png) !important;
  background-repeat: no-repeat, no-repeat !important;
  background-position: 0 0, calc(100% - 12px) 100% !important;
  .title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;
    span {
      margin-left: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999;
    }
  }
  .home-user-task-stats {
    margin-top: 10px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
  }
  .text-color2 {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #91a7dc;
    line-height: 17px;
  }
}
.headerBox {
  height: 150px;
  padding: 25px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
  border-radius: 20px;
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.search {
  background-color: #fff;
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  .el-form-item {
    margin-bottom: 0;
    .search_btn {
      background-color: #5f84ff;
      color: #fff;
    }
  }
}
.pricetitie {
  span {
    margin-right: 30px;
  }
}
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
