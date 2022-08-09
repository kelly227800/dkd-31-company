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

/**
 * 新增人员
 * @param {Object} data 人员的所有信息
 * @returns  promise
 */
export const addUser = (data) => {
  return request({
    url: "/user-service/user",
    method: "POST",
    data,
  });
};

/**
 * 删除人员
 * @param {Number} id  用户的id
 * @returns promise
 */
export const delPersonnel = (id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: "DELETE",
  });
};

/**
 * 人员工作量列表
 * @param {*} params 工作量列表数量
 * @returns  promise
 */
export const getUserWork = (params) => {
  return request({
    url: "/user-service/user/searchUserWork",
    params,
  });
};
