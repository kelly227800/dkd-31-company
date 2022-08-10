<template>
  <!-- Table -->

  <el-dialog
    title="策略详情"
    :visible="showDetails"
    width="590px"
    v-if="showDetails"
    @close="onclose"
  >
    <el-row>
      <el-col :span="12"
        ><div class="grid-content bg-purple">策略名称：</div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">策略名称</div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">策略方案：</div></el-col
      >
      <el-col :span="18">
        <el-table :data="currentNode">
          <el-table-column
            type="index"
            label="序号"
            width="100"
            :index="1"
          ></el-table-column>
          <el-table-column
            property="nodeName"
            label="点位名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="innerCode"
            label="设备编号"
          ></el-table-column> </el-table
      ></el-col>
    </el-row>
    <GPage
      :getSearchInfo="currentNodeData"
      :disabledUp="disabledUp"
      :disabledDown="disabledDown"
    ></GPage>
  </el-dialog>
</template>

<script>
import GPage from "./page.vue";

export default {
  data() {
    name: "details";
    return {
      pageIndex: 1,
      currentPageIndex: 1,
      totalPage: 1,
    };
  },
  components: {
    GPage,
  },
  props: {
    showDetails: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Array,
      required: true,
    },
    currentNodeData: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    // this.getStrategyDetailsApi();
    // console.log(this.currentNodeData.totalPage);
  },

  methods: {
    indexMethod(index) {
      console.log(222);
      return (this.currentNodeData.pageIndex - 1) * 10 + index + 1;
    },
    getData() {
      setTimeout(() => {
        console.log(this.currentNodeData);
        this.currentPageIndex = this.currentNodeData.pageIndex;

        this.totalPage = this.currentNodeData.totalPage;
        // console.log(disabledUp);
      }, 0);
    },
    onclose() {
      this.$emit("update:showDetails", false);
      },
  },
  computed: {
    disabledUp() {
      //   this.currentPageIndex = currentNodeData.pageIndex;
      return this.currentPageIndex <= 1 ? true : false;
    },
    disabledDown() {
      //   this.currentPageIndex = currentNodeData.pageIndex;
      return this.currentPageIndex >= this.totalPage ? true : false;
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
.el-row {
  margin-bottom: 35px;
}
</style>
