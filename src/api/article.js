import request from '@/utils/request'

// 发表文章
export function publish(page) {
  return request({
    url: '/table/list/data?page=' + page,
    method: 'get'
  })
}
