<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <viewsSearch
      text1="型号搜索"
      ref="model"
      :allTaskStatusList="allTaskStatusList"
      @search="searchForm"
    ></viewsSearch>
    <!-- 下边的整个表格 -->
    <div class="result">
      <!-- 按钮 -->
      <div class="bottom_button">
        <viewsButton @click="onAdd" type="success">
          <i class="el-icon-circle-plus-outline"></i>
          新建
        </viewsButton>
      </div>
      <!-- 表格 -->
      <viewsForm
        :getSearchList="getSearchList"
        :tableHead="tableHead"
        :tableFoot="tableFoot"
        :getSearchInfo="getSearchInfo"
      >
        <template #equipmentimg>
          <div>
            <img
              v-for="item in getSearchInfo"
              :key="item.model"
              :src="item.image"
            />
          </div>
        </template>
        <template #operate>
          <div style="display: flex">
            <span class="span" @click="revisefn">修改</span>
            <span class="span span-del" @click="delfn">删除</span>
          </div>
        </template>
      </viewsForm>
      <!-- 分页 -->
      <viewsPage
        :getSearchInfo="getSearchInfo"
        @pageIndex="allTask"
        :disabledUp="disabledUp"
        :disabledDown="disabledDown"
      ></viewsPage>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { allTaskStatus } from "@/api/workOrder";
import { gettypelistapi } from "@/api/device";
import viewsSearch from "@/components/viewsSearch";
import viewsForm from "./components/viewsForm.vue";
import viewsPage from "@/components/viewsPage";
import viewsButton from "@/components/viewsButton";
export default {
  name: "marketing",
  data() {
    return {
      tableHead: [
        {
          prop: "name",
          label: "型号名称",
        },
        {
          prop: "model",
          label: "型号编号",
        },
      ],
      tableFoot: [
        {
          prop: "vmRow",
          label: "货道行",
        },
        {
          prop: "vmCol",
          label: "货道列",
        },
        {
          prop: "channelMaxCapacity",
          label: "设备容量",
        },
      ],
      allTaskStatusList: [],
      getSearchList: [],
      getSearchInfo: {},
      disabledUp: false,
      disabledDown: false,
      params: {
        pageIndex: 1,
        number: "",
        status: "",
      },
    };
  },
  components: {
    viewsSearch,
    viewsForm,
    viewsPage,
    viewsButton,
  },

  created() {
    this.allTaskStatus();
    this.allTask(1);
  },

  methods: {
    onAdd() {
      console.log("新建");
    },
    onSet() {
      console.log("配置");
    },
    onMore() {
      console.log("详情");
    },
    searchForm() {
      this.params.name = this.$refs.model.formInline.number;
      this.allTask(1);
    },
    // 初始获取页面内容
    async allTaskStatus() {
      const resStatus = await allTaskStatus();
      this.allTaskStatusList = resStatus;
    },
    async allTask(pageIndex) {
      this.params.pageIndex = pageIndex;
      const resSearch = await gettypelistapi(this.params);
      this.getSearchInfo = resSearch;
      this.getSearchList = resSearch.currentPageRecords;
      if (resSearch.pageIndex == 1) {
        this.disabledUp = true;
      } else {
        this.disabledUp = false;
      }
      if (resSearch.pageIndex == resSearch.totalPage) {
        this.disabledDown = true;
      } else {
        this.disabledDown = false;
      }
      this.changeFormat(this.getSearchList);
    },
    // 对获取的数据进行格式修改
    changeFormat(getSearchList) {
      this.getSearchList = getSearchList.map((value, index, array) => {
        if (value.createType === 1) {
          value.createType = "手动";
        } else {
          value.createType = "自动";
        }
        value.createTime = moment(value.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return value;
      });
    },
    revisefn() {},
    delfn() {},
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .bottom_button {
    margin-bottom: 20px;
    display: flex;
  }
}
.span {
  display: flex;
  cursor: pointer;
  color: #5f84ff;
  padding: 5px;
}
.span-del {
  color: #ff5a5a;
}
</style>
