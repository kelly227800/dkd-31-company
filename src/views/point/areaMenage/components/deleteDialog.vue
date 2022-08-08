<template>
  <el-dialog
    title="提示"
    :visible="visible"
    @close="onClose"
    width="630px"
    :before-close="handleClose"
  >
    <span>请确认是否删除？</span>
    <span class="button">
      <viewsButton @click="onClose" type="warning">取消</viewsButton>
      <viewsButton @click="onSave" type="success">确定</viewsButton>
    </span>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
// import { autoSupplyConfig } from "@/api/workOrder";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {
    viewsButton,
  },
  methods: {
    // // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
    },
    onSave() {
      console.log("确定");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
