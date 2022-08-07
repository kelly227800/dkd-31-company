// 人员管理模块

// 引入Api
import { searchPeopleList } from "@/api/people";
export default {
  namespaced: true,
  state: {
    peopleList: {}, //人员
  },
  mutations: {
    // 添加人员列表
    setPeopleList(state, payload) {
      state.peopleList = payload;
    },
  },
  actions: {
    // 获取人员列表
    async getPeopleList(context) {
      const res = await searchPeopleList();
      console.log(res);
      context.commit("setPeopleList", res);
    },
  },
};
