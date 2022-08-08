<template>
  <el-dialog title="新增工单" :visible="visible">
    <el-form :model="params" :rules="rules" ref="params" label-width="100px">
      <el-form-item label="设备编号" prop="innerCode">
        <el-input
          v-model="params.innerCode"
          maxlength="15"
          show-word-limit
          type="text"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="productType">
        <el-select v-model="params.productType" placeholder="请选择">
          <el-option label="补货工单" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量" prop="delivery">
        <el-switch v-model="params.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="运营人员" prop="userId">
        <el-select v-model="params.productType" placeholder="请选择">
          <el-option label="补货工单" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="text">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入备注（不超过40字）"
          v-model="params.desc"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('params')">取消</el-button>
        <el-button @click="resetForm('params')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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
        createType: 1, //页码
        innerCode: "", //设备编号
        userId: "", //执行人Id
        productType: "", //工单类型
        desc: "", //描述
        details: {
          channelCode: "", //货道编号
          expectCapacity: "", //补货数量
          skuId: "", //商品id
          skuName: "", //商品名称
          skuImage: "", //商品图片
        }, //补货信息
      },
      rules: {
        innerCode: [{ required: true, message: "请输入", trigger: "blur" }],
        productType: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
