<template>
  <div class="bottom_form">
    <el-table
      ref="goodsTable"
      size="small"
      empty-text="暂无数据"
      :data="searchList"
      style="width: 100%"
      highlight-current-row
      :header-cell-style="{
        background: 'rgb(243, 246, 251)',
        color: 'rgb(102, 102, 102)',
        fontWeight: '500',
      }"
    >
      <el-table-column type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column label="商品名称" prop="skuName"> </el-table-column>
      <el-table-column label="商品图片" prop="skuImage">
        <template slot-scope="scope">
          <img class="sku-image" :src="scope.row.skuImage" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHead"
        :key="index"
      >
      </el-table-column>
      <el-table-column label="创建日期" prop="createTime" width="160px" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" class="goods_edit"
            >修改</el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import eventBus from '@/EventBus'
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
    // 记录序号
    indexMethod(index) {
      return (this.searchInfo.pageIndex - 1) * 10 + index + 1;
    },
    // 修改商品
    onEdit(row) {
      // console.log(row);
      this.$emit("editGoods", row);
      eventBus.$emit("sendRow",row)
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
.sku-image {
  display: block;
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
  background: rgb(243, 246, 251);
  border: 1px solid rgb(243, 246, 251);
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
</style>
