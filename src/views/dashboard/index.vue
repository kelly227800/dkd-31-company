<template>
  <div>
    <!-- 上方数据图 -->
    <el-row class="data-sheet-top">
      <!-- 统计表 -->
      <el-col :span="18">
        <!-- 工单统计 -->
        <el-row>
          <el-col class="el-12" :span="12">
            <div
              style="font-size: 16px; color: #000; font-weight: bold"
              class="salesTitle"
            >
              工单统计
              <span style="font-size: 12px; color: #999; font-weight: 400">
                2022.08.08 ~ 2022.08.11</span
              >
            </div>
            <el-row>
              <el-col :span="6">
                <div class="col-first-child">197</div>
                <div>工单总数(个)</div>
              </el-col>
              <el-col :span="6">
                <div class="col-first-child">0</div>
                <div>完成工单(个)</div>
              </el-col>
              <el-col :span="6">
                <div class="col-first-child">0</div>
                <div>进行工单（个）</div>
              </el-col>
              <el-col :span="6">
                <div class="col-first-child">191</div>
                <div class="bg-purple-light">取消工单（个）</div>
              </el-col>
            </el-row>
          </el-col>

          <!-- 销售员统计 -->
          <el-col :span="11"
            ><div
              style="font-size: 16px; color: #000; font-weight: bold"
              class="salesTitle"
            >
              销售统计
              <span style="font-size: 12px; color: #999; font-weight: 400">
                2022.08.08 ~ 2022.08.11</span
              >
            </div>
            <el-row>
              <el-col :span="12">
                <div class="col-first-child">4053</div>
                <div>订单量（个）</div>
              </el-col>
              <el-col :span="12">
                <div class="col-first-child">2.82</div>
                <div>销售额（万元）</div>
              </el-col>
            </el-row></el-col
          >
        </el-row>
        <!-- 销售数据 -->
        <el-row>
          <el-row class="sales-data">
            <el-col>
              <div
                style="font-size: 16px; color: #000; font-weight: bold"
                class="salesTitle"
              >
                销售数据
                <span style="font-size: 12px; color: #999; font-weight: 400">
                  2022.08.08 ~ 2022.08.11</span
                >
              </div>
              <!--  -->
              <div class="week-month-year">
                <div
                  :class="{ current: time == 'week' }"
                  @click="time = 'week'"
                >
                  周
                </div>
                <div
                  :class="{ current: time == 'mouth' }"
                  @click="time = 'mouth'"
                >
                  月
                </div>
                <div
                  :class="{ current: time == 'year' }"
                  @click="time = 'year'"
                >
                  年
                </div>
              </div>
            </el-col>
            <el-col style="width: 100%; height: 100%; display: flex">
              <div ref="chart" id="dataLeft"></div>
              <div ref="chart" id="dataRight"></div>
            </el-col>
          </el-row>
        </el-row>
      </el-col>

      <!-- 商品热榜 -->
      <el-col class="Hot-list" :span="6">
        <div
          style="font-size: 16px; color: #000; font-weight: bold"
          class="salesTitle"
        >
          商品热榜
          <span style="font-size: 12px; color: #999; font-weight: 400">
            2022.08.08 ~ 2022.08.11</span
          >
        </div>
        <div class="table">
          <div class="hot">
            <div class="top top1">1</div>
            <div>统一阿萨姆奶茶</div>
            <div>517单</div>
          </div>
          <div class="hot">
            <div class="top top2">2</div>
            <div>怡宝</div>
            <div>453单</div>
          </div>
          <div class="hot">
            <div class="top top3">3</div>
            <div>100橙汁自然鲜</div>
            <div>451单</div>
          </div>
          <div class="hot">
            <div class="top">4</div>
            <div>茉莉花茶</div>
            <div>404单</div>
          </div>
          <div class="hot">
            <div class="top">5</div>
            <div>星巴克</div>
            <div>385单</div>
          </div>
          <div class="hot">
            <div class="top">6</div>
            <div>可口可乐</div>
            <div>384单</div>
          </div>
          <div class="hot">
            <div class="top">7</div>
            <div>康师傅红茶</div>
            <div>361单</div>
          </div>
          <div class="hot">
            <div class="top">8</div>
            <div>青梅绿茶</div>
            <div>301单</div>
          </div>
          <div class="hot">
            <div class="top">9</div>
            <div>泡面</div>
            <div>212单</div>
          </div>
          <div class="hot">
            <div class="top">10</div>
            <div>苹果手机</div>
            <div>199单</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 下方数据图 -->
    <el-row class="data-sheet-bottom">
      <!-- 左侧合作商 -->
      <el-col class="partner">
        <div class="title">
          <div>合作商点位数Top5</div>
          <div class="more">
            <svg-icon icon-class="more" />
          </div>
        </div>
        <div class="body">
          <div id="pieChart">1</div>
          <div class="collect">
            <div class="collunt">
              <div class="count">16</div>
              <div class="name">点位数</div>
              <div class="count count2">5</div>
              <div class="name">合作商数</div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 右侧设备监控 -->
      <el-col class="abnormal">
        <div class="title">
          <div>异常设备监控</div>
          <div class="more">
            <svg-icon icon-class="more" />
          </div>
        </div>
        <div class="abnormal-img">
          <img src="../../assets/images/empty.87c4f71b.png" alt="" />
          <span style="margin-left: 20px">暂无数据</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      time: "week",
    };
  },

  created() {},
  mounted() {
    this.getDataLeft();
    this.getDataRight();
    this.getpieChart();
  },

  methods: {
    getDataLeft() {
      console.log(1);
      const chart = document.querySelector("#dataLeft");
      if (chart) {
        const myChart = echarts.init(chart);
        const option = {
          xAxis: {
            type: "category",
            data: ["星期一", "星期二", "星期三"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [4000, 2000, 0],
              type: "line",
              smooth: true,
            },
          ],
          title: [
            {
              top: "3%",
              left: "center",
              text: "销售额趋势图",
            },
            {
              top: "5%",
              left: "5%",
              subtext: "单位：元",
            },
          ],
          color: "red", //改变折线点的颜色
          lineStyle: {
            color: "red", //改变折线颜色
          },
        };
        myChart.setOption(option);
      }
      //
      console.log(2);
    },
    getDataRight() {
      console.log(1);
      const chart = document.querySelector("#dataRight");
      if (chart) {
        const myChart = echarts.init(chart);
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "Direct",
              type: "bar",
              barWidth: "60%",
              data: [10, 52, 200, 334, 390, 330, 220],
            },
          ],
          title: [
            {
              top: "3%",
              left: "center",
              text: "销售额分布",
            },
            {
              top: "5%",
              left: "5%",
              subtext: "单位：元",
            },
          ],
        };
        myChart.setOption(option);
      }
      //
      console.log(2);
    },
    getpieChart() {
      // pieChart
      const chart = document.querySelector("#pieChart");
      if (chart) {
        const myChart = echarts.init(chart);
        const option = {
          tooltip: {
            trigger: "item",
          },

          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["20%", "80%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },

              emphasis: {
                label: {
                  show: true,
                  fontSize: "15",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 57.89, name: "金燕龙合作商" },
                { value: 15.79, name: "天华物业" },
                { value: 10.53, name: "北京合作商" },
                { value: 10.53, name: "金燕龙物业" },
                { value: 5.26, name: "likede" },
              ],
            },
          ],
        };
        myChart.setOption(option);
      }
      //
      console.log(2);
    },
  },
};
</script>

