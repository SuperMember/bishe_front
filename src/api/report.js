import request from '@/utils/request'

// 举报
export function report(content, type, ruserId, url, belongId) {
  return request({
    url: '/manager/report/list',
    method: 'post',
    data: {
      content: content,
      type: type,
      ruserId: ruserId,
      url: url,
      belongId: belongId
    }
  })
}

// 修改举报状态
export function setReportStatue(statue, type, id, belongId, userId) {
  return request({
    url: '/manager/report/list',
    method: 'put',
    data: {
      statue: statue,
      id: id,
      type: type,
      userId: userId,
      belongId: belongId
    }

  })
}

// 获取举报的数据
export function getReport(page, type, result) {
  return request({
    url: '/manager/report/list?page=' + page + '&type=' + type + '&result=' + result,
    method: 'get'
  })
}

// 获取举报的内容
export function getReportByType(type, id) {
  return request({
    url: '/manager/report/' + type + '/' + id,
    method: 'get'
  })
}
