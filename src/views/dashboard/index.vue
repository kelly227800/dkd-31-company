<template>
  <div>
    <!-- 上方数据图 -->
    <el-row class="data-sheet-top">
      <!-- 统计表 -->
      <el-col :span="18">
        <!-- 工单统计 -->
        <el-row>
          <el-col class="el-12" :span="12">
            <div class="grid-content bg-purple">
              工单统计 2022.08.01 ~ 2022.08.09
            </div>
            <el-row>
              <el-col :span="6">
                <div class="col-first-child">33</div>
                <div>工单总数(个)</div>
              </el-col>
              <el-col :span="6">
                <div class="col-first-child">0</div>
                <div>完成工单(个)</div>
              </el-col>
              <el-col :span="6">
                <div class="col-first-child">32</div>
                <div>进行工单（个）</div>
              </el-col>
              <el-col :span="6">
                <div class="col-first-child">16</div>
                <div class="bg-purple-light">取消工单（个）</div>
              </el-col>
            </el-row>
          </el-col>

          <!-- 销售员统计 -->
          <el-col :span="11"
            ><div class="grid-content bg-purple">
              销售统计 2022.08.01 ~ 2022.08.09
            </div>
            <el-row>
              <el-col :span="12">
                <div class="col-first-child">33</div>
                <div>订单量（个）</div>
              </el-col>
              <el-col :span="12">
                <div class="col-first-child">0</div>
                <div>销售额（万元）</div>
              </el-col>
            </el-row></el-col
          >
        </el-row>
        <!-- 销售数据 -->
        <el-row>
          <el-row class="sales-data">
            <el-col :span="24">销售数据 2022.08.08 ~ 2022.08.10</el-col>
            <el-col :span="24">2</el-col>
          </el-row>
        </el-row>
      </el-col>

      <!-- 商品热榜 -->
      <el-col class="Hot-list" :span="6">
        <div class="title">商品热榜 2022.08.01 ~ 2022.08.10</div>
        <div class="table">
          <div>1</div>
          <div>统一阿萨姆奶茶</div>
          <div>454单</div>
        </div>
      </el-col>
    </el-row>
    <!-- 下方数据图 -->
    <el-row class="data-sheet-bottom">
      <!-- 左侧合作商 -->
      <el-col class="partner">1</el-col>
      <!-- 右侧设备监控 -->
      <el-col class="abnormal">2</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {},
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
    background-color: pink;
    min-height: 538px;
    border-radius: 20px;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    .table {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
  }
  // 销售数据
  .sales-data {
    margin-right: 30px;
    padding: 20px;
    height: calc(40vh - 68px);
    min-height: 352px;
    margin-top: 20px;
    background: pink;
    border-radius: 20px;
  }
}

// 底部
.data-sheet-bottom {
  margin-top: 20px;
  display: flex;
  // 左侧
  .partner {
    flex: 6;
    margin-right: 30px;
    padding: 20px;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: aqua;
    border-radius: 20px;
  }
  // 右侧
  .abnormal {
    flex: 4;
    padding: 20px;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: palevioletred;
    border-radius: 20px;
  }
}
</style>
