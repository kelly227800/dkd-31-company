<template>
  <el-dialog title="区域详情" :visible="visible" @close="onClose" width="630px" v-if="taskMore[0]">
    <el-form ref="params" label-width="100px" style="margin: 0 30px">
      <el-form-item label="区域名称：">{{
        taskMore[0].region.name
      }}</el-form-item>
      <el-form-item label="包含点位：">
        <el-table :data="taskMore" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="点位名称"> </el-table-column>
          <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import { getDetailsList } from "@/api/point";
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
        pageIndex: 1,
        pageSize: 10,
        regionId: "",
      },
      taskMore: [],
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    async getDetailsList(id) {
      this.params.regionId = id;
      const res = await getDetailsList(this.params);
      this.taskMore = res.currentPageRecords;
    },
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
      this.params.regionId = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
