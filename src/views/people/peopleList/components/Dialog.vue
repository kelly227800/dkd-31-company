<template>
  <!-- 新增工单 -->
  <div>
    <!-- 主题内容 -->
    <el-form ref="form" :model="addFrom" label-width="80px">
      <el-form-item label="人员名称:  ">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="addFrom.userName"
          maxlength="15"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="角色:">
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

      <el-form-item label="联系电话:">
        <el-input
          type="text"
          placeholder="请输入手机号"
          v-model="addFrom.mobile"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <!--  -->
      <el-form-item label="负责区域:">
        <el-select
          style="width: 100%"
          v-model="addFrom.regionId"
          placeholder="请选择"
        >
          <!-- id: "1305439798119075841"
name: "城北街道"
nodeCount: 1
remark: "城北街道" -->
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item label="头像:">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="successFn"
          :before-upload="fileFn"
          accept="image/jpg,image/jpeg,image/png"
        >
          <img v-if="imageUrl" ref="img" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <!-- 确认和取消 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </div>
</template>

<script>
import { getRoleList, getRegionList, addUser } from "@/api/people";
export default {
  data() {
    return {
      // addIsShow: true,
      // 新增工单的value
      addFrom: {
        username: "",
        roleId: "",
        mobile: "",
        regionId: "",
        regionName: "",
        status: true,
        image: "",
      },
      imageUrl: "",
      roleList: [],
      regionList: [],
    };
  },

  created() {
    this.getRoleList();
    this.getRegionList();
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
      console.log(this.regionList);
    },
    // 文件上传成功
    successFn(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    // 新增人员
    async onSubmit() {
      try {
        const region = this.regionList.filter(
          (item) => item.id == this.addFrom.regionId
        );
        // console.log(this.$refs.img.src);
        this.addFrom.regionName = region[0].name;
        this.addFrom.image = this.$refs.img.src;
        console.log(this.addFrom);

        const res = await addUser(this.addFrom);
        console.log(res);
      } catch (error) {
        console.log("提交失败");
      }
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
