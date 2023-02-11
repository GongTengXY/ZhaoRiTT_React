import { RootThunkAction } from '@/types/store'
import {
  UserIResponse,
  User,
  Own,
  OwnIResponse,
  UserPhResponse,
} from '@/types/data'
import { getUserInfo, getOwnInfo, editOwnInfo, postPhoto } from '@/api/user'
import { setUserProfile, removeUserProfile } from '@/utils/storage'

// Action
// 获取用户信息
export const UserInfo = (payload: User) => ({
  type: 'user/Info' as const,
  payload,
})
// 获取个人信息
export const OwnInfo = (payload: Own) => ({
  type: 'user/ownInfo' as const,
  payload,
})
// 更新个人信息
export const UpdateInfo = (payload: Partial<Own>) => ({
  type: 'user/UpdateInfo' as const,
  payload,
})
// 退出登录
export const QuitLogin = () => ({
  type: 'user/quit' as const,
})
// 上传头像
export const PhotoAction = (payload: string) => ({
  type: 'user/photo' as const,
  payload,
})

// Thunk
// 获取用户信息
export const ThunkUserInfo = (): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getUserInfo()) as UserIResponse
    dispatch(UserInfo(data))
    setUserProfile(data)
  }
}
// 获取个人信息
export const ThunkOwnInfo = (): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getOwnInfo()) as OwnIResponse
    dispatch(OwnInfo(data))
  }
}
// 修改个人信息
export const ThunkEditOwnInfo = (payload: Partial<Own>): RootThunkAction => {
  return async (dispatch) => {
    await editOwnInfo(payload)
    dispatch(UpdateInfo(payload))
  }
}
// 退出登录
export const ThunkQuit = (): RootThunkAction => {
  return (dispatch) => {
    removeUserProfile()
    dispatch(QuitLogin())
  }
}
// 修改上传头像
export const ThunkPhoto = (payload: FormData): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await postPhoto(payload)) as UserPhResponse
    dispatch(PhotoAction(data.photo))
  }
}

type PostPhotoAction = ReturnType<typeof PhotoAction>
type GetUserInfo = ReturnType<typeof UserInfo>
type GetOwnInfo = ReturnType<typeof OwnInfo>
type UpdateOwnInfo = ReturnType<typeof UpdateInfo>
type QuitLoginInfo = ReturnType<typeof QuitLogin>
export type ReducersUser =
  | GetUserInfo
  | GetOwnInfo
  | UpdateOwnInfo
  | QuitLoginInfo
  | PostPhotoAction
