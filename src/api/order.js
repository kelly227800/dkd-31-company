import request from "@/utils/request";
/**
 * 获取订单列表
 * @param {object} code 页码
 * @returns
 */
export function getOrderApi(code) {
  return request({
    url: "/order-service/order/search" + code,
  });
}

/**
 * 搜索订单列表
 * @param {object} code 页码
 * @returns
 */
export function getSeachOrderApi(params) {
  return request({
    url: "/order-service/order/search",
    params,
  });
}
