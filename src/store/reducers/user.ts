import { ReducersUser, UserInfo } from '../actions/user'
import { User } from '@/types/data'
import { getUserProfile } from '@/utils/storage'
const initValue = {
  UserInfo: getUserProfile(),
}

export const user = (state = initValue, action: ReducersUser) => {
  switch (action.type) {
    case 'user/Info':
      return { ...state, UserInfo: action.payload }
    default:
      return state
  }
}
