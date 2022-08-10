<template>
  <div class="dialog">
    <el-dialog
      :title="isEditGoods ? '修改商品' : '新增商品'"
      :visible="showDialog"
      v-if="showDialog"
      width="630px"
      @close="cancel"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        v-if="showDialog"
        label-width="80px"
      >
        <el-form-item label="商品名称：" label-width="140px" prop="skuName">
          <el-input
            v-model="form.skuName"
            autocomplete="off"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌：" label-width="140px" prop="brandName">
          <el-input
            v-model="form.brandName"
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元)：" label-width="140px" prop="price">
          <el-input-number
            v-model="form.price"
            placeholder="请输入"
            autocomplete="off"
            controls-position="right"
            :step="Number(0.5)"
            :min="Number(0.01)"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="商品类型："
          label-width="140px"
          prop="className"
          ref="className"
        >
          <el-select v-model="form.className" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.classId"
              :label="item.className"
              :value="item.className"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格：" label-width="140px" prop="unit">
          <el-input
            v-model="form.unit"
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品图片："
          label-width="140px"
          class="upload"
          prop="imageUrl"
        >
          <el-upload
            ref="upload"
            accept=".png,.jpg"
            class="avatar-uploader"
            action="#"
            :http-request="uploadFile"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <svg-icon v-else icon-class="upload" className="icon"></svg-icon>
            <div slot="tip" class="el-upload__tip">
              支持扩展名：jpg、png，文件不得大于100kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <goodsButton type="warning" class="cancel" @click="cancel"
          >取消</goodsButton
        >
        <goodsButton type="success" @click="confirm">确认</goodsButton>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import goodsButton from "./goodsButton.vue";
import eventBus from "@/EventBus";
import { uploadImg, addGoods, changeGoods } from "@/api/goods";
export default {
  data() {
    return {
      dialogFormVisible: false,
      rowData: {},
      form: {
        skuName: "",
        brandName: "",
        price: undefined,
        className: "",
        unit: "",
        imageUrl: "",
      },
      rules: {
        skuName: [{ required: true, message: "请输入" }],
        brandName: [{ required: true, message: "请输入" }],
        price: [{ required: true, message: "请输入", trigger: "submit" }],
        className: [{ required: true, message: "请输入" }],
        unit: [{ required: true, message: "请输入" }],
        imageUrl: [{ required: true, message: "请上传" }],
      },
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    typeList: {
      type: Array,
      required: true,
    },
    isEditGoods: {
      type: Boolean,
    },
    pageIndex: {
      type: String,
    },
  },
  components: {
    goodsButton,
  },
  created() {
    eventBus.$on("sendRow", (row) => {
      // console.log(row);
      this.rowData = row;
    });
  },
  methods: {
    // 清空弹框表单项
    clearFormData() {
      for (let k in this.form) {
        this.form[k] = "";
      }
      this.form.price = undefined;
    },
    // 上传图片
    async uploadFile(param) {
      this.$refs.upload.clearFiles();
      const uploadfile = new FormData();
      uploadfile.append("fileName", param.file);
      const res = await uploadImg(uploadfile);
      this.form.imageUrl = res;
    },
    // 点击取消关闭弹框
    cancel() {
      this.$emit("close");
      this.clearFormData();
    },
    // 点击确认新增商品
    async confirm() {
      // 新增商品
      if (!this.isEditGoods) {
        try {
          await this.$refs.form.validate();
          let currentItem = {};
          this.typeList.forEach((item) => {
            if (item.className === this.form.className) {
              currentItem = item;
            }
          });
          const formdata = {
            skuName: this.form.skuName,
            skuImage: this.form.imageUrl,
            price: this.form.price,
            classId: currentItem.classId,
            unit: this.form.unit,
            brandName: this.form.brandName,
          };
          await addGoods(formdata);
          this.$emit("changePage", this.pageIndex);
          // console.log(res);
          this.$emit("close");
          this.clearFormData();
        } catch (err) {
          if (err == false) return err;
          this.$message.error("已存在此名称的对象");
        }
      } else {
        try {
          await this.$refs.form.validate();
          let currentData = {};
          this.typeList.forEach((item) => {
            if (item.className === this.form.className) {
              currentData = item;
            }
          });
          const newdata = {
            skuName: this.form.skuName,
            skuImage: this.form.imageUrl,
            price: this.form.price,
            classId: currentData.classId,
            unit: this.form.unit,
            brandName: this.form.brandName,
            skuId: this.rowData.skuId,
          };
          await changeGoods(this.rowData.skuId, newdata);
          this.$emit("changePage", this.pageIndex);
          this.$emit("close");
          this.clearFormData();
        } catch (err) {
          if (err == false) return err;
          this.$message.error("已存在此名称的对象");
        }
      }
    },
    // 上传文件前的校验
    beforeAvatarUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt100kb = file.size / 1024 / 1024 < 0.0976;
      if (!isJpgOrPng) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt100kb) {
        this.$message.error("上传图片大小不能超过 100kb!");
      }
      return isJpgOrPng && isLt100kb;
    },
    // 点击取消清空数据，关闭弹框
    cancel() {
      this.$emit("close");
      this.clearFormData();
    },
  },
};
</script>

<style scoped lang="scss">
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
    padding-bottom: 0 !important;
    color: #666;
    font-size: 14px;
    font-weight: normal;
  }
  ::v-deep.el-dialog__footer {
    padding-top: 0;
    padding-bottom: 32px;
    margin-top: -10px;
    .dialog-footer {
      padding-top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  ::v-deep.upload {
    margin-bottom: 0px !important;
  }
  ::v-deep.el-dialog__header {
    padding-bottom: 0 !important;
  }
  .cancel {
    margin-right: 34px;
  }
  .el-input-number {
    width: 396px;
  }
  .el-select {
    width: 396px;
  }
  ::v-deep.avatar-uploader {
    .el-upload {
      width: 84px;
      height: 84px;
      border: 1px dashed #d8dde3;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background-color: #f3f6fb;
      text-align: center;
      line-height: 84px;
      &:hover {
        border-color: #409eff;
      }
      .icon {
        width: 16px;
        height: 16px;
        font-size: 16px;
        color: #bac0cd;
      }
    }
  }
  .el-upload__tip {
    font-size: 14px;
    color: #bac0cd;
    margin-top: 0px;
  }
  //   .avatar {
  //     width: 178px;
  //     height: 178px;
  //     display: block;
  //   }
}
</style>
