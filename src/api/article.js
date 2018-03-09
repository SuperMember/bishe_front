import request from '@/utils/request'

// 发表文章
export function publish(page) {
  return request({
    url: '/table/list/data?page=' + page,
    method: 'get'
  })
}

// 根据状态获取用户自己的文章
export function getArticleByStatueSelf(statue, page, type) {
  return request({
    url: '/manager/article/list?page=' + page + '&statue=' + statue + '&type=' + type,
    method: 'get'
  })
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

// 删除文章
export function deleteArticle(articleId) {
  return request({
    url: '/manager/article/list',
    method: 'delete',
    data: {
      articleId: articleId
    }
  })
}

// 修改文章内容
export function updateArticle(form) {
  console.log(form)
  return request({
    url: '/admin/manager/article',
    method: 'put',
    data: {
      title: form.TITLE,
      stitle: form.STITLE,
      content: form.CONTENT,
      articleId: form.ID
    }
  })
}
