<template>
  <!-- Form -->

  <el-dialog
    :title="addoredit"
    :visible="dialogFormVisible"
    center
    @close="closeDialog"
    @open="openDialogFn"
  >
    <el-form :model="formData" :rules="formRules" ref="form">
      <el-form-item label="策略名称" label-width="80px" prop="policyName">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.policyName"
          maxlength="15"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="策略方案" label-width="80px" prop="discount">
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
import { addStrategyApi, editStrategyApi } from "@/api/strategy";
export default {
  data() {
    const checkName = (rule, value, callback) => {
      //   console.log(111);
      if (this.currentItem) {
        const isRepeat =
          this.currentItem.policyName === value &&
          this.formData.discount === this.currentItem.discount;
        isRepeat ? callback(new Error("请修改数据")) : callback();
      } else {
        callback();
      }
    };
    const checkdiscount = (rule, value, callback) => {
      //   console.log(111);
      if (this.currentItem) {
        const isRepeat =
          this.currentItem.discount === value &&
          this.formData.policyName === this.currentItem.policyName;
        isRepeat ? callback(new Error("请修改数据")) : callback();
      } else {
        callback();
      }
    };
    return {
      formData: { policyName: "", discount: "" },
      formRules: {
        policyName: [
          { required: true, trigger: "blur", message: "请输入" },
          {
            validator: checkName,
            trigger: "blur",
          },
        ],
        discount: [
          {
            required: true,
            type: "number",
            trigger: "blur",
            message: "请输入",
          },
          {
            validator: checkdiscount,
            trigger: "blur",
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
    currentItem: {
      //   type: Object,
      default: "",
    },
  },
  created() {
    this.$emit("clearData");
  },

  methods: {
    handleChange() {},
    closeDialog() {
      //   console.log(11);
      this.$emit("closeDialog");
    },
    async addIdea() {
      if (this.currentItem) {
        await this.$refs.form.validate();
        console.log("修改数据");
        await editStrategyApi(this.currentItem.policyId, this.formData);
        this.closeDialog();
      } else {
        await this.$refs.form.validate();
        console.log(this.formData);
        await addStrategyApi(this.formData);
        this.closeDialog();
        this.$emit("renderPage");
        this.formData = { policyName: "", discount: "" };
      }
    },
    async openDialogFn() {
      setTimeout(() => {
        console.log(this.currentItem);
        if (this.currentItem) {
          this.formData = {
            policyName: this.currentItem.policyName,
            discount: this.currentItem.discount,
          };
        } else {
          this.formData = {
            policyName: "",
            discount: "",
          };
        }
      }, 0);
    },
  },
  computed: {
    addoredit() {
      return this.currentItem ? "编辑策略" : "新增策略";
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
.el-input-number {
  position: relative;
  display: inline-block;
  width: 343.6px;
  line-height: 38px;
}
</style>
