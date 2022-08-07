<template>
  <el-dialog
    title="设备详情"
    :visible="dialogVisible"
    width="40%"
    @close="onclose"
  >
    <div style="display: flex">
      <p>销售量：1189 个</p>
      <p>销售量：1189 个</p>
      <p>销售量：1189 个</p>
      <p>销售量：1189 个</p>
    </div>
    <p>商品销量（月）</p>
    <div style="display: flex">
      <p>销售量：1189 个</p>
      <p>销售量：1189 个</p>
      <p>销售量：1189 个</p>
      <p>销售量：1189 个</p>
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

<style scoped></style>
