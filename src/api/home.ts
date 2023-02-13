import request from '@/utils/request'

// 获取用户频道列表
export const getUserChannels = (): unknown =>
  request({
    method: 'get',
    url: '/user/channels',
  })

// 获取所有频道列表
export const getAllChannel = (): unknown =>
  request({
    method: 'get',
    url: '/channels',
  })

// 删除某一频道
export const delChannel = (target: string) =>
  request({
    method: 'delete',
    url: `/user/channels/${target}`,
  })

// 添加部分频道
export const addChannel = (data: any) =>
  request({
    method: 'patch',
    url: '/user/channels',
    data,
  })
