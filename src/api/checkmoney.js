import request from "@/utils/request";
/**
 * 获取收入列表
 * @param {object} code 页码
 * @returns
 */
export function getMoneyApi(params) {
  return request({
    url: "/order-service/report/partnerCollect",
    params,
  });
}

/**
 * 获取一定时间范围之内的分成总数
 * @param {object} code 页码
 * @returns
 */
export function totalBillApi(params) {
  return request({
    url: "/order-service/report/totalBill",
    params,
  });
}

/**
 * 获取一定时间范围之内的收入
 * @param {object} code 页码
 * @returns
 */
export function orderAmountApi(params) {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
}

/**
 * 获取一定时间范围之内的订单总数
 * @param {object} code 页码
 * @returns
 */
export function orderCountApi(params) {
  return request({
    url: "/order-service/report/orderCount",
    params,
  });
}
