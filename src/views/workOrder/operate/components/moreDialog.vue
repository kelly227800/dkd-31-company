<template>
  <el-dialog title="工单详情" :visible="visible" @close="onClose" width="630px">
    <!-- 完成 -->
    <div
      class="status_success"
      v-if="taskMore.taskStatusTypeEntity.statusName === '完成'"
    >
      <div class="status">
        <!-- 左边信息 -->
        <div class="left">
          <i class="el-icon-success"></i>
          <span>{{ taskMore.taskStatusTypeEntity.statusName }}</span>
        </div>
        <!-- 右边图片 -->
        <div class="right">
          <img src="@/assets/images/workOrder-finish.png" alt="" />
        </div>
      </div>
      <!-- 信息显示 -->
      <el-form label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号：">
              {{ taskMore.innerCode }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期：">
              {{ taskMore.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完成日期：">
              {{ taskMore.updateTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员：">
              {{ taskMore.userName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型：">
              {{ taskMore.taskType.typeName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量："> <a>补货详情</a> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式：">
              {{ taskMore.createType ? "手动" : "自动" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注："> {{ taskMore.desc }} </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 取消 -->
    <div
      class="status_cancel"
      v-if="taskMore.taskStatusTypeEntity.statusName === '取消'"
    >
      <div class="status">
        <!-- 左边信息 -->
        <div class="left">
          <i class="el-icon-info"></i>
          <span>{{ taskMore.taskStatusTypeEntity.statusName }}</span>
        </div>
        <!-- 右边图片 -->
        <div class="right">
          <img src="@/assets/images/workOrder-cancel.png" alt="" />
        </div>
      </div>
      <!-- 信息显示 -->
      <el-form label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号：">
              {{ taskMore.innerCode }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期：">
              {{ taskMore.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消日期：">
              {{ taskMore.updateTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员：">
              {{ taskMore.userName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型：">
              {{ taskMore.taskType.typeName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量："> <a>补货详情</a> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式：">
              {{ taskMore.createType ? "手动" : "自动" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消原因：">
              {{ taskMore.desc }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮 -->
      <span class="button">
        <viewsButton @click="onAgain" type="warning">重新创建</viewsButton>
      </span>
    </div>
    <!-- 代办 -->
    <div
      class="status_doing"
      v-if="taskMore.taskStatusTypeEntity.statusName === '代办'"
    >
      <div class="status">
        <!-- 左边信息 -->
        <div class="left">
          <i class="el-icon-question"></i>
          <span>{{ taskMore.taskStatusTypeEntity.statusName }}</span>
        </div>
        <!-- 右边图片 -->
        <div class="right">
          <img src="@/assets/images/workOrder-doing.png" alt="" />
        </div>
      </div>
      <!-- 信息显示 -->
      <el-form label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号：">
              {{ taskMore.innerCode }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期：">
              {{ taskMore.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员：">
              {{ taskMore.userName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型：">
              {{ taskMore.taskType.typeName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量："> <a>补货详情</a> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式：">
              {{ taskMore.createType ? "手动" : "自动" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：">
              {{ taskMore.desc }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮 -->
      <span class="button">
        <viewsButton @click="onCancel" type="warning">取消工单</viewsButton>
      </span>
    </div>
  </el-dialog>
</template>

<script>
import viewsButton from "@/components/viewsButton";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    taskMore: {
      type: Object,
      required: true,
      default: {},
    },
  },
  data() {
    return {};
  },
  components: {
    viewsButton,
  },
  methods: {
    // // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
    },
    onAgain() {
      console.log("重新创建");
      this.onClose();
    },
    onCancel() {
      console.log("取消工单");
      this.onClose();
    },
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
.status_doing {
  i {
    color: #ff665f;
  }
}
.button {
  display: flex;
  justify-content: center;
}
</style>
