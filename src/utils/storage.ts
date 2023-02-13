import { User, Channel } from '../types/data'
const USERINFO = 'userInfo'
const USERCHANNEL = 'userChannel'

// 用户信息
export const getUserProfile = (): User => {
  return JSON.parse(
    localStorage.getItem(USERINFO) ||
      '{"id":"","name":"","photo":"","art_count":"","follow_count":"","fans_count":"","like_count":""}'
  )
}

export const setUserProfile = (data: User) => {
  return localStorage.setItem(USERINFO, JSON.stringify(data))
}
export const removeUserProfile = () => {
  return localStorage.removeItem(USERINFO)
}

// 频道列表
export const getChannel = (): Channel[] => {
  return JSON.parse(localStorage.getItem(USERCHANNEL) || '[]')
}

export const setChannel = (channel: Channel[]) => {
  return localStorage.setItem(USERCHANNEL, JSON.stringify(channel))
}

export const removeChannel = () => {
  return localStorage.removeItem(USERCHANNEL)
}
