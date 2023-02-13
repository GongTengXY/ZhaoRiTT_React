import { RootThunkAction } from '@/types/store'
import { Channel, ChannelResponse } from '@/types/data'
import {
  getUserChannels,
  getAllChannel,
  delChannel,
  addChannel,
} from '@/api/home'
import { getChannel, setChannel } from '@/utils/storage'
import { isAuth } from '@/utils/token'
import store from '@/store'

// Action
// 获取用户频道列表
export const getChannels = (payload: Channel[]) => ({
  type: 'home/userChannel' as const,
  payload,
})
// 获取所有频道列表
export const getAllChannels = (payload: Channel[]) => ({
  type: 'home/allChannel' as const,
  payload,
})
// 退出
export const QuitChannels = () => ({
  type: 'home/quiChannel' as const,
})
// 频道高亮
export const changeTabs = (payload: string) => ({
  type: 'home/changeTab' as const,
  payload,
})
// 删除某一频道
export const delUserChannel = (payload: Channel[]) => ({
  type: 'home/delChannel' as const,
  payload,
})
// 添加部分频道
export const addUserChannel = (payload: Channel) => ({
  type: 'home/addChannel' as const,
  payload,
})

// Thunk
// 获取用户频道列表
export const ThunkChannel = (): RootThunkAction => {
  return async (dispatch) => {
    const {
      login: { token },
    } = store.getState()
    let UserChannels: Channel[] = []
    if (token) {
      // 已登录
      const { data } = (await getUserChannels()) as ChannelResponse
      // console.log(data)
      UserChannels = data.channels
    } else {
      // 未登录
      const localChannels = getChannel()
      if (localChannels.length > 0) {
        // 本地有存储频道数据
        UserChannels = localChannels
      } else {
        // 本地没有存储频道数据
        const { data } = (await getUserChannels()) as ChannelResponse
        setChannel(data.channels)
        UserChannels = data.channels
      }
    }
    dispatch(getChannels(UserChannels))
  }
}
// 获取所有频道列表
export const ThunkAllChannel = (): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getAllChannel()) as ChannelResponse
    dispatch(getAllChannels(data.channels))
  }
}
// 退出则频道列表回归原位
export const ThunkQuitChannel = (): RootThunkAction => {
  return (dispatch) => {
    dispatch(QuitChannels)
  }
}
// 删除某一频道
export const ThunkDelChannel = (payload: string): RootThunkAction => {
  const { UserChannel } = store.getState().home
  const result = UserChannel.filter((item) => item.id !== payload)
  return async (dispatch) => {
    if (isAuth()) {
      // 用户登录了
      await delChannel(payload)
      dispatch(delUserChannel(result))
    } else {
      dispatch(delUserChannel(result))
      setChannel(result)
    }
  }
}
// 添加部分频道
export const ThunkAddChannel = (payload: Channel): RootThunkAction => {
  return async (dispatch) => {
    if (isAuth()) {
      // 用户登录
      await addChannel({ channels: [payload] })
    } else {
      // 未登录
      setChannel([...getChannel(), payload])
    }
    dispatch(addUserChannel(payload))
  }
}

type UserChannelAction = ReturnType<typeof getChannels>
type AllChannelAction = ReturnType<typeof getAllChannels>
type QuitChannelAction = ReturnType<typeof QuitChannels>
type ChangeTabAction = ReturnType<typeof changeTabs>
type DelChannelAction = ReturnType<typeof delUserChannel>
type AddChannelAction = ReturnType<typeof addUserChannel>

export type HomeAction =
  | UserChannelAction
  | AllChannelAction
  | QuitChannelAction
  | ChangeTabAction
  | DelChannelAction
  | AddChannelAction
