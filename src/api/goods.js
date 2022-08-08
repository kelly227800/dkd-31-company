import request from "@/utils/request";

/**
 * 商品数据导入
 * @param {String} fileName 文件名
 * @returns promise
 */
export function getGoodsData(fileName) {
  return request({
    url: "/vm-service/sku/upload",
    method: "POST",
    fileName,
  });
}

/**
 * 商品类型搜索
 * @param {string} className 商品名称
 * @returns promise
 */
export function searchGoodsType(pageIndex, pageSize, className) {
  return request({
    url: "/vm-service/skuClass/search",
    params: {
      pageIndex,
      pageSize,
      className,
    },
  });
}

/**
 * 新增商品类型
 * @param {String} className 类型名
 * @returns promise
 * 返回 boolean
 */
export function addGoodsType(className) {
  return request({
    url: "/vm-service/skuClass",
    method: "POST",
    data: {
      className,
    },
  });
}

/**
 * 修改商品类型
 * @param {} classId 类型Id
 * @param {String} className 类型名
 * @returns promise
 * 返回 boolean
 */
export function changeGoodsType(classId, className) {
  return request({
    url: "/vm-service/skuClass/" + classId,
    method: "PUT",
    className,
  });
}

/**
 * 删除商品类型
 * @param {*} classId 类型Id
 * @returns promise
 * 返回 boolean
 */
export function deleteGoodsType(classId) {
  return request({
    url: "/vm-service/skuClass/" + classId,
    method: "DELETE",
  });
}

/**
 * 商品搜索
 * @param {*} pageIndex
 * @param {*} pageSize
 * @param {*} skuName
 * @param {*} classId
 * @returns promise
 */
export function searchGoods(pageIndex, pageSize, skuName, classId) {
  return request({
    url: "/vm-service/sku/search",
    pageIndex,
    pageSize,
    skuName,
    classId,
  });
}

/**
 * 新增商品
 * @returns promise
 */
export function addGoods() {
  return request({
    url: "/vm-service/sku",
    method: "POST",
  });
}

/**
 * 修改商品
 * @param {*} skuId 商品Id
 * @returns promise
 */
export function changeGoods(skuId) {
  return request({
    url: "/vm-service/sku/" + skuId,
    method: "PUT",
  });
}
