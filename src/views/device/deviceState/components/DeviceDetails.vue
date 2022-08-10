<template>
  <el-dialog
    title="设备详情"
    :visible="dialogVisible"
    width="40%"
    @close="onclose"
  >
    <el-row
      style="
        height: 54px;
        background: rgba(227, 233, 245, 0.39);
        line-height: 54px;
        text-align: center;
      "
    >
      <el-col :span="6"
        >销售量：<span class="span">{{ allSales }}个</span></el-col
      >
      <el-col :span="6"
        >销售额：<span class="span"
          >{{ sales == 0 ? "0.00" : sales / 100 }}元</span
        ></el-col
      >
      <el-col :span="6"
        >补货次数：<span class="span">{{ Replenishment }}次</span></el-col
      >
      <el-col :span="6"
        >维修次数：<span class="span">{{ Maintenance }}次</span></el-col
      >
    </el-row>
    <p>商品销量（月）</p>
    <el-row>
      <el-col
        style="
          height: 40px;
          border: 1px solid #d8dde3;
          line-height: 40px;
          padding: 0 10px;
        "
        :span="6"
        v-for="item in list"
        :key="item.skuName"
      >
        <el-row>
          <el-col
            :span="12"
            style="
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
            >{{ item.skuName }}</el-col
          >
          <el-col :span="12">：{{ item.count }} 个</el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    list: {
      type: Array,
    },
    Replenishment: {
      // type: Number,
    },
    Maintenance: {
      // type: Number,
    },
    allSales: {
      // type: Number,
    },
    sales: {
      // type: Number,
    },
  },
  computed: {},

  created() {
    console.log(this.list);
  },

  methods: {
    onclose() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style scoped lang="scss">
.merchandisesales {
  // display: block;
  display: flex;
  width: 25%;
  padding: 0 10px;
  line-height: 40px;
  border-right: 1px solid #d8dde3;
  border-bottom: 1px solid #d8dde3;
}
.span {
  color: #5f84ff;
}
</style>
