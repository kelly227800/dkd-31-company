<template>
  <div>
    <el-dialog
      title="批量策略管理"
      :visible="batchdialogVisible"
      width="40%"
      @close="onclose"
      center
    >
      <el-form>
        <el-form-item label="选择策略" label-width="100px">
          <el-select v-model="tactics" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in tacticslist"
              :key="item.policyId"
              :label="item.policyName"
              :value="item.policyName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onclose">取 消</el-button>
        <el-button type="primary" @click="onyes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { gettacticslistapi, applytacticsapi } from "@/api/device";
export default {
  data() {
    return {
      tacticslist: [],
      tactics: "",
    };
  },
  props: {
    batchdialogVisible: {},
    batchdialogVisiblelist: {},
  },

  created() {
    this.gettacticslist();
  },
  computed: {},

  methods: {
    onclose() {
      this.$emit("update:batchdialogVisible", false);
    },
    async onyes() {
      const index = this.tacticslist.findIndex(
        (e) => e.policyName === this.tactics
      );
      const arr = [];
      this.batchdialogVisiblelist.forEach((e) => arr.push(e.innerCode));
      await applytacticsapi({
        innerCodeList: arr,
        policyId: this.tacticslist[index].policyId,
      });
      this.onclose();
      this.$message.success("修改成功");
      this.$emit("update");
    },
    async gettacticslist() {
      this.tacticslist = await gettacticslistapi();
    },
  },
};
</script>

<style scoped></style>
