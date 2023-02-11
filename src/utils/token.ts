import { Token, Refresh_token } from '../types/data'
const ZHAORITT_TOKEN = 'zhaoritt_react_token'
const ZHAORITT_REFRESH_TOKEN = 'zhaoritt_refresh_token'

export const getToken = (): Token => {
  return localStorage.getItem(ZHAORITT_TOKEN) || ''
}

export const setToken = (token: Token) =>
  localStorage.setItem(ZHAORITT_TOKEN, token)

export const removeToken = () => localStorage.removeItem(ZHAORITT_TOKEN)

export const getRefreshToken = (): Refresh_token => {
  return localStorage.getItem(ZHAORITT_REFRESH_TOKEN) || ''
}

export const setRefreshToken = (token: Refresh_token) =>
  localStorage.setItem(ZHAORITT_REFRESH_TOKEN, token)

export const removeRefreshToken = () =>
  localStorage.removeItem(ZHAORITT_REFRESH_TOKEN)

// 判断token是否存在
export const isAuth = () => !!getToken()
