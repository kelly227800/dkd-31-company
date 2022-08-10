<template>
  <!-- 查看详情弹框 -->

  <el-dialog title="人员详情" :visible="isShow" @close="onClose" width="50%">
    <!--  -->
    <el-row class="row">
      <el-col :span="9"
        ><div class="grid-content bg-purple">
          人员名称：{{ userInfo.userName }}
        </div></el-col
      >
      <el-col :span="7"
        ><div class="grid-content bg-purple-light">
          角色：{{ userInfo.roleName }}
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          联系电话：{{ userInfo.mobile }}
        </div></el-col
      >
      <el-col :span="24" style="margin-top: 10px"
        ><div class="grid-content bg-purple">
          负责区域：{{ userInfo.regionName }}
        </div></el-col
      >
    </el-row>
    <!--  -->
    <el-row class="text_center" style="margin-top: 25px; background: #f3f6fb">
      <el-col :span="5"
        ><div class="grid-content bg-purple">&nbsp;</div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">总工单数</div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">拒绝工单</div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">完成工单</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple">进行中工单</div></el-col
      >
    </el-row>
    <!--  -->
    <el-row class="text_center">
      <el-col :span="5"><div class="grid-content bg-purple">本周</div></el-col>
      <el-col :span="5"
        ><div class="grid-content bg-purple">{{ weekWork.total }}</div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">
          {{ weekWork.cancelCount }}
        </div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">
          {{ weekWork.workCount }}
        </div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          {{ weekWork.progressTotal }}
        </div></el-col
      >
    </el-row>
    <el-row class="text_center">
      <el-col :span="5"><div class="grid-content bg-purple">本月</div></el-col>
      <el-col :span="5"
        ><div class="grid-content bg-purple">{{ monthWork.total }}</div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">
          {{ monthWork.cancelCount }}
        </div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">
          {{ monthWork.workCount }}
        </div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          {{ monthWork.workCount }}
        </div></el-col
      >
    </el-row>
    <el-row class="text_center">
      <el-col :span="5"><div class="grid-content bg-purple">本年</div></el-col>
      <el-col :span="5"
        ><div class="grid-content bg-purple">{{ yearWork.total }}</div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">
          {{ yearWork.cancelCount }}
        </div></el-col
      >
      <el-col :span="5"
        ><div class="grid-content bg-purple">
          {{ yearWork.workCount }}
        </div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          {{ yearWork.workCount }}
        </div></el-col
      >
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// 引入时间格式化
import {
  getYear,
  getCurrentMonthFirst,
  getWeek,
  getCurrentDay,
} from "@/utils/timer";
//
import { getWorkLoad, getUserInfo } from "@/api/people";
export default {
  data() {
    return {
      userInfo: {},
      weekWork: {},
      monthWork: {},
      yearWork: {},
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    year() {
      return getYear() + " 00:00:00";
    },
    month() {
      return getCurrentMonthFirst() + " 00:00:00";
    },
    week() {
      return getWeek() + " 00:00:00";
    },
    day() {
      return getCurrentDay() + " 23:59:59";
    },
  },
  created() {
    this.getUserInfo();
    this.getuserWork();
  },

  methods: {
    // 查看详情人员信息
    async getUserInfo() {
      const res = await getUserInfo(this.userId);
      //   console.log(res);
      this.userInfo = res;
      //   console.log("弹框请求");
    },
    // 工单完成情况
    async getuserWork() {
      // 获取本周的工单
      const res = await getWorkLoad({
        userId: this.userId,
        start: this.week,
        end: this.day,
      });
      this.weekWork = res;
      //   console.log(res);
      // 获取本y月的工单
      const res1 = await getWorkLoad({
        userId: this.userId,
        start: this.month,
        end: this.day,
      });
      //   console.log(res1);
      this.monthWork = res1;
      // 获取本年的工单
      const res2 = await getWorkLoad({
        userId: this.userId,
        start: this.year,
        end: this.day,
      });
      //   console.log(res2);
      this.yearWork = res2;
    },

    onClose() {
      this.$emit("update");
    },
  },
};
</script>

<style scoped lang="scss">
.el-dialog {
  .row {
    // width: 675px;
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
  }
  .text_center {
    .grid-content {
      text-align: center;
      height: 40px;
      line-height: 40px;
      border: 1px solid #d8dde3;
    }
  }
}
</style>
