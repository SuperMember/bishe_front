import request from '@/utils/request'

// 发表文章
export function publish(page) {
  return request({
    url: '/table/list/data?page=' + page,
    method: 'get'
  })
}

// 根据状态获取用户自己的文章
export function getArticleByStatueSelf(statue, page) {

}

// 根据状态获取文章
export function getArticleByStatue(statue, page) {
  return request({
    url: '/admin/manager/articles/' + statue + '?page=' + page,
    method: 'get'
  })
}

// 修改文章状态
export function setArticleStatue(id, statue) {
  return request({
    url: '/admin/manager/articles',
    method: 'put',
    data: {
      id: id,
      statue: statue
    }
  })
}
