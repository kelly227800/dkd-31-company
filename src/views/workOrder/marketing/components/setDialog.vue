<template>
  <el-dialog title="工单配置" :visible="visible" @close="onClose" width="630px">
    <el-form
      ref="form"
      :model="formDate"
      label-width="100px"
      style="margin: 0 30px"
    >
      <el-form-item label="补货警戒线">
        <el-input v-model="formDate.alertValue" type="number"></el-input>
      </el-form-item>
    </el-form>
    <span class="button">
      <viewsButton @click="onClose" type="warning">取消</viewsButton>
      <viewsButton @click="onSave" type="success">确定</viewsButton>
    </span>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import { autoSupplyConfig } from "@/api/workOrder";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formDate: {
        alertValue: 10,
      },
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
    },
    // 确定保存
    async onSave() {
      await this.$refs.form.validate();
      const res = await autoSupplyConfig({
        alertValue: this.formDate.alertValue,
      });
      this.onClose();
      this.$emit("addSave");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  .el-button {
    margin-right: 30px;
  }
}
</style>
