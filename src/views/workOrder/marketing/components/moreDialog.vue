<template>
  <el-dialog title="工单详情" :visible="visible" @close="onClose" width="630px">
    <!-- 状态和图片 -->
    <div class="status_success status">
      <!-- 左边信息 -->
      <div class="left">
        <i class="el-icon-success"></i>
        <span>完成</span>
      </div>
      <!-- 右边图片 -->
      <div class="right">
        <img src="@/assets/images/workOrder-finish.png" alt="" />
      </div>
    </div>
    <!-- <div class="status_cancel status">
      <div class="left">
        <i class="el-icon-info"></i>
        <span>取消</span>
      </div>
      <div class="right">
        <img src="@/assets/images/workOrder-cancel.png" alt="" />
      </div>
    </div> -->

    <!-- 信息显示 -->
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设备编号："> 01000059 </el-form-item>
        </el-col>
        <el-col :span="12"><div class="grid-content bg-purple">2</div></el-col>
      </el-row>
    </el-form>

    <!-- 按钮 -->
    <span class="button">
      <!-- <viewsButton @click="onClose" type="warning">重新创建</viewsButton> -->
    </span>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
import { autoSupplyConfig } from "@/api/workOrder";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formDate: {
        alertValue: 10,
      },
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    // // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
    },
    // // 确定保存
    // async onSave() {
    //   await this.$refs.form.validate();
    //   // const res = await autoSupplyConfig({
    //   //   alertValue: this.formDate.alertValue,
    //   // });
    //   this.onClose();
    //   this.$emit("addSave");
    // },
  },
};
</script>

<style lang="scss" scoped>
.status {
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    vertical-align: middle;
    i {
      font-size: 26px;
      margin: 0 16px 0 22px;
    }
  }
}
// .button {
//   display: flex;
//   justify-content: center;
//   .el-button {
//     margin-right: 30px;
//   }
// }
.status_success {
  i {
    color: #67c23a;
  }
}
.status_cancel {
  i {
    color: #000;
  }
}
</style>
