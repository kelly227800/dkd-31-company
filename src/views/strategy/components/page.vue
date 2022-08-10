<template>
  <div class="pagination" v-if="getSearchInfo">
    <div>
      共{{ getSearchInfo.totalCount }}条记录&nbsp;&nbsp;第{{
        getSearchInfo.pageIndex
      }}/{{ getSearchInfo.totalPage }}页
    </div>
    <div class="page_right">
      <viewsButton
        @click="onPageUp"
        size="small"
        type="primary"
        :disabled="disabledUp"
        >上一页</viewsButton
      >
      <viewsButton
        @click="onNextPage"
        size="small"
        type="primary"
        :disabled="disabledDown"
        >下一页</viewsButton
      >
    </div>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
export default {
  name: "page",
  components: {
    viewsButton,
  },
  props: {
    getSearchInfo: {
      type: Object,
      default: {},
    },
    disabledUp: {
      type: Boolean,
      default: true,
    },
    disabledDown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {
    onPageUp() {
      const pageIndex = --this.getSearchInfo.pageIndex;
      this.$emit("pageIndex", pageIndex);
    },
    onNextPage() {
      const pageIndex = ++this.getSearchInfo.pageIndex;
      this.$emit("pageIndex", pageIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  padding: 32px 16px;
  .page_right {
    display: flex;
  }
}
</style>
