import { getToken, getRefreshToken } from '@/utils/token'
import { LoginAction } from '../actions/login'
import { Login } from '@/types/data'
const initValue: Login = {
  token: getToken(),
  refresh_token: getRefreshToken(),
}

export const login = (state = initValue, action: LoginAction): Login => {
  switch (action.type) {
    case 'login/token':
      return { ...state, token: action.payload }
    case 'login/refresh_token':
      return { ...state, refresh_token: action.payload }
    default:
      return state
  }
}
