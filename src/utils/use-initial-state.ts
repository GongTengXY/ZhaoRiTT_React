import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/types/store'
import { useNavigate } from 'react-router-dom'
import store from '@/store'

// 使用泛型约束
export const useInitialState = <T extends keyof RootState>(
  action: () => void,
  stateName: T
) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector((state: RootState) => state[stateName])
  useEffect(() => {
    if (store.getState().login.token) {
      // 派发action
      dispatch(action())
    } else {
      navigate('/login')
    }
  }, [dispatch, action])
  return state
}
