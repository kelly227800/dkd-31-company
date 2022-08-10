<template>
  <el-button
    :class="[type, size]"
    class="btn"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.btn {
  width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
}
.el-button {
  background-color: #eee;
  color: #000;
  border: none;
  &:disabled {
    color: #d8dde3;
    background: #edf0f9;
  }
}
/* type */
.default {
  background-color: #5f84ff;
  color: #fff;
}
.success {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  color: white;
}
.warning {
  background-color: #fbf4f0;
  color: #655b56;
}
.info {
  background-color: #fff;
  color: #5f84ff;
}
.primary {
  background-color: #d5ddf8;
  color: #606266;
}
/* size */
.small {
  width: 70px;
  height: 32px;
}
.mini {
  width: 30px;
  height: 32px;
}
.xx {
  width: 56px;
  height: 24px;
}
.ll {
  width: 28px;
  height: 24px;
}
</style>
