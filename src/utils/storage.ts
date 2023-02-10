import { User } from '../types/data'
const USERINFO = 'userInfo'

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