<style scoped lang="scss">
.data-sheet-top {
  // 工单统计
  .el-row {
    .el-12 {
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      min-height: 166px;
      background: #e9f3ff;
      border-radius: 20px;
      padding: 20px;
      background-image: url(~@/assets/images/top-1.png),
        url(~@/assets/images/top-2.png);
      background-repeat: no-repeat, no-repeat;
      background-position: 0 0, calc(100% - 12px) 100%;
      .grid-content {
        width: 100%;
        height: 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .el-row {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-col-6 {
          padding: 0 10px;
          margin-top: 3px;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          color: #91a7dc;
          .col-first-child {
            text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
            color: #072074;
            height: 50px;
            font-size: 40px;
            font-weight: 600;
            line-height: 50px;
            margin-bottom: 10px;
          }
          .bg-purple {
            font-weight: bold;
            font-size: 16px;
          }
        }
      }
    }
  }
  // 销售统计
  .el-col-11 {
    display: flex;
    flex-direction: column;
    min-height: 166px;
    background: #e9f3ff;
    border-radius: 20px;
    padding: 20px;
    background: #fbefe8 url(~@/assets/images/top-3.png) no-repeat
      calc(100% - 12px) 100%;
    .grid-content {
      width: 100%;
      height: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .el-row {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-col-12 {
        padding: 0 10px;
        margin-top: 3px;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: #de9690;
        .col-first-child {
          text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
          color: #ff5757;
          height: 50px;
          font-size: 40px;
          font-weight: 600;
          line-height: 50px;
          margin-bottom: 10px;
        }
        .bg-purple {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }

  // 热榜
  .Hot-list {
    padding: 20px;
    background-color: #fff;
    min-height: 538px;
    border-radius: 20px;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    .table {
      margin-top: 30px;
      .hot {
        margin: 25px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .top {
        display: inline-block;
        width: 16px;
        height: 20px;
        margin-left: 10px;
        background: url(~@/assets/images/1660129870547.jpg);
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #e9b499;
        line-height: 14px;
      }
      .top1 {
        width: 21px;
        height: 20px;
        background: url(~@/assets/images/hot-1.png) !important;
        color: #8e5900;
      }
      .top2 {
        width: 21px;
        height: 20px;
        color: #494949;
        background: url(~@/assets/images/hot-2.png) !important;
      }
      .top3 {
        width: 21px;
        height: 20px;
        color: #cf6d3d;
        background: url(~@/assets/images/hot-3.png) !important;
      }
    }
  }
  // 销售数据
  .sales-data {
    margin-right: 30px;
    padding: 20px;
    height: calc(40vh - 68px);
    min-height: 352px;
    margin-top: 20px;
    background: #fff;
    border-radius: 20px;
    .el-col {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #dataLeft {
      width: 50%;
      height: 90%;
      background-color: #fff;
    }
    #dataRight {
      width: 50%;
      height: 90%;
      background-color: #fff;
    }
    .week-month-year {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 129px;
      height: 34px;
      background: rgba(233, 243, 255, 0.37);
      border-radius: 10px;
      div {
        // margin-right: 5px;
        width: 37px;
        height: 25px;
        font-size: 14px;
        color: #9ca3b4;
        cursor: pointer;
        text-align: center;
        line-height: 25px;
      }
    }
  }
}
.current {
  background: #fff;
  -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  border-radius: 7px;
  font-weight: 600;
  color: #000;
}

// 底部
.data-sheet-bottom {
  margin-top: 20px;
  display: flex;
  // 左侧
  .partner {
    flex: 4;
    margin-right: 30px;
    padding: 20px;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: #fff;
    border-radius: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .more {
        color: #5f84ff;
        cursor: pointer;
      }
    }
    .body {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      display: flex;
      #pieChart {
        width: 500px;
        height: 284px;
        // background-color: #000;
      }
      .collect {
        width: 200px;
        height: 230px;
        display: flex;
        justify-content: center;
        align-items: center;

        .collunt {
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
          .count {
            height: 33px;
            font-size: 24px;
            font-weight: 600;
            color: #072074;
            line-height: 33px;
          }
          .count2 {
            margin-top: 20px;
          }
          .name[data-v-46f7d62d] {
            height: 17px;
            margin-top: 6px;
            font-size: 12px;
            font-weight: 400;
            color: #000412;
            line-height: 17px;
          }
        }
      }
    }
  }
  // 右侧
  .abnormal {
    flex: 4;
    padding: 20px;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: #fff;
    border-radius: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .more {
        color: #5f84ff;
        cursor: pointer;
      }
    }
    .abnormal-img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
