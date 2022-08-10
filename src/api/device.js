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
export function getPointsSearchapi(params) {
  return request({
    url: "/vm-service/node/search",
    params,
  });
}
export function addvendingmachineapi(data) {
  return request({
    url: "/vm-service/vm",
    method: "POST",
    data,
  });
}
export function revisevendingmachineapi(id, nodeId) {
  return request({
    url: "/vm-service/vm/" + id + "/" + nodeId,
    method: "PUT",
  });
}
export function gettacticslistapi(data) {
  return request({
    url: "/vm-service/policy",
    data,
  });
}
export function getInquiretacticsapi(innerCode) {
  return request({
    url: "/vm-service/policy/vmPolicy/" + innerCode,
  });
}
export function Canceltacticsapi(innerCode, policyId) {
  return request({
    url: "/vm-service/vm/cancelPolicy/" + innerCode + "/" + policyId,
    method: "PUT",
  });
}
export function applytacticsapi(data) {
  return request({
    url: "/vm-service/vm/applyPolicy",
    method: "PUT",
    data,
  });
}
export function getCargolanesdeitapi(innerCode) {
  return request({
    url: "/vm-service/channel/channelList/" + innerCode,
  });
}
export function getCargolanestypedeitapi(typeId) {
  return request({
    url: "/vm-service/vmType/" + typeId,
  });
}
export function getIntelligentstockingapi(businessId) {
  return request({
    url: "/vm-service/sku/businessTop10/" + businessId,
  });
}
export function getcommoditySearchapi(params) {
  return request({
    url: "/vm-service/sku/search",
    params,
  });
}
export function Cargolaneconfigurationapi(data) {
  return request({
    url: "/vm-service/channel/channelConfig",
    method: "PUT",
    data,
  });
}
