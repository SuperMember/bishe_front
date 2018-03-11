import request from '@/utils/request'

// 举报
export function report(content, type, ruserId, url) {
  return request({
    url: '/manager/report/list',
    method: 'post',
    data: {
      content: content,
      type: type,
      ruserId: ruserId,
      url: url
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
