import request from '@/utils/request.js'

//获取文章评论列表
export const getComments = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

//对评论点赞
export const addLikeComment = target => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}

//取消评论点赞
export const deleteLikeComment = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`
    })
}

//发布评论
export const addComment = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}