<template>
  <el-dialog
    title="合作商详情"
    :visible="visible"
    @close="onClose"
    width="630px"
  >
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="合作商名称：">
            {{ taskMore.name }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人：">
            {{ taskMore.contact }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：">
            {{ taskMore.mobile }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分成比例：">
            {{ taskMore.ratio }}%
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      taskMore: {},
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    async getDetailsList(id) {
      this.taskMore = id;
    },
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
