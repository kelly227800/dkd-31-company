<template>
  <div class="pagination">
    <div v-show="searchInfo.totalCount!=0&&searchInfo.totalCount!=1">
      共{{ searchInfo.totalCount }}条记录&nbsp;&nbsp;第{{
        searchInfo.pageIndex
      }}/{{ searchInfo.totalPage }}页
    </div>

    <el-pagination
      hide-on-single-page
      ref="pagination"
      background
      :current-page="Number(searchInfo.pageIndex)"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, next"
      :page-size="10"
      :total="Number(searchInfo.totalCount)"
      style="display: inline-block"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
export default {
  components: {
    viewsButton,
  },
  props: {
    searchInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 点击改变页码
    handleCurrentChange(val) {
      this.$emit("changePage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  padding: 32px 16px;
  color: #dbdfe5;
  font-size: 16px;

  ::v-deep.btn-prev {
    width: 70px;
    height: 32px;
    background-color: #d5ddf8;
    margin: 0 16px;
    border-radius: 2px;
    font-size: 13px;
    &:disabled {
      color: #d8dde3;
      background: #edf0f9;
    }
  }
  ::v-deep.btn-next {
    width: 70px;
    height: 32px;
    background-color: #d5ddf8;
    margin: 0 16px;
    border-radius: 2px;
    font-size: 13px;
    &:disabled {
      color: #d8dde3;
      background: #edf0f9;
    }
  }
}
</style>
