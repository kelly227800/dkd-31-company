<template>
  <div class="dialog">
    <el-dialog
      title="新增商品类型"
      :visible="dialogVisible"
      width="630px"
      @close="cancelAdd"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        v-if="dialogVisible"
      >
        <el-form-item
          label="商品类型名称："
          label-width="140px"
          prop="typeName"
        >
          <el-input
            v-model="form.typeName"
            placeholder="请输入"
            maxlength="10"
            autocomplete="off"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <goodsButton type="warning" class="cancel" @click="cancelAdd"
          >取消</goodsButton
        >
        <goodsButton type="success" @click="confirmAdd">确认</goodsButton>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import goodsButton from "../components/goodsButton.vue";
import { addGoodsType } from "@/api/goods";
export default {
  data() {
    return {
      form: {
        typeName: "",
      },
      rules: {
        typeName: [
          { required: true, message: "请输入商品类型名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    pageIndex: {
      type: String,
    },
  },
  components: {
    goodsButton,
  },
  methods: {
    async confirmAdd() {
      try {
        await this.$refs.form.validate();
        await addGoodsType(this.form.typeName);
        // console.log(this.pageIndex);
        this.$emit("changePage", this.pageIndex);
        this.form.typeName = "";
        this.$emit("close");
      } catch (err) {
        if (err == false) return err;
        this.$message.error("已存在此名称的对象");
      }
    },
    cancelAdd() {
      this.form.typeName = "";
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  width: 100%;
  height: 100%;
  ::v-deep {
    .el-dialog {
      border-radius: 10px;
      .el-dialog__title {
        line-height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }

      .el-form-item__label {
        line-height: 36px;
        font-weight: 400;
        padding: 0 12px 0 0;
      }
      .el-form-item__content {
        width: 396px;
        line-height: 36px;
      }
    }
  }
  .el-dialog__body {
    height: 214px !important;
    overflow: auto;
    padding: 20px 20px !important;
    padding-top: 0 !important;
    color: #666;
    font-size: 14px;
    font-weight: normal;
  }
  ::v-deep.el-dialog__footer {
    padding-top: 0;
    padding-bottom: 30px;
    .dialog-footer {
      padding-top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  ::v-deep.el-dialog__header {
    padding-bottom: 0 !important;
  }
  .cancel {
    margin-right: 34px;
  }
}
</style>
