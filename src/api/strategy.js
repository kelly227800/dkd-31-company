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
