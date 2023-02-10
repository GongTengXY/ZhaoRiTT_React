import { RootThunkAction } from '@/types/store'
import { UserIResponse, User } from '@/types/data'
import { getUserInfo } from '@/api/user'
import { setUserProfile } from '@/utils/storage'

// 获取用户信息
export const UserInfo = (payload: User) => ({
  type: 'user/Info' as const,
  payload,
})

type GetUserInfo = ReturnType<typeof UserInfo>
// 获取用户信息
export const ThunkUserInfo = (): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getUserInfo()) as UserIResponse
    dispatch(UserInfo(data))
    setUserProfile(data)
  }
}

export type ReducersUser = GetUserInfo
