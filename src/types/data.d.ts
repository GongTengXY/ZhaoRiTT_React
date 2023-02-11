// 封装统一的axios响应类型
type ApiResponse<Data> = {
  message: string
  data: Data
}
export type Token = string
export type Refresh_token = string
export type LoginForm = {
  mobile: string
  code: string
}

// token返回信息类型
export type LoginResponse = ApiResponse<Login>

// 用户信息返回类型
export type UserIResponse = ApiResponse<User>

// 个人信息返回类型
export type OwnIResponse = ApiResponse<Own>

// 上传头像的返回类型
export type UserPhResponse = ApiResponse<{ photo: string }>

// 用户信息响应类型
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

// 个人信息响应类型
export type Own = {
  id: string
  name: string
  photo: string
  mobile: string
  gender: string
  birthday: string
  intro?: string
}

// reducers-login的state数据类型
export type Login = {
  token: string
  refresh_token: string
}
