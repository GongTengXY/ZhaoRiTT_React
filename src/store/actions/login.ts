import type {
  Token,
  Refresh_token,
  LoginForm,
  LoginResponse,
} from '@/types/data'
import type { RootThunkAction } from '@/types/store'
// import requset from '@/utils/request'
import {
  setToken,
  setRefreshToken,
  removeRefreshToken,
  removeToken,
  getToken,
  getRefreshToken,
} from '@/utils/token'
import { getAllToken, getNoteCode } from '@/api/login'

// Action
// 登录获取token
export const userTokenAction = (payload: Token) => ({
  type: 'login/token' as const,
  payload,
})
// 获取refresh_token
export const userRefreshTokenAction = (payload: Refresh_token) => ({
  type: 'login/refresh_token' as const,
  payload,
})
// 退出登录
export const QuitUserToken = () => ({
  type: 'login/quit' as const,
})

// Thunk
// 获取token
export const userToken = (value: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getAllToken(value)) as LoginResponse
    setToken(data.token)
    setRefreshToken(data.refresh_token)
    dispatch(userTokenAction(data.token))
    dispatch(userRefreshTokenAction(data.refresh_token))
  }
}
// 获取验证码
export const getCode = (mobile: string) => {
  return async () => {
    await getNoteCode(mobile)
    // 注意：验证码是发送到手机上的，因此，不需要更新Redux状态
  }
}
// 退出登录
export const QuitToken = (): RootThunkAction => {
  return async (dispatch) => {
    removeRefreshToken()
    removeToken()
    dispatch(QuitUserToken())
  }
}

type QuitUserTokenAction = ReturnType<typeof QuitUserToken>
type UserTokenAction = ReturnType<typeof userTokenAction>
type UserRefreshTokenAction = ReturnType<typeof userRefreshTokenAction>

// login.ts中的所有action类型联合
export type LoginAction =
  | UserRefreshTokenAction
  | UserTokenAction
  | QuitUserTokenAction
