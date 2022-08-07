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
