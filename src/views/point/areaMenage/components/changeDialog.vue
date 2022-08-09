<template>
  <el-dialog title="修改区域" :visible="visible" @close="onClose" width="630px">
    <el-form
      :model="params"
      :rules="rules"
      ref="params"
      label-width="100px"
      style="margin: 0 30px"
    >
      <el-form-item label="区域名称" prop="regionName">
        <el-input
          v-model="params.regionName"
          maxlength="15"
          show-word-limit
          type="text"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注说明：" prop="remark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入备注（不超过40字）"
          v-model="params.remark"
          maxlength="40"
          show-word-limit
        >
        </el-input>
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
import { getChangeDetailsList, getChangeList } from "@/api/point";
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
        regionName: "", //区域名称
        remark: "", //备注
      },
      rules: {
        regionName: [{ required: true, message: "请输入", trigger: "blur" }],
        remark: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      clickId: "",
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    async getChangeDetailsList(id) {
      this.clickId = id;
      const res = await getChangeDetailsList(id);
      this.params.regionName = res.name;
      this.params.remark = res.remark;
    },
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.params.resetFields();
      this.params = {
        regionName: "", //区域名称
        remark: "", //备注
      };
    },
    // 确定保存
    async onSave() {
      await this.$refs.params.validate();
      try {
        await getChangeList(this.clickId, this.params);
        this.onClose();
        this.$emit("addSave", 1);
      } catch (err) {
        this.$message.error("添加失败");
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
