<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item :label="text1" class="goods-type-search">
        <el-input
          v-model="formInline.className"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item class="goods-type-search-btn">
        <viewsButton type="default" @click.native="clickSearch">
          <i class="el-icon-search"></i>
          查询
        </viewsButton>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import viewsButton from "@/components/viewsButton";
export default {
  components: {
    viewsButton,
  },
  props: {
    text1: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formInline: {
        className: "",
      },
    };
  },

  created() {},

  methods: {
    // 点击触发查询商品类型
    clickSearch() {
      // console.log("查询");
      this.$emit("search", this.formInline.className);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #fff;
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  font-weight: 400;
  .el-form-item {
    margin-bottom: 0;
    .search_btn {
      background-color: #5f84ff;
      color: #fff;
    }
  }
}
.goods-type-search {
  margin-top: 4px;
}
.el-button {
  height: 40px;
}
</style>
