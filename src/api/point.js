import request from "@/utils/request";

/**
 * 区域列表
 * @param {*} params 
 * @returns 
 */
export function getPointSearch(params) {
    return request({
        url: '/vm-service/region/search',
        params
    })
}

/**
 * 新增区域
 * @param {*} data 
 * @returns 
 */
export function getCreateList(data) {
    return request({
        url: '/vm-service/region',
        method: 'POST',
        data
    })
}

/**
 * 点位搜索，详情弹层的表格
 * @param {*} data 
 * @returns 
 */
export function getDetailsList(params) {
    return request({
        url: '/vm-service/node/search',
        params
    })
}

/**
 * 获取区域详情（修改弹层通过id获取数据）
 * @param {*} regionId 
 * @returns 
 */
export function getChangeDetailsList(regionId) {
    return request({
        url: 'vm-service/region/'+regionId,
    })
}

/**
 * 修改区域
 * @param {*} regionId 
 * @returns 
 */
export function getChangeList(id,data) {
    return request({
        url: 'vm-service/region/'+id,
        method: 'PUT',
        data
    })
}

/**
 * 
 * 删除区域
 * @param {*} data 
 * @returns 
 */
export function getDeleteList(id) {
    return request({
        url: '/vm-service/region/'+id,
        method: 'DELETE',
    })
}

/**
 * 区域列表
 * @param {*} params 
 * @returns 
 */
export function getAreaList(params) {
    return request({
        url: '/vm-service/region/search',
        params
    })
}