import request from '@/utils/request'
import { Own } from '@/types/data'

// 获取用户自己信息（不是自己个人的资料）
export const getUserInfo = (): unknown =>
  request({
    method: 'get',
    url: '/user',
  })

// 获取个人信息资料
export const getOwnInfo = (): unknown =>
  request({
    method: 'get',
    url: '/user/profile',
  })

// 编辑个人信息资料
export const editOwnInfo = (data: Partial<Own>): unknown =>
  request({
    method: 'patch',
    url: '/user/profile',
    data,
  })

// 上传头像
export const postPhoto = (data: FormData): unknown =>
  request({
    method: 'patch',
    url: '/user/photo',
    data,
  })
