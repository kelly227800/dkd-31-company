import request from '@/utils/request'

/**
 * 工单状态
 * @returns 
 */
export function allTaskStatus() {
    return request({
        url: 'task-service/task/allTaskStatus',
    })
}

/**
 * 搜索得到的列表
 * @param {*} params 
 * @returns 
 */
export function getSearch(params) {
    return request({
        url: '/task-service/task/search',
        params
    })
}

/**
 * 根据售货机获取运营人员列表
 * @param {*} params 
 * @returns 
 */
export function getOperatorList(innerCode) {
    return request({
        url: '/user-service/user/operatorList/'+ innerCode,
    })
}

/**
 * 创建工单
 * @param {*} data 
 * @returns 
 */
export function getCreateList(data) {
    return request({
        url: '/task-service/task/create',
        method:'POST',
        data
    })
}

/**
 * 设置自动补货工单阈值
 * @param {*} data alertValue
 * @returns 
 */
export function autoSupplyConfig(data) {
    return request({
        url: '/task-service/task/autoSupplyConfig',
        method:'POST',
        data
    })
}

/**
 * 工单详情
 * @param {*} data taskId工单id
 * @returns 
 */
export function taskInfo(taskId) {
    return request({
        url: '/task-service/task/taskInfo/'+taskId,
    })
}


