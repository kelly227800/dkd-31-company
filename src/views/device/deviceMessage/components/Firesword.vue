<template>
  <div style="position: relative">
    <el-dialog
      title="货道设置"
      :visible="FiresworddialogVisible"
      width="60%"
      @close="onclose"
      center
    >
      <el-row class="elrow">
        <el-col :span="8">
          <el-row>
            <el-col :span="12">货道行数 : {{ Cargolanestypedei.vmRow }}</el-col>
            <el-col :span="12">货道列数 ：{{ Cargolanestypedei.vmCol }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="21"
              >货道容量（个）：{{
                Cargolanestypedei.channelMaxCapacity
              }}</el-col
            >
            <el-col :span="3"
              ><button class="buttom" @click="Intelligentstockingfn">
                智能排货
              </button></el-col
            >
          </el-row>
        </el-col>
      </el-row>
      <div style="width: 1090px; overflow: hidden">
        <div class="div">
          <div
            class="main"
            v-for="item in Cargolanesdeitlist"
            :key="item.channelId"
          >
            <div class="top">
              <div class="row-col">{{ item.channelCode }}</div>
              <img :src="item.sku ? item.sku.skuImage : img" alt="" />
              <p>{{ item.sku ? item.sku.brandName : "暂无商品" }}</p>
            </div>
            <div class="bottom">
              <span class="left" @click="add(item.channelId)">添加</span
              ><span class="rigit" @click="del(item.channelId)">删除</span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onyes">确 认</el-button>
      </span></el-dialog
    >
    <Intelligentstocking
      :StockingdialogVisible.sync="StockingdialogVisible"
      :Intelligentstockinglist="Intelligentstockinglist"
      @Intelligentstocking="Intelligentstocking"
    ></Intelligentstocking>
    <commoditySearch
      :commoditySearchdialogVisible.sync="commoditySearchdialogVisible"
      @img="imgfn"
    ></commoditySearch>
    <i class="position-left el-icon-arrow-left"> </i>
    <i class="position-right el-icon-arrow-right"> </i>
  </div>
</template>

<script>
import Intelligentstocking from "./Intelligentstocking.vue";
import { getIntelligentstockingapi } from "@/api/device";
import commoditySearch from "./commoditySearch.vue";
export default {
  data() {
    return {
      img: "http://likede2-java.itheima.net/image/logo.595745bd.png",
      StockingdialogVisible: false,
      Intelligentstockinglist: [],
      commoditySearchdialogVisible: false,
      imgan: "",
      id: "",
    };
  },
  props: {
    FiresworddialogVisible: {},
    Cargolanesdeitlist: {
      default: () => [],
    },
    Cargolanestypedei: {},
  },

  created() {},
  components: {
    Intelligentstocking,
    commoditySearch,
  },

  methods: {
    onclose() {
      this.$emit("update:FiresworddialogVisible", false);
    },
    async onyes() {
      this.$emit("Cargolaneconfiguration");
      this.onclose();
    },
    async Intelligentstockingfn() {
      this.Intelligentstockinglist = await getIntelligentstockingapi(1);
      this.StockingdialogVisible = true;
    },
    async add(id) {
      this.commoditySearchdialogVisible = true;
      this.id = id;
    },
    del(id) {
      this.$emit("del", id);
    },
    imgfn(img) {
      this.$emit("imgfn", this.id, img);
    },
    Intelligentstocking() {
      this.$emit("Intelligentstocking", this.Intelligentstockinglist);
    },
  },
};
</script>

<style scoped lang="scss">
.position-left {
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  font-size: 14px;
  width: 50px;
  height: 50px;
  color: #d8dde3;
}
.position-right {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  font-size: 14px;
  width: 50px;
  height: 50px;
  color: #000;
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
  width: 2180px;
  text-align: center;

  .main {
    float: left;
    height: 200px;
    padding: 2px;
    margin: 9px;
    width: 9.1%;
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
