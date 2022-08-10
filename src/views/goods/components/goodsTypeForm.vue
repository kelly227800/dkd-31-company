<template>
  <div class="bottom_form">
    <el-table
      size="small"
      empty-text="暂无数据"
      :data="searchList"
      style="width: 100%"
      highlight-current-row
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
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" class="goods_edit"
            >修改</el-button
          >
          <el-button @click="onDel(scope.row)" class="goods_delete"
            >删除</el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
      isEdit: false,
      classId: 0,
    };
  },
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

  methods: {
    // 记录序号
    indexMethod(index) {
      return (this.searchInfo.pageIndex - 1) * 10 + index + 1;
    },
    // 修改商品类型
    onEdit(row) {
      this.$emit("editGoodsType", row);
    },
    // 删除商品类型
    onDel(row) {
      this.$emit("delGoodsType", row);
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
::v-deep.el-table--small td,
.el-table--small th {
  padding: 0 !important;
  height: 44px !important;
}
.goods_edit {
  width: 30px;
  height: 40px;
  padding: 12px 0;
  border: none;
  background-color: unset;
  color: #5f84ff;
  padding-right: 10px;
}
.goods_delete {
  width: 30px;
  height: 40px;
  padding: 12px 0;
  border: none;
  background-color: unset;
  color: #ff5a5a;
}
</style>
