<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item :label="text1">
        <el-input v-model="formInline.number" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item :label="text2" v-if="text2 !== ''">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in allTaskStatusList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <viewsButton type="default" @click="clickSearch">
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
    text2: {
      type: String,
      default: "",
    },
    allTaskStatusList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formInline: {
        number: "",
        status: "",
      },
    };
  },

  created() {},

  methods: {
    clickSearch() {
      this.$emit("search", this.formInline);
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
  .el-form-item {
    margin-bottom: 0;
    .search_btn {
      background-color: #5f84ff;
      color: #fff;
    }
  }
}
</style>
