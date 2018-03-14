import request from '@/utils/request'

// 获取所有评论(类型,状态)
export function getAllComments(statue, type, page) {
  return request({
    url: '/admin/manager/comment?statue=' + statue + '&type=' + type + '&page=' + page,
    method: 'get'
  })
}

// 删除评论
export function deleteComment(id, userId) {
  return request({
    url: '/admin/manager/comment/',
    method: 'delete',
    data: {
      id: id,
      userId: userId
    }
  })
}

// 删除用户回复
export function deleteReply(replyId) {
  return request({
    url: '/admin/manager/reply',
    method: 'delete',
    data: {
      replyId: replyId
    }
  })
}

// 根据评论ID获取回复
export function getReplyById(commentId, page) {
  return request({
    url: '/admin/manager/reply' + '?commentId=' + commentId + '&page=' + page,
    method: 'get'
  })
}

// 根据ID获取评论详情
export function getCommentById(commentId) {
  return request({
    url: '/admin/manager/user/comment/' + commentId,
    method: 'get'
  })
}

// 获取某个用户的所有回复
export function getAllCommentsByUserId(page) {
  return request({
    url: '/admin/manager/user/comment?page=' + page,
    method: 'get'
  })
}

// 回复某个用户的评论
export function replyComment(touserId, commentId, content, url) {
  return request({
    url: '/admin/manager/user/comment',
    method: 'post',
    data: {
      touserId: touserId,
      commentId: commentId,
      content: content,
      url: url
    }
  })
}

// 获取某个用户的所有回复
export function getReplyByUserId(page) {
  return request({
    url: '/admin/manager/user/reply?page=' + page,
    method: 'get'
  })
}
