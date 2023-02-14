import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/types/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog } from 'antd-mobile'
import { emptyArtRedux } from '../store/actions/acticle'
import store from '@/store'

// 使用泛型约束
// 分发action获取数据
export const useInitialState = <T extends keyof RootState>(
  action: () => void,
  stateName: T,
  afterAction?: () => void
) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const actionRef = useRef(action)
  const afterActionRef = useRef(afterAction)
  const state = useSelector((state: RootState) => state[stateName])
  useEffect(() => {
    const loaData = async () => {
      const actions = actionRef.current
      if (
        store.getState().login.token ||
        stateName === 'home' ||
        stateName === 'search'
      ) {
        await dispatch(actions())
        afterActionRef.current && afterActionRef.current()
      } else if (store.getState().login.token || stateName === 'article') {
        await dispatch(actions())
        afterActionRef.current && afterActionRef.current()
      } else {
        navigate('/login')
      }
    }
    loaData()
  }, [dispatch, stateName, navigate])
  return state
}

// 检查当前登录状态，未登录则提示
export const useAuthSet = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.login.token)
  useEffect(() => {
    if (!token) {
      const handler = Dialog.show({
        title: '温馨提示',
        content: '亲，发现您未登录，如需继续操作，需要去登录注册',
        actions: [
          [
            {
              key: 'cancel',
              text: '去登录',
              onClick: () =>
                navigate('/login', { state: { from: location.pathname } }),
            },
            {
              key: 'confirm',
              text: '取消',
              style: { color: 'var(--adm-color-weak)' },
              onClick: () => handler.close(),
            },
          ],
        ],
      })
    }
  }, [])
  return !!token
}

// 页面退出时，自动清空article的redux数据
export const useResetRedux = <KeyName extends keyof RootState>(
  stateName: KeyName
) => {
  const dispatch = useDispatch()
  // 退出页面时处理数据
  useEffect(() => {
    return () => {
      // 页面卸载时调用
      dispatch(emptyArtRedux(stateName as string))
    }
  }, [dispatch, stateName])
}
