<template>
  <div>
    <el-dialog
      title="智能排货"
      :visible="StockingdialogVisible"
      width="60%"
      @close="onclose"
      center
    >
      <p>该区域属于学校商圈适合销售一下商品：</p>
      <div>
        <div class="div">
          <div
            class="main"
            v-for="item in Intelligentstockinglist"
            :key="item.channelId"
          >
            <div class="top">
              <img :src="item.image" alt="" />
              <p>{{ item.skuName }}</p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onyes">采纳意见</el-button>
      </span></el-dialog
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "http://likede2-java.itheima.net/image/logo.595745bd.png",
    };
  },
  props: {
    StockingdialogVisible: {},
    Intelligentstockinglist: {
      default: () => [],
    },
  },

  created() {},

  methods: {
    onclose() {
      this.$emit("update:StockingdialogVisible", false);
    },
    onyes() {
      this.onclose();
      this.$emit("Intelligentstocking");
    },
  },
};
</script>

<style scoped lang="scss">
.el-dialog {
  overflow: hidden;
}
.buttom {
  min-width: 80px;
  height: 36px;
  padding: 0;
  background-color: #5f84ff;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
}
.elrow {
  background-color: #f3f6fb;
  padding: 20px;
  padding-left: 50px;
  margin-bottom: 10px;
}
.el-col {
  height: 32px;
  line-height: 32px;
}
.div {
  width: 100%;
  text-align: center;
  //   margin: auto;

  .main {
    float: left;
    height: 200px;
    padding: 2px;
    margin: 9px;
    // margin-bottom: 10px;
    // margin-right: 15px;
    // margin-top: 10px;
    width: 18%;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
    background-color: #f6f7fb;
    border-radius: 4px;
    position: relative;

    .top {
      margin: auto;
      width: 50%;
      img {
        width: 100%;
      }
      .row-col {
        position: absolute;
        left: 0;
        top: 10px;
        background-color: #829bed;
        border-radius: 0 10px 10px 0;
        color: #fff;
        width: 43px;
        height: 23px;
        line-height: 23px;
        text-align: center;
      }
    }
    .bottom {
      background-color: #fff;
      height: 40px;
      padding: 0;
      line-height: 40px;
      text-align: center;
      span {
        cursor: pointer;
        padding: 10px;
      }
      .left {
        color: #5f84ff;
      }
      .rigit {
        color: #ff5a5a;
      }
    }
  }
}
</style>
