<template>
  <el-dialog title="新增点位" :visible="visible" @close="onClose" width="630px">
    <el-form
      :model="params"
      :rules="rules"
      ref="params"
      label-width="100px"
      style="margin: 0 30px"
    >
      <el-form-item label="点位名称" prop="name">
        <el-input
          v-model="params.name"
          maxlength="15"
          show-word-limit
          type="text"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在区域" prop="regionId">
        <el-select
          v-model="params.regionId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in regionList"
            :key="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属商圈" prop="businessId">
        <el-select
          v-model="params.businessId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in businessList"
            :key="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属合作商" prop="ownerId">
        <el-select
          v-model="params.ownerId"
          placeholder="请选择"
          style="width: 100%"
          @change="change(params.ownerId)"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in ownerList"
            :key="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="areaCode">
        <el-cascader
          placeholder="请选择"
          style="width: 100%"
          size="large"
          :options="options"
          v-model="params.areaCode"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item prop="addr">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入备注（不超过40字）"
          v-model="params.addr"
          maxlength="40"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <span class="button">
        <viewsButton @click="onClose" type="warning">取消</viewsButton>
        <viewsButton @click="onSave" type="success">确定</viewsButton>
      </span>
    </el-form>
  </el-dialog>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import viewsButton from "@/components/viewsButton";
import {
  getPointSearch,
  getBusinessTypeList,
  getPartnerList,
  getAddNodeList,
} from "@/api/point";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      params: {
        name: "", //名称
        addr: "", //详细地址
        areaCode: "", //最后一级区域id
        createUserId: this.$store.state.user.userId, //创建人Id
        regionId: "", //所属区域Id
        businessId: "", //所属商圈Id
        ownerId: "", //	合作商Id
        ownerName: "", //合作商名称
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        regionId: [{ required: true, message: "选择", trigger: "change" }],
        businessId: [{ required: true, message: "选择", trigger: "change" }],
        ownerId: [{ required: true, message: "选择", trigger: "change" }],
        areaCode: [{ required: true, message: "选择", trigger: "change" }],
        addr: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      regionList: [], //所属区域
      businessList: [], //所属商圈
      ownerList: [], //合作商
      options: regionData,
      selectedOptions: [],
      code: [],
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    handleChange(value) {
      this.code = value;
      this.params.areaCode = value[2];
    },
    async getAdd() {
      // 所属区域
      const regionListRes = await getPointSearch({
        pageIndex: 1,
        pageSize: 100000,
      });
      this.regionList = regionListRes.currentPageRecords;
      // 所属商圈
      this.businessList = await getBusinessTypeList({});
      // 合作商搜索
      const ownerListRes = await getPartnerList({
        pageIndex: 1,
        pageSize: 100000,
      });
      this.ownerList = ownerListRes.currentPageRecords;
    },
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.params.resetFields();
      this.params = {
        name: "", //名称
        addr: "", //详细地址
        areaCode: "", //最后一级区域id
        createUserId: this.$store.state.user.userId, //创建人Id
        regionId: "", //所属区域Id
        businessId: "", //所属商圈Id
        ownerId: "", //	合作商Id
        ownerName: "", //合作商名称
      };
    },
    // 确定保存
    async onSave() {
      await this.$refs.params.validate();
      try {
        const x1 = CodeToText[this.code[0]];
        const x2 = CodeToText[this.code[1]];
        const x3 = CodeToText[this.code[2]];
        const area = x1 + "-" + x2 + "-" + x3 + "-" + this.params.addr;
        this.params.addr = area;
        await getAddNodeList(this.params);
        this.onClose();
        this.$emit("addSave", 1);
      } catch (err) {
        this.$message.error("添加失败");
      }
    },
    change(id) {
      this.params.ownerName = this.ownerList.find((ele) => ele.id === id).name;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  .el-button {
    margin-right: 30px;
  }
}
</style>
