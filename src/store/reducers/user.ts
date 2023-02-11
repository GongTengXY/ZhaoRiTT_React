import { ReducersUser } from '../actions/user'
import { User, Own } from '@/types/data'
import { getUserProfile } from '@/utils/storage'
const initValue = {
  UserInfo: getUserProfile() as User,
  OwnInfo: {} as Own,
}

export const user = (state = initValue, action: ReducersUser) => {
  switch (action.type) {
    case 'user/Info':
      return { ...state, UserInfo: action.payload }
    case 'user/ownInfo':
      return { ...state, OwnInfo: action.payload }
    case 'user/UpdateInfo':
      return { ...state, OwnInfo: { ...state.OwnInfo, ...action.payload } }
    case 'user/quit':
      // return { UserInfo: getUserProfile(), OwnInfo: action.payload }
      return { ...initValue }
    case 'user/photo':
      return {
        ...state,
        OwnInfo: { ...state.OwnInfo, photo: action.payload },
      }
    default:
      return state
  }
}
