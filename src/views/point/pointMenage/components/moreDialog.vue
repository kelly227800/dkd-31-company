<template>
  <el-dialog title="点位详情" :visible="visible" @close="onClose" width="630px">
    <el-table :data="taskMore" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="innerCode" label="机器编号"> </el-table-column>
      <el-table-column prop="vmStatus" label="设备状态"> </el-table-column>
      <el-table-column prop="lastSupplyTime" label="最后一次供货时间">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import moment from "moment";
import viewsButton from "@/components/viewsButton";
import { getNodeDetailsList } from "@/api/point";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      taskMore: [],
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    async getDetailsList(id) {
      const res = await getNodeDetailsList(id);
      this.taskMore = res;
      this.changeFormat(this.taskMore);
    },
    // 对获取的数据进行格式修改
    changeFormat(taskMore) {
      this.taskMore = taskMore.map((value, index, array) => {
        if (value.vmStatus === 0) {
          value.vmStatus = "未投放";
        } else if (value.vmStatus === 1) {
          value.vmStatus = "运营";
        } else {
          value.vmStatus = "撤机";
        }
        value.lastSupplyTime = moment(value.lastSupplyTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return value;
      });
    },
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
