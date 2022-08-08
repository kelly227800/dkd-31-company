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
export function getSalesapi(innerCode, start, end) {
  return request({
    url:
      "/order-service/report/skuCollect/" + innerCode + "/" + start + "/" + end,
  });
}
export function getReplenishmentapi(innerCode, start, end) {
  return request({
    url:
      "/task-service/task/supplyCount/" + innerCode + "/" + start + "/" + end,
  });
}
export function getMaintenanceapi(innerCode, start, end) {
  return request({
    url:
      "/task-service/task/supplyCount/" + innerCode + "/" + start + "/" + end,
  });
}

export function getallSalesapi(params) {
  return request({
    url: "/order-service/report/orderCount/",
    params,
  });
}
export function getallsalesapi(params) {
  return request({
    url: "/order-service/report/orderAmount/",
    params,
  });
}
export function delDevicetypeapi(typeId) {
  return request({
    url: "/vm-service/vmType/" + typeId,
    method: "DELETE",
  });
}
export function reviseDevicetypeapi(data) {
  return request({
    url: "/vm-service/vmType/" + data.typeId,
    method: "PUT",
    data,
  });
}
export function addDevicetypeapi(data) {
  return request({
    url: "/vm-service/vmType",
    method: "POST",
    data,
  });
}
