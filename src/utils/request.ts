import store from '@/store'
import axios from 'axios'
import { PutTokenResponse } from '@/types/data'
import { removeToken, removeRefreshToken, setToken } from './token'
import { removeUserProfile } from './storage'
import { QuitUserToken } from '../store/actions/login'
import { putToken } from '@/api/login'
import { QuitLogin } from '../store/actions/user'
import { Toast, Dialog } from 'antd-mobile'

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    const {
      login: { token },
    } = store.getState()
    if (token && !config.url?.startsWith('/authorizations')) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)

    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    console.log(error)
    if (error.response.status === 401) {
      if (!store.getState().login.refresh_token) {
        // 就没有token还想操作，得让其先登录
        window.location.replace('/login')
      } else {
        // token 过期，登录超时
        removeToken()
        store.dispatch(QuitUserToken())
      }
      const { data } = (await putToken()) as PutTokenResponse
      console.log(data)
      setToken(data.token)
      error.config.headers.Authorization = `Bearer ${data.token}`
      return instance(error.config)
    } else if (error.response.status === 500 && error.config.method === 'put') {
      removeRefreshToken()
      removeToken()
      removeUserProfile()
      store.dispatch(QuitUserToken())
      store.dispatch(QuitLogin())
      Toast.show({
        content: '登录超时，请重新登录',
        duration: 1000,
        afterClose: () => window.location.replace('/login'),
      })
    }
    return Promise.reject(error)
  }
)

export default instance
