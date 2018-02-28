import request from '@/utils/request'

// 获取所有用户
export function getUser(statue, page) {
  return request({
    url: '/admin/manager/users/' + statue + '?page=' + page,
    method: 'get'
  })
}
// 修改用户状态
export function setUserStatue(userId, statue) {
  return request({
    url: '/admin/manager/user',
    method: 'put',
    data: {
      userId: userId,
      statue: statue === true ? 1 : 0
    }
  })
}
