<template>
  <div>
    <el-dialog
      title="选择商品"
      :visible="commoditySearchdialogVisible"
      width="60%"
      @close="onclose"
      center
    >
      <viewsSearch
        ref="search"
        text1="商品名称"
        @search="searchfn"
      ></viewsSearch>
      <div>
        <div class="div">
          <div
            class="main"
            v-for="item in commoditySearchlist"
            :key="item.skuId"
            @click="isshow(item.skuId)"
          >
            <div class="top">
              <img :src="item.skuImage" alt="" />
              <p>{{ item.skuName }}</p>
            </div>
            <img
              v-if="item.skuId === idshow"
              class="img-top"
              src="../../../../icons/youshangjiao.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onyes">采纳意见</el-button>
      </div></el-dialog
    >
  </div>
</template>

<script>
import viewsSearch from "./viewsSearch.vue";
import { getcommoditySearchapi } from "@/api/device";
export default {
  data() {
    return {
      commoditySearchlist: [],
      idshow: "",
    };
  },
  props: {
    commoditySearchdialogVisible: {},
  },
  components: {
    viewsSearch,
  },

  created() {
    this.get();
  },

  methods: {
    onclose() {
      this.$emit("update:commoditySearchdialogVisible", false);
    },
    onyes() {
      this.onclose();
      const index = this.commoditySearchlist.findIndex(
        (e) => e.skuId === this.idshow
      );
      this.$emit("img", this.commoditySearchlist[index]);
      this.idshow = "";
    },
    async searchfn(val) {
      const { currentPageRecords } = await getcommoditySearchapi({
        pageSize: 999,
        skuName: val.number,
      });
      this.commoditySearchlist = currentPageRecords;
      this.idshow = "";
    },
    async get() {
      const { currentPageRecords } = await getcommoditySearchapi({
        pageSize: 999,
      });
      this.commoditySearchlist = currentPageRecords;
    },
    isshow(id) {
      this.idshow = id;
    },
  },
};
</script>

<style scoped lang="scss">
.img-top {
  position: absolute;
  top: 0;
  left: 0;
}
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
