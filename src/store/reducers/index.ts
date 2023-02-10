import { combineReducers } from 'redux'
import { login } from './login'
import { user } from './user'

const reducers = combineReducers({
  login,
  user,
})

export default reducers
