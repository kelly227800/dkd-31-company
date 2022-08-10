<template>
  <div class="bottom_form">
    <el-table
      :data="getSearchList"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      :header-cell-style="{
        background: 'rgb(243, 246, 251)',
        color: 'rgb(102, 102, 102)',
        fontWeight: '500',
      }"
    >
      <el-table-column type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHead"
        :key="index"
      >
      </el-table-column>
      <el-table-column label="操作">
        <!-- <slot></slot> -->
        <template slot-scope="scope">
          <viewsButton @click="onMore(scope.row)" type="info"
            >查看详情</viewsButton
          >
          <moreDialog
            v-if="taskMore.taskStatusTypeEntity"
            :visible.sync="dialogMoreVisible"
            :taskMore="taskMore"
          ></moreDialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moreDialog from "./moreDialog.vue";
import viewsButton from "@/components/viewsButton";
import { taskInfo } from "@/api/workOrder";
export default {
  props: {
    getSearchList: {
      type: Array,
      default: [],
    },
    tableHead: {
      type: Array,
      default: [],
    },
    getSearchInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      dialogMoreVisible: false,
      taskMore: {},
    };
  },
  components: {
    moreDialog,
    viewsButton,
  },

  created() {},

  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    indexMethod(index) {
      return (this.getSearchInfo.pageIndex - 1) * 10 + index + 1;
    },
    async onMore(row) {
      this.dialogMoreVisible = true;
      this.taskMore = await taskInfo(row.taskId);
      console.log(this.taskMore);
    },
  },
};
</script>

<style scoped></style>
