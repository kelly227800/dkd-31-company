<template>
  <el-dialog
    title="新增合作商"
    :visible="visible"
    @close="onClose"
    width="630px"
  >
    <el-form
      :model="params"
      :rules="rules"
      ref="params"
      label-width="100px"
      style="margin: 0 30px"
    >
      <el-form-item label="合作商名称" prop="name">
        <el-input
          v-model="params.name"
          maxlength="10"
          show-word-limit
          type="text"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input
          v-model="params.contact"
          maxlength="10"
          show-word-limit
          type="text"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input
          v-model="params.mobile"
          maxlength="11"
          show-word-limit
          type="text"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="分成比例(%)" prop="ratio">
        <el-input-number
          v-model="params.ratio"
          controls-position="right"
          style="width: 100%"
          placeholder="请输入"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <span class="button">
        <viewsButton @click="onClose" type="warning">取消</viewsButton>
        <viewsButton @click="onSave" type="success">确定</viewsButton>
      </span>
    </el-form>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import { getChangPartnerList } from "@/api/point";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      params: {
        name: "", //合作商名称
        account: "", //账号
        ratio: "", //分成比例
        contact: "", //	联系人
        mobile: "", //手机号
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        account: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        ratio: [{ required: true, message: "请输入", trigger: "blur" }],
        contact: [{ required: true, message: "请输入", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      clickId: "",
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    async getChangeDetailsList(id) {
      this.clickId = id.id;
      this.params.name = id.name;
      this.params.contact = id.contact;
      this.params.ratio = id.ratio;
      this.params.mobile = id.mobile;
      this.params.account = id.account;
    },
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.params.resetFields();
      this.params = {
        name: "", //合作商名称
        account: "", //账号
        password: "", //密码
        ratio: "", //分成比例
        contact: "", //	联系人
        mobile: "", //手机号
      };
    },
    // 确定保存
    async onSave() {
      await this.$refs.params.validate();
      try {
        await getChangPartnerList(this.clickId, this.params);
        this.onClose();
        this.$emit("addSave", 1);
      } catch (err) {
        this.$message.error("修改失败");
      }
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
