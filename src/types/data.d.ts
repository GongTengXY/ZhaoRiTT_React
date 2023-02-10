export type Token = string
export type Refresh_token = string
export type LoginForm = {
  mobile: string
  code: string
}

// token返回信息类型
export type LoginResponse = {
  data: Login
}

export type Login = {
  token: string
  refresh_token: string
}

// 用户信息返回类型
export type UserIResponse = {
  data: User
}

export type User = {
  id: string
  name: string
  photo: string
  is_media?: string
  intro?: string
  certi?: string
  art_count: string
  follow_count: string
  fans_count: string
  like_count: string
}
