import request from "@/utils/request";
/**
 * 查询售货机策略
 * @param {object} code 页码
 * @returns
 */
export function getStrategyApi(code) {
  return request({
    url: "/vm-service/policy/" + code,
  });
}
/**
 * 添加售货机策略
 * @param {object}
 * @returns
 */
export function addStrategyApi(data) {
  return request({
    url: "/vm-service/policy",
    method: "POST",
    data,
  });
}

/**
 * 删除售货机策略
 * @param {object}
 * @returns
 */
export function delStrategyApi(id) {
  return request({
    url: "/vm-service/policy/" + id,
    method: "DELETE",
  });
}

/**
 * 修改售货机策略
 * @param {object}
 * @returns
 */
export function editStrategyApi(id, data) {
  return request({
    url: "/vm-service/policy/" + id,
    method: "PUT",
    data,
  });
}

/**
 * 搜索售货机策略
 * @param {object}
 * @returns
 */
export function searchStrategyApi(params) {
  return request({
    url: "vm-service/policy/search",

    params,
  });
}

/**
 * 查询售货机策略详情
 * @param {object}
 * @returns
 */
export function getStrategyDetailsApi(id, params) {
  return request({
    url: "/vm-service/policy/vmList/" + id,

    params,
  });
}
