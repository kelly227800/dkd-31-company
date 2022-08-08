//  人员模块的Api

// 1、 人员列表的api
import request from "@/utils/request";
/**
 * 人员列表页
 * @param {Object} params 页码
 * @returns promise
 */
export const searchPeopleList = (params) => {
  return request({
    url: "/user-service/user/search",
    params,
  });
};

/**
 * 获取角色列表
 * @returns  promise
 */
export const getRoleList = () => {
  return request({
    url: "/user-service/role",
  });
};

/**
 * 获取区域列表
 * @param {Object} params 页码
 * @returns
 */
export const getRegionList = (params) => {
  return request({
    url: "/vm-service/region/search",
    params,
  });
};

export const addUser = (data) => {
  return request({
    url: "/user-service/user",
    method: "POST",
    data,
  });
};
