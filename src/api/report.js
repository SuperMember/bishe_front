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
export function setReportStatue(statue, id) {
  return request({
    url: '/manager/report/list',
    method: 'put',
    data: {
      statue: statue,
      id: id
    }

  })
}

// 获取举报的数据
export function getReport(page, type) {
  return request({
    url: '/manager/report/list?page=' + page + '&type=' + type,
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
