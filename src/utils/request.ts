import store from '@/store'
import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    const {
      login: { token },
    } = store.getState()
    if (!config.url?.startsWith('/authorizations')) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    console.log(response)
    return response.data
  },
  (error) => {
    if (error.response.status === 401) {
      // token 过期，登录超时
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
