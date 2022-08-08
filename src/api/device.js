import request from "@/utils/request";
export function getequipmentlistapi(params) {
  return request({
    url: "/vm-service/vm/search",
    params,
  });
}
export function gettypelistapi(params) {
  return request({
    url: "/vm-service/vmType/search",
    params,
  });
}
export function getSalesapi(data, innerCode, start, end) {
  return request({
    url:
      "/order-service/report/skuCollect/" + innerCode + "&" + start + "&" + end,
    data,
  });
}
