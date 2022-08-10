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
 * 所属商圈
 * @param {*} id 
 * @returns 
 */
export function getBusinessTypeList(data) {
    return request({
        url: '/vm-service/businessType',
        data
    })
}

/**
 * 合作商搜索
 * @param {*} data 
 * @returns 
 */
export function getPartnerList(params) {
    return request({
        url: '/user-service/partner/search',
        params
    })
}

/**
 * 新增点位
 * @param {*} params 
 * @returns 
 */
export function getAddNodeList(data) {
    return request({
        url: '/vm-service/node',
        method:'POST',
        data
    })
}

/**
 * 点位详情
 * @param {*} params 
 * @returns 
 */
 export function getNodeDetailsList(id) {
    return request({
        url: 'vm-service/node/vmList/'+id,
    })
}


/**
 * 
 * 删除点位
 * @param {*} data 
 * @returns 
 */
 export function getDeleteNodeList(id) {
    return request({
        url: '/vm-service/node/'+id,
        method: 'DELETE',
    })
}


/**
 * 
 * 修改点位
 * @param {*} data 
 * @returns 
 */
 export function getChangeNodeList(id,data) {
    return request({
        url: '/vm-service/node/'+id,
        method: 'PUT',
        data
    })
}

/**
 * 
 * 新增合作商
 * @param {*} data 
 * @returns 
 */
 export function getAddPartnerList(data) {
    return request({
        url: '/user-service/partner',
        method: 'POST',
        data
    })
}

/**
 * 删除合作商
 * @param {*} data 
 * @returns 
 */
export function getDeletePartnerList(id) {
    return request({
        url: '/user-service/partner/'+id,
        method: 'DELETE',
    })
}

/**
 * 修改合作商
 * @param {*} data 
 * @returns 
 */
export function getChangPartnerList(id,data) {
    return request({
        url: '/user-service/partner/'+id,
        method: 'PUT',
        data
    })
}

export function getPasswordList(id) {
    return request({
        url: '/user-service/partner/resetPwd/'+id,
        method: 'PUT',
    })
}