import { HomeAction } from '../actions/home'
import { Channel } from '@/types/data'
import { getChannel } from '@/utils/storage'
type HomeState = {
  UserChannel: Channel[]
  AllChannel: Channel[]
  ChannelKey: string
}

const initValue: HomeState = {
  UserChannel: getChannel(),
  AllChannel: [],
  ChannelKey: '',
}

export const home = (state = initValue, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'home/userChannel':
      return {
        ...state,
        UserChannel: action.payload,
        ChannelKey: action.payload[0].id + '',
      }
    case 'home/allChannel':
      return { ...state, AllChannel: action.payload }
    case 'home/changeTab':
      return { ...state, ChannelKey: action.payload + '' }
    case 'home/quiChannel':
      return { ...initValue }
    case 'home/delChannel':
      return {
        ...state,
        UserChannel: action.payload,
      }
    case 'home/addChannel':
      return {
        ...state,
        UserChannel: [...state.UserChannel, action.payload],
      }
    default:
      return state
  }
}
