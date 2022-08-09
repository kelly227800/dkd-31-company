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
      <el-table-column prop="image" label="设备图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            width="22px"
            height="22px"
            style="border-radius: 50%"
          />
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in tableFoot"
        :key="item.label"
      >
      </el-table-column>
      <el-table-column label="操作">
        <slot name="operate"></slot>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
    tableFoot: {
      type: Array,
      default: [],
    },
    getSearchInfo: {
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
    indexMethod(index) {
      return (this.getSearchInfo.pageIndex - 1) * 10 + index + 1;
    },
  },
};
</script>

<style scoped></style>
