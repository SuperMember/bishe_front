import request from '@/utils/request'

// 举报
export function report(form) {
  return request({
    url: '/manager/report/list',
    method: 'post',
    data: {

    }
  })
}
