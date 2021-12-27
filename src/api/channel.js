//获取所以频道

import request from '@/utils/request.js'

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

//添加用户频道
export const addUserChannel = channel => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

//删除指定用户频道
export const deleteUserChannel = channelid => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelid}`
    })
}