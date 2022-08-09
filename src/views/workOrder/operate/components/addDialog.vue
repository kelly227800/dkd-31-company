<template>
  <el-dialog title="新增工单" :visible="visible" @close="onClose" width="630px">
    <el-form
      :model="params"
      :rules="rules"
      ref="params"
      label-width="100px"
      style="margin: 0 30px"
    >
      <el-form-item label="设备编号" prop="innerCode">
        <el-input
          v-model="params.innerCode"
          maxlength="15"
          show-word-limit
          type="text"
          placeholder="请输入"
          @blur="blur"
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="productType">
        <el-select
          v-model="params.productType"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            :label="item.typeName"
            :value="item.typeId"
            v-for="item in productType"
            :key="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营人员" prop="assignorId">
        <el-select
          v-model="params.assignorId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            :label="item.userName"
            :value="item.userId"
            v-for="item in userList"
            :key="item.userId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入备注（不超过40字）"
          v-model="params.desc"
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
import viewsButton from "@/components/viewsButton";
import { getOperatorList, getCreateList } from "@/api/workOrder";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    productType: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      params: {
        createType: 1, //页码
        innerCode: "", //设备编号
        userId: this.$store.state.user.userId, //创建人Id
        assignorId: "", //执行人Id
        productType: "", //工单类型
        desc: "", //描述
        details: [],
      },
      details: {
        channelCode: "", //货道编号
        expectCapacity: "", //补货数量
        skuId: "", //商品id
        skuName: "", //商品名称
        skuImage: "", //商品图片
      }, //补货信息
      rules: {
        innerCode: [{ required: true, message: "请输入", trigger: "blur" }],
        productType: [{ required: true, message: "请选择", trigger: "change" }],
        assignorId: [{ required: true, message: "请选择", trigger: "change" }],
        desc: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      userList: [],
    };
  },
  components: {
    viewsButton,
  },
  methods: {
    // 弹层关闭事件，取消
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.params.resetFields();
      this.params = {
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
      };
    },
    // 确定保存
    async onSave() {
      await this.$refs.params.validate();
      try {
        const res = await getCreateList();
        console.log(res);
        this.onClose();
        this.$emit("addSave");
      } catch (err) {
        this.$message.error("添加失败");
      }
    },
    // 设备编号的input框失去焦点的时候
    async blur() {
      if (this.params.innerCode !== "") {
        this.userList = await getOperatorList(this.params.innerCode);
      }
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
