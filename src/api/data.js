import request from '@/utils/request'

export function getTable(page) {
  return request({
    url: '/table/list/data?page=' + page,
    method: 'get'
  })
}
