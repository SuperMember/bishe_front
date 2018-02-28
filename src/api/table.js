import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function deleteOne(params) {
  return request({
    url: 'table/list/data',
    method: 'delete',
    data: {
      id: params
    }
  })
}

export function updateOne(params) {
  return request({
    url: 'table/list/data',
    method: 'put',
    headers: {
      'dataType': 'json'
    },
    data: {
      id: params.id,
      zip: params.zip,
      address: params.address,
      province: params.province,
      city: params.city
    }
  })
}

export function addOne(params) {
  return request({
    url: 'table/list/data',
    method: 'post',
    data: {
      name: params.name,
      address: params.address,
      province: params.province,
      city: params.city
    }
  })
}
