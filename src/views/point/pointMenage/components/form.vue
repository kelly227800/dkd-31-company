<template>
  <div class="bottom_form">
    <el-table
      :data="getSearchList"
      style="width: 100%,font-size:14px"
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
        <template slot-scope="scope">
          <div style="display: flex">
            <viewsButton
              @click.native="$emit('onMore', scope.row.id)"
              type="info"
              >查看详情</viewsButton
            >
            <viewsButton
              @click.native="$emit('onChange', scope.row.id)"
              type="info"
              size="mini"
              >修改</viewsButton
            >
            <viewsButton
              @click.native="$emit('onDelete', scope.row.id)"
              type="info"
              size="mini"
              style="color: red"
              >删除</viewsButton
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import { getDetailsList } from "@/api/point";
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
      // taskMore: [],
      // taskChange: "",
      // params: {
      //   pageIndex: 1,
      //   pageSize: 10,
      //   regionId: "",
      // },
    };
  },
  components: {
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
      // this.params.regionId = row.id;
      // const res = await getDetailsList(this.params);
      // this.taskMore = res.currentPageRecords;
    },
    async onChange(row) {
      this.dialogChangeVisible = true;
      // this.taskChange = row.id;
      // this.$refs.changeDialog.taskChange(row.id);
    },
    async onDelete(row) {
      this.deleteDialogVisible = true;
      // this.taskMore = await taskInfo(row.taskId);
      // console.log(this.taskMore);
    },
  },
};
</script>

<style lang="scss" scoped></style>
