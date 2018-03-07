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

// 根据id获取用户信息
export function getUserById(userId) {
  return request({
    url: '/admin/manager/user?userId=' + userId,
    method: 'get'
  })
}

// 提交手机号码
export function editPhone(phone) {
  return request({
    url: '/user/phone',
    method: 'post',
    data: {
      phone: phone
    }
  })
}

// 验证验证码
export function checkCode(phone, code) {
  return request({
    url: '/user/phone/check',
    method: 'post',
    data: {
      phone: phone,
      code: code
    }
  })
}
