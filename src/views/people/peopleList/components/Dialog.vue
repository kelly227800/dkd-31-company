<template>
  <!-- 新增工单 -->
  <el-dialog
    :title="deptTitle"
    :visible="dialogVisible"
    width="700px"
    @close="onClose"
    center
    :show-close="false"
  >
    <!-- 主题内容 -->
    <el-form :rules="rules" ref="ruleForm" :model="addFrom" label-width="100px">
      <el-form-item label="人员名称:  " prop="userName">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="addFrom.userName"
          maxlength="15"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="角色:" prop="roleId">
        <el-select
          style="width: 100%"
          v-model="addFrom.roleId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          type="text"
          placeholder="请输入手机号"
          v-model="addFrom.mobile"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <!--  -->
      <el-form-item label="负责区域:" prop="region">
        <el-select
          style="width: 100%"
          v-model="addFrom.regionId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item label="头像:" prop="image">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="successFn"
          :before-upload="fileFn"
          accept="image/jpg,image/jpeg,image/png"
        >
          <img
            v-if="addFrom.image"
            ref="img"
            :src="addFrom.image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过100kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态: ">
        <el-checkbox v-model="addFrom.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>

    <!-- 确认和取消 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getRoleList,
  getRegionList,
  addUser,
  modifyUserInfo,
} from "@/api/people";
export default {
  data() {
    const getName = async (rules, value, callback) => {
      let isRepeat;
      if (this.addFrom.userName) {
        isRepeat = this.PeopleList.some((item) => {
          return item.userName === this.addFrom.userName;
        });
        console.log(isRepeat);
        // true代表存在 重复   false 代表不重复
        isRepeat ? callback(new Error("名称重复")) : callback();
      }
    };
    const getMobile = async (rules, value, callback) => {
      let isRepeat;
      if (this.addFrom.mobile) {
        isRepeat = this.PeopleList.some((item) => {
          return item.mobile === this.addFrom.mobile;
        });
        console.log(isRepeat);
        // true代表存在 重复   false 代表不重复
        isRepeat ? callback(new Error("手机号重复")) : callback();
      }
    };
    return {
      // addIsShow: true,
      // 新增工单的value
      addFrom: {
        userName: "",
        roleId: 1,
        mobile: "",
        regionId: "",
        regionName: "",
        status: false,
        image: "",
      },
      imageUrl: "",
      roleList: [],
      regionList: [],
      rules: {
        userName: [
          { required: true, message: "请输入人员名称", trigger: "blur" },
          {
            validator: getName,
            trigger: "blur",
          },
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        mobile: [
          {
            required: true,
            message: "手机号格式错误",
            trigger: "blur",
            min: 11,
            max: 11,
          },
          {
            validator: getMobile,
            trigger: "blur",
          },
        ],
        // region: [
        //   { required: true, message: "请选择负责区域", trigger: "blur" },
        // ],
        image: [{ required: true, message: "请上传头像" }],
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    Personnel: {
      type: Object,
      default: () => ({}),
    },
    // 根据人员列表去判断是否有重复
    PeopleList: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.getRoleList();
    this.getRegionList();
  },
  watch: {
    Personnel: {
      immediate: true,
      // 赋值 避免修改值的时候会直接该父组件的值
      handler() {
        if (this.Personnel !== {}) {
          this.addFrom.userName = this.Personnel.userName;
          this.addFrom.roleId = this.Personnel.roleId;
          this.addFrom.mobile = this.Personnel.mobile;
          this.addFrom.regionId = this.Personnel.regionId;
          this.addFrom.regionName = this.Personnel.regionName;
          this.addFrom.status = this.Personnel.status;
          this.addFrom.image = this.Personnel.image;
          this.addFrom.id = this.Personnel.id;
        }
        return this.addFrom;
      },
    },
  },
  computed: {
    deptTitle() {
      return this.addFrom.id ? "编辑人员" : "新增人员";
    },
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleList();
      // console.log(res);
      this.roleList = res;
    },
    // 获取区域列表
    async getRegionList() {
      const params = { pageIndex: 1, pageSize: 999 };
      const res = await getRegionList(params);
      this.regionList = res.currentPageRecords;
      // console.log(this.regionList);
    },
    // 文件上传成功
    successFn(res, file) {
      this.addFrom.image = URL.createObjectURL(file.raw);
    },
    // 上传文件之前的判定
    fileFn(file) {
      // console.log(file);
      const isJPG = file.type;
      const isLt2M = file.size / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100kb!");
      }
      return isJPG && isLt2M;
    },
    // 编辑和新增人员
    async onSubmit() {
      // console.log(this.regionList);
      // console.log(this.addFrom);
      // 编辑人员
      if (this.addFrom.id) {
        try {
          const region = this.regionList.filter(
            (item) => item.id == this.addFrom.regionId
          );
          console.log(region);
          // console.log(this.$refs.img.src);
          this.addFrom.regionName = region[0].name;
          this.addFrom.image = this.$refs.img.src;
          // console.log(this.addFrom);
          // 表单校验
          await this.$refs.ruleForm.validate();
          const res = await modifyUserInfo(this.addFrom.id, this.addFrom);
          this.$refs.ruleForm.resetFields();
          this.$emit("update:dialogVisible", false);
          console.log(res);
        } catch (error) {
          // console.log(error);
          this.$message.error("名字或手机号重复");
        }
      } else {
        // 编辑人员
        try {
          const region = this.regionList.filter(
            (item) => item.id == this.addFrom.regionId
          );
          console.log(region);
          // console.log(this.$refs.img.src);
          this.addFrom.regionName = region[0].name;
          this.addFrom.image = this.$refs.img.src;
          // console.log(this.addFrom);
          // 表单校验
          await this.$refs.ruleForm.validate();
          const res = await addUser(this.addFrom);
          this.$refs.ruleForm.resetFields();
          this.$emit("update:dialogVisible", false);
          console.log(res);
        } catch (error) {
          // console.log(error);
          this.$message.error("名字或手机号重复");
        }
      }
    },
    onClose() {
      // console.log(this.$refs.ruleForm);
      this.$refs.ruleForm.resetFields();
      this.$emit("update:dialogVisible", false);
      // 对话框关闭 清除校验规则 并把表单恢复到初始值
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed red;
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
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #f3f6fb;
  border: 1px dashed #d8dde3;
  border-radius: 4px;
  cursor: pointer;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
