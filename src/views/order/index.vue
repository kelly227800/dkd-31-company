<template>
  <div>
    <gSearch
      text1="订单编号"
      text2="选择日期"
      :allTaskStatusList="[]"
      @search="searchHandler"
    ></gSearch>
    <gForm :dateData="dateDate" :num="num" ref="getOrderApi"> </gForm>
  </div>
</template>

<script>
import gForm from "./components/form.vue";

import gSearch from "./components/search.vue";
import dayjs from "dayjs";

export default {
  data() {
    return {
      dateDate: {},
      currentPageIndex: "",
      num: 1,
    };
  },
  components: {
    gForm,

    gSearch,
  },
  created() {},

  methods: {
    searchHandler(val) {
      console.log(val);
      // const startDate = val.value1[0];
      // const endDate = val.value1[1];
      // console.log(startDate);
      // console.log(this.currentPageIndex);
      val.value1[0] = dayjs(val.value1[0]).format("YYYY-MM-DD");
      val.value1[1] = dayjs(val.value1[1]).format("YYYY-MM-DD");
      // console.log(time1);

      this.dateDate = val;
      // console.log(this.dateDate);
      this.num = 2;
      this.$refs.getOrderApi.getSeachOrderApi()
    },
  },
};
</script>

<style scoped></style>
