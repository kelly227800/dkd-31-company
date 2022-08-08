<template>
  <el-dialog
    :title="Title"
    :visible="dialogVisible"
    width="40%"
    @close="onclose"
    center
  >
    <el-form ref="form" :model="forData" :rules="Rules">
      <el-form-item prop="name" label="型号名称" label-width="100px">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="forData.name"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item prop="model" label="型号编码" label-width="100px">
        <el-input
          type="text"
          placeholder="请输入  (限制数字、字母、中划线、下划线)"
          v-model="forData.model"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="vmRow"
        label="货道行数"
        label-width="100px"
        style="width: 100%"
      >
        <el-input-number
          style="width: 100%"
          v-model="forData.vmRow"
          controls-position="right"
          placeholder="请输入"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item prop="vmCol" label="货道列数" label-width="100px">
        <el-input-number
          style="width: 100%"
          v-model="forData.vmCol"
          controls-position="right"
          placeholder="请输入"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        prop="channelMaxCapacity"
        label="货道容量"
        label-width="100px"
      >
        <el-input-number
          style="width: 100%"
          v-model="forData.channelMaxCapacity"
          controls-position="right"
          :min="1"
          :max="10"
          placeholder="请输入"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="设备图片" label-width="100px">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onyes">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  reviseDevicetypeapi,
  addDevicetypeapi,
  gettypelistapi,
} from "@/api/device";
export default {
  data() {
    return {
      forData: {
        name: "",
        model: "",
        vmRow: "",
        vmCol: "",
        channelMaxCapacity: "",
        image: "",
        typeId: "",
      },
      Title: "",
      Rules: {
        name: [
          { required: true, message: "请输入", trigger: "change" },
          {
            validator: async (rule, value, callback) => {
              const res = await gettypelistapi({
                pageIndex: 1,
                pageSize: 999999999,
              });
              console.log(res);
              let isrepeat;
              if (this.formData.id) {
                isrepeat = depts
                  .filter((e) => e.id !== this.formData.id)
                  .some((e) => e.code === value);
              } else {
                isrepeat = depts.some((e) => e.code === value);
              }
              isrepeat
                ? callback(new Error("已经有" + value + "这个编码了"))
                : callback();
            },
            trigger: "blur",
          },
        ],
        model: [{ required: true, message: "请输入", trigger: "change" }],
        vmRow: [{ required: true, message: "请输入", trigger: "change" }],
        vmCol: [{ required: true, message: "请输入", trigger: "change" }],
        channelMaxCapacity: [
          { required: true, message: "请输入", trigger: "change" },
        ],
      },
      imageUrl: "",
    };
  },
  props: {
    dialogVisible: {},
    currentRowitem: {},
  },
  computed: {
    addorrevise() {
      return this.currentRowitem.model;
    },
  },

  created() {
    console.log(this.currentRowitem);
    if (this.addorrevise) {
      this.forData.channelMaxCapacity = this.currentRowitem.channelMaxCapacity;
      this.forData.image = this.currentRowitem.image;
      this.forData.model = this.currentRowitem.model;
      this.forData.name = this.currentRowitem.name;
      this.forData.typeId = this.currentRowitem.typeId;
      this.forData.vmCol = this.currentRowitem.vmCol;
      this.forData.vmRow = this.currentRowitem.vmRow;
      this.imageUrl = this.currentRowitem.image;
      this.Title = "修改设备类型";
    } else {
      this.Title = "新增设备类型";
    }
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
    onclose() {
      this.forData = {
        name: "",
        model: "",
        vmRow: "",
        vmCol: "",
        channelMaxCapacity: "",
      };
      this.$emit("update:dialogVisible", false);
    },
    async onyes() {
      await this.$refs.form.validate();
      this.forData.image = this.imageUrl;
      if (this.addorrevise) {
        await reviseDevicetypeapi(this.forData);
      } else {
        await addDevicetypeapi(this.forData);
      }
      this.$emit("update:dialogVisible", false);
      this.$emit("update");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  .el-input__inner {
    text-align: center;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
