<template>
  <!-- Form -->

  <el-dialog
    title="新增策略"
    :visible="dialogFormVisible"
    center
    @close="closeDialog"
  >
    <el-form :model="formData" :rules="formRules" ref="form">
      <el-form-item label="策略名称" label-width="80px" prop="name">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.policyName"
          maxlength="15"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="策略方案" label-width="80px" prop="num">
        <el-input-number
          placeholder="请输入"
          v-model="formData.discount"
          controls-position="right"
          @change="handleChange"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="closeDialog">取 消</el-button>
      <el-button type="primary" @click.native="addIdea">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addStrategyApi } from "@/api/strategy";
export default {
  data() {
    return {
      formData: { policyName: "", discount: "" },
      formRules: {
        policyName: { required: true, trigger: "blur", message: "请输入" },
        discount: [
          {
            required: true,
            type: "number",
            trigger: "blur",
            message: "请输入",
          },
        ],
      },
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  created() {},

  methods: {
    handleChange() {},
    closeDialog() {
      //   console.log(11);
      this.$emit("closeDialog");
    },
    async addIdea() {
      await this.$refs.form.validate();
      console.log(this.formData);
      await addStrategyApi(this.formData);
      this.closeDialog();
      this.$emit("renderPage");
      this.formData = { policyName: "", discount: "" };
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep(.el-dialog__footer) {
  //   display: flex;
  //   justify-content: center;
  padding: 10px 20px 20px;
  text-align: center !important;
  //   -webkit-box-sizing: border-box;
  //   box-sizing: border-box;
}
</style>
