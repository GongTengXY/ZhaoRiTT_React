import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { QuitToken } from '@/store/actions/login'
import { QuitLogin } from '@/store/actions/user'
import { isAuth } from './token'

const AuthRoute = ({ component }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  if (isAuth()) {
    return <>{component}</>
  } else {
    dispatch(QuitLogin())
    dispatch(QuitToken())
    return <Navigate to={'/login'} state={{ from: location.pathname }} />
  }
}

export default AuthRoute
