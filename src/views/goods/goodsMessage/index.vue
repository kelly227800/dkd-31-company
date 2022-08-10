<template>
  <div>
    <!-- 上边的一行表格查询 -->
    <goodsTypeSearch text1="商品搜索" @search="searchForm"></goodsTypeSearch>
    <!-- 下边的整个表格 -->
    <div class="result">
      <!-- 按钮 -->
      <div class="bottom_button">
        <viewsButton @click="onAdd" type="success">
          <i class="el-icon-circle-plus-outline"></i>
          新建
        </viewsButton>
        <viewsButton @click="update" type="warning">导入数据</viewsButton>
      </div>
      <!-- 表格 -->
      <goodsForm
        :searchList="searchList"
        :tableHead="tableHeadNext"
        :searchInfo="searchInfo"
        @editGoods="editGoodsFn"
      />
      <!-- 分页 -->
      <goodsPage
        :searchInfo="searchInfo"
        @changePage="changePageFn"
      ></goodsPage>
      <!-- 新增/修改弹框 -->
      <goodsDialog
        ref="goodsDialog"
        :typeList="typeList"
        :pageIndex="searchInfo.pageIndex"
        :showDialog="showDialog"
        :isEditGoods="isEditGoods"
        @close="closeAddDialog"
        @changePage="changePageFn"
      />
      <!-- 导入数据弹框 -->
      <el-dialog
        title="数据导入"
        :visible.sync="uploadDataDialog"
        width="483px"
        @close="uploadDataDialog = false"
      >
        <el-upload
          ref="upload"
          class="uploadData"
          :http-request="uploadGoodsData"
          :show-file-list="false"
          :limit="1"
          accept=".xls,.xlsx"
          :before-upload="beforeAvatarUpload"
          action="#"
        >
          <div class="upload_content">
            <span class="upload-title">标题：</span>
            <el-button size="small" type="primary">
              <svg-icon icon-class="upload" className="icon"></svg-icon>
              上传文件</el-button
            >
          </div>
          <div slot="tip" class="el-upload__tip">
            支持扩展名：xls、xlsx，文件不得大于1M
          </div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <goodsButton
            type="warning"
            @click="uploadDataDialog = false"
            class="cancel"
            >取消</goodsButton
          >
          <goodsButton type="success" @click="confirmUpload">确认</goodsButton>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import viewsButton from "@/components/viewsButton";
import goodsButton from "../components/goodsButton.vue";
import goodsForm from "../components/goodsForm.vue";
import goodsTypeSearch from "../components/goodsTypeSearch.vue";
import goodsPage from "../components/goodsPage.vue";
import goodsDialog from "../components/goodsDialog.vue";
import {
  getGoodsData,
  searchGoods,
  searchGoodsType,
  uploadGoodsData,
} from "@/api/goods";
export default {
  data() {
    return {
      searchList: [],
      typeList: [],
      searchInfo: {},
      tableHeadNext: [
        {
          prop: "brandName",
          label: "品牌",
        },
        {
          prop: "unit",
          label: "规格",
        },
        {
          prop: "price",
          label: "商品价格",
        },
        {
          prop: "skuClass.className",
          label: "商品类型",
        },
      ],
      isEditGoods: false,
      showDialog: false,
      uploadDataDialog: false,
      className: "",
    };
  },

  created() {
    this.getSearchList();
    this.getTypeList();
  },
  components: {
    viewsButton,
    goodsForm,
    goodsTypeSearch,
    goodsPage,
    goodsDialog,
    goodsButton,
  },
  methods: {
    // 获取商品类型数据
    async getTypeList() {
      try {
        const res = await searchGoodsType(1, 999);
        this.typeList = res.currentPageRecords;
      } catch (e) {
        this.$message.error("获取商品类型数据失败");
      }
    },
    // 进入页面获取商品数据
    async getSearchList() {
      try {
        const res = await searchGoods(1, 10);
        this.searchList = res.currentPageRecords;
        this.changeFormat(this.searchList);
        this.searchInfo = res;
        console.log(res);
      } catch (e) {
        this.$message.error("获取商品数据失败");
      }
    },
    // 点击改变页码
    async changePageFn(val) {
      try {
        const res = await searchGoods(val, 10, this.className);
        // console.log(res);
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (err) {
        this.$message.error("获取商品数据失败");
      }
    },
    // 搜索关键词获取商品数据
    async searchForm(className) {
      try {
        const res = await searchGoods(1, 10, className);
        this.className = className;
        this.searchInfo = res;
        this.searchList = res.currentPageRecords;
      } catch (err) {
        this.$message.error("获取商品数据失败");
      }
    },
    // 点击修改商品
    editGoodsFn(row) {
      this.skuId = row.skuId;
      this.isEditGoods = true;
      this.showDialog = true;
      //数据回显
      // console.log(row);
      // console.log(this.$refs.goodsDialog.form);
      const formData = this.$refs.goodsDialog.form;
      formData.brandName = row.brandName;
      formData.className = row.skuClass.className;
      formData.imageUrl = row.skuImage;
      formData.price = row.price;
      formData.skuName = row.skuName;
      formData.unit = row.unit;
    },
    // 点击新建按钮
    onAdd() {
      this.showDialog = true;
    },
    // 点击导入数据按钮
    update() {
      this.uploadDataDialog = true;
    },
    // 确认导入
    confirmUpload() {
      console.log("确认导入");
    },
    // 导入商品数据
    async uploadGoodsData(param) {
      this.$refs.upload.clearFiles();
      // console.log(param);
      await uploadGoodsData(fileName);
    },
    // 关闭弹框
    closeAddDialog() {
      this.showDialog = false;
      this.isEditGoods = false;
    },
    // 对获取的数据进行格式修改
    changeFormat(searchList) {
      this.searchList = searchList.map((value, index, array) => {
        value.createTime = moment(value.createTime).format(
          "YYYY.MM.DD HH:mm:ss"
        );
        return value;
      });
    },
    // 上传文件前的校验
    beforeAvatarUpload(file) {
      const isXls_Xlsx = file.type === "/xls" || file.type === "/xlsx";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isXls_Xlsx) {
        this.$message.error("上传文件只能是 XLS 或 XLSX 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1M!");
      }
      return isXls_Xlsx && isLt1M;
    },
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
.dialog-footer {
  padding-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .cancel {
    margin-right: 34px;
  }
}
::v-deep {
  .el-dialog {
    border-radius: 10px;
    .el-dialog__title {
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }
}
.uploadData {
  .el-button {
    width: 221px;
    padding-top: 6px;
    padding-bottom: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    height: 36px;
    padding: 0;
    background-color: #5f84ff;
    border: none;
    ::v-deep span {
      font-weight: 500;
      font-size: 14px !important;
    }
    ::v-deep .icon {
      font-size: 14px !important;
    }
  }
}
.upload_content {
  margin-left: -30px;
  width: 483px;
  display: flex;
  justify-content: center;
  align-items: center;
  .upload-title {
    margin-right: 10px;
  }
}
.el-upload__tip {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 14px;
  color: #bac0cd;
}
</style>
