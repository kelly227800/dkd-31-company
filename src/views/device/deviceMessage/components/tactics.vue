<template>
  <div>
    <el-dialog
      :title="Title"
      :visible="tacticsdialogVisible"
      width="40%"
      @close="onclose"
      center
    >
      <el-form v-if="!isshow">
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
      <el-row v-if="isshow" style="margin: 10px 50px">
        <el-col :span="12"
          ><div style="height: 36px">
            机器编号：{{ tacticsdialogVisibleitem.innerCode }}
          </div></el-col
        >
        <el-col :span="12"
          ><div style="height: 36px">
            策略名称：{{ tacticsdialogVisibleitem.policyName }}
          </div></el-col
        >
        <el-col :span="12"
          ><div style="height: 36px">
            策略方案：{{ tacticsdialogVisibleitem.discount }}%
          </div></el-col
        >
      </el-row>
      <span v-if="!isshow" slot="footer" class="dialog-footer">
        <el-button @click="onclose">取 消</el-button>
        <el-button type="primary" @click="onyes">确 定</el-button>
      </span>
      <span v-if="isshow" slot="footer" class="dialog-footer">
        <el-button @click="onclosetactics">取消策略</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Canceltacticsapi,
  gettacticslistapi,
  applytacticsapi,
} from "@/api/device";
export default {
  data() {
    return {
      isshowbutton: false,
      Title: "",
      FormData: {},
      tacticslist: [],
      tactics: "",
    };
  },
  props: {
    tacticsdialogVisible: {},
    tacticsdialogVisibleitem: {},
    tacticsdialogVisibleitemid: {},
  },

  created() {
    if (this.isshow) {
      this.Title = "策略管理";
    } else {
      this.Title = "批量策略管理";
      this.gettacticslist();
    }
  },
  computed: {
    isshow() {
      return this.tacticsdialogVisibleitem;
    },
  },

  methods: {
    onclose() {
      this.$emit("update:tacticsdialogVisible", false);
    },
    async onyes() {
      const index = this.tacticslist.findIndex(
        (e) => e.policyName === this.tactics
      );
      const arr = [];
      arr.push(this.tacticsdialogVisibleitemid.innerCode);
      await applytacticsapi({
        innerCodeList: arr,
        policyId: this.tacticslist[index].policyId,
      });
      this.onclose();
      this.$message.success("修改成功");
      this.$emit("update");
    },
    async onclosetactics() {
      await Canceltacticsapi(
        this.tacticsdialogVisibleitem.innerCode,
        this.tacticsdialogVisibleitem.policyId
      );
      this.onclose();
      this.$message.success("操作成功");
      this.$emit("update");
    },
    async gettacticslist() {
      this.tacticslist = await gettacticslistapi();
    },
  },
};
</script>

<style scoped></style>
