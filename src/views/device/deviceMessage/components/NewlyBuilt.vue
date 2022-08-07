<template>
  <el-dialog
    title="新增设备"
    :visible="centerDialogVisible"
    width="40%"
    @close="onclose"
    center
  >
    <el-form>
      <el-form-item label="设备编号：" label-width="100px">
        系统自动生成
      </el-form-item>
      <el-form-item label="选择型号：" label-width="100px">
        <el-select placeholder="请选择" style="width: 80%">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择点位：" label-width="100px">
        <el-select placeholder="请选择" style="width: 80%">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onclose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
    },
  },

  created() {},

  methods: {
    onclose() {
      this.$emit("update:centerDialogVisible", false);
    },
  },
};
</script>

<style scoped></style>
