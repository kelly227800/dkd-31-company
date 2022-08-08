<template>
  <div class="bottom_form">
    <el-table
      size="small"
      empty-text="暂无数据"
      :data="searchList"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      :header-cell-style="{
        background: 'rgb(243, 246, 251)',
        color: '#666',
        padding: '10px 0px 9px',
        textAlign: 'left',
        fontWeight: '500',
      }"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80px"
      >
      </el-table-column>
      <el-table-column
        min-width="900px"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHead"
        :key="index"
      >
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <slot></slot>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default: [],
    },
    tableHead: {
      type: Array,
      default: [],
    },
    searchInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 记录序号
    indexMethod(index) {
      return (this.searchInfo.pageIndex - 1) * 10 + index + 1;
    },
  },
};
</script>

<style scoped lang="scss">
.el-table {
  font-size: 14px;
  padding: 0 !important;
  tr {
    padding: 0 !important ;
  }
}
.el-table__row {
    height: 44px;
}
::v-deep.el-table--small td, .el-table--small th {
    padding: 0 !important;
    height: 44px !important;
}
</style>
