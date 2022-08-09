<template>
  <el-dialog
    title="修改设备"
    :visible="revisedialogVisible"
    width="50%"
    @close="onclose"
    center
  >
    <el-form ref="form">
      <el-form-item label="机器编号:" label-width="100px"
        >{{ revisecurrentRow.innerCode }}
      </el-form-item>
      <el-form-item label="供货时间:" label-width="100px"
        >{{ revisecurrentRow.lastSupplyTime }}
      </el-form-item>
      <el-form-item label="设备类型:" label-width="100px"
        >{{ revisecurrentRow.type.name }}
      </el-form-item>
      <el-form-item label="设备容量:" label-width="100px"
        >{{ revisecurrentRow.type.channelMaxCapacity }}
      </el-form-item>
      <el-form-item label="设备点位:" label-width="100px">
        <el-select
          v-model="formData.vmType"
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in revisecurrentPageRecordslist"
            :key="item.typeId"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作商:" label-width="100px"
        >{{ revisecurrentRow.ownerName }}
      </el-form-item>
      <el-form-item label="所属区域:" label-width="100px">
        {{ revisecurrentRow.region.name }}</el-form-item
      >
      <el-form-item label="设备地址:" label-width="100px">
        {{ revisecurrentRow.node.name }}</el-form-item
      >
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onyes">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { revisevendingmachineapi } from "@/api/device";
export default {
  data() {
    return {
      formData: {
        vmType: "",
      },
    };
  },
  props: {
    revisedialogVisible: {},
    revisecurrentPageRecordslist: {},
    revisecurrentRow: {},
  },
  computed: {},

  created() {
    this.formData.vmType = this.revisecurrentRow.node.name;
  },

  methods: {
    handleChange(val) {
      // console.log(val);
    },
    onclose() {
      this.$emit("update:revisedialogVisible", false);
    //   this.$refs.form.resetFields();
    },
    async onyes() {
      await revisevendingmachineapi(
        this.revisecurrentRow.id,
        this.revisecurrentRow.node.id
      );
      this.onclose();
      this.$message.success("修改成功");
      this.$emit("update");
    },
  },
};
</script>

<style scoped lang="scss"></style>
