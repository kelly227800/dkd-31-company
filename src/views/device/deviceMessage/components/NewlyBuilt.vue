<template>
  <el-dialog
    title="新增设备"
    :visible="centerDialogVisible"
    width="40%"
    @close="onclose"
    center
  >
    <el-form ref="form" :model="formData" :rules="forDataRules">
      <el-form-item label="设备编号：" label-width="100px">
        系统自动生成
      </el-form-item>
      <el-form-item prop="vmType" label="选择型号：" label-width="100px">
        <el-select
          v-model="formData.vmType"
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in currentPageRecordslist"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="nodeId" label="选择点位：" label-width="100px">
        <el-select
          v-model="formData.nodeId"
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in PointscurrentPageRecordslist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onyes">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addvendingmachineapi } from "@/api/device";
export default {
  data() {
    return {
      formData: {
        vmType: "",
        nodeId: "",
        createUserId: "",
      },
      forDataRules: {
        vmType: [{ required: true, message: "请输入", trigger: "change" }],
        nodeId: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
    },
    currentPageRecordslist: {
      type: Array,
    },
    PointscurrentPageRecordslist: {
      type: Array,
    },
  },

  created() {},

  methods: {
    onclose() {
      this.$emit("update:centerDialogVisible", false);
      this.$refs.form.resetFields();
    },
    async onyes() {
      await this.$refs.form.validate();
      this.formData.createUserId = this.$store.state.user.userId;
      await addvendingmachineapi(this.formData);
      this.$message.success("新建成功");
      this.$emit("update");
      this.onclose();
    },
  },
};
</script>

<style scoped></style>
