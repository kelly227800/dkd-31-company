<template>
  <div class="pagination">
    <div>
      共{{ searchInfo.totalCount }}条记录&nbsp;&nbsp;第{{ pageIndex }}/{{
        searchInfo.totalPage
      }}页
    </div>
    <div class="page_right">
      <viewsButton
        @click.native="onPrePage"
        size="small"
        type="primary"
        :disabled="disabledPre"
        >上一页</viewsButton
      >
      <viewsButton
        @click.native="onNextPage"
        size="small"
        type="primary"
        :disabled="disabledNext"
        >下一页</viewsButton
      >
    </div>
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
      default: {},
    },
    disabledPre: {
      type: Boolean,
      default: true,
    },
    disabledNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageIndex: 1,
    };
  },

  created() {},
  // 0条数据的处理
  beforeUpdate() {
    if (this.searchInfo.totalPage == 0) {
      this.pageIndex = 0;
      this.$emit("disabledPreFn");
      this.$emit("disabledNextFn");
    }
  },

  methods: {
    // 点击上一页
    onPrePage() {
      this.pageIndex--;
      //   this.$emit("pageIndex", pageIndex);
      this.changeDisabled();
    },
    // 点击下一页
    onNextPage() {
      this.pageIndex++;
      this.changeDisabled();
      //   this.$emit("pageIndex", pageIndex);
    },
    // 改变分页按钮可点击状态
    changeDisabled() {
      //   console.log(this.searchInfo.totalPage);
      if (this.pageIndex == 1) {
        this.$emit("disabledPreFn");
      } else {
        this.$emit("cancelDisabledPre");
      }
      if (this.pageIndex == this.searchInfo.totalPage) {
        this.$emit("disabledNextFn");
      } else {
        this.$emit("cancelDisabledNext");
      }
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

  .page_right {
    display: flex;
  }
  .el-button {
    margin: 0 16px;
    border-radius: 2px;
    font-size: 13px;
  }
}
</style>
