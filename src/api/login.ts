import request from '@/utils/request'
import { LoginForm } from '@/types/data'

// 获取用户token
export const getAllToken = (data: LoginForm): unknown =>
  request({
    method: 'post',
    url: '/authorizations',
    data,
  })

// 获取短信验证码
export const getNoteCode = (mobile: string): unknown =>
  request({
    method: 'get',
    url: `/sms/codes/${mobile}`,
  })
