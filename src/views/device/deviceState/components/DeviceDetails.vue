<template>
  <el-dialog
    title="设备详情"
    :visible="dialogVisible"
    width="40%"
    @close="onclose"
  >
    <div style="display: flex">
      <p><span>销售量：</span>1189 个</p>
      <p><span>销售量：</span>1189 个</p>
      <p><span>销售量：</span>1189 个</p>
      <p><span>销售量：</span>1189 个</p>
    </div>
    <p>商品销量（月）</p>
    <div
      style="
        display: flex;
        border-left: 1px solid #d8dde3;
        border-top: 1px solid #d8dde3;
      "
    >
      <div class="merchandisesales">
        <div>销售量：</div>
        1189 个
      </div>
      <div class="merchandisesales">
        <div>销售量：</div>
        1189 个
      </div>
    </div>
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
  },

  created() {},

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
</style>
