import request from '@/utils/request'

// 获取用户自己信息（不是自己个人的资料）
export const getUserInfo = (): unknown =>
  request({
    method: 'get',
    url: '/user',
  })
