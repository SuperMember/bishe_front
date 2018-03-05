import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    headers: { 'X-AUTH-TOKEN': token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function editProfile(token, url) {
  return request({
    url: '/user/profile',
    method: 'post',
    headers: { 'X-AUTH-TOKEN': token },
    data: {
      img: url
    }
  })
}
