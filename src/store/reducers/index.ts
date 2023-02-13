import { combineReducers } from 'redux'
import { login } from './login'
import { user } from './user'
import { home } from './home'
import { article } from './article'
import { search } from './search'

const reducers = combineReducers({
  login,
  user,
  home,
  article,
  search,
})

export default reducers
