import { type } from 'os'

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

// 更新token
export type PutTokenResponse = ApiResponse<{ token: string }>

// 获取频道列表
export type ChannelResponse = ApiResponse<UserChannel>

// 获取文章列表
export type ArticlesResponse = ApiResponse<Articles>

// 关键词搜索提示响应数据
export type SuggestionResponse = ApiResponse<Suggestion>

// 搜索结果
export type SearchResultResponse = ApiResponse<SearchResult>

// 文章详情
export type ArticleDetailResponse = ApiResponse<ArticleContent>

// 获取文章评论
export type ArticleCommentResponse = ApiResponse<ArticleComment>

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

// 文章列表返回类型
export type Articles = {
  pre_timestamp: string
  results: Results
}

// 推荐文章结果
export type Results = ArticleDetail[]

// 文章列表详情信息
export type ArticleDetail = {
  art_id: string
  aut_id: string
  aut_name: string
  comm_count: number
  cover: {
    type: number
    images: string[]
  }
  pubdate: string
  title: string
  like_count?: number
  collect_count?: number
}

// 获取文章列表请求类型
export type ArticlesRequest = {
  channel_id: number
  timestamp: string
}

// reducers-login的state数据类型
export type Login = {
  token: string
  refresh_token: string
}

// 获取频道列表数据
type UserChannel = {
  channels: Channel[]
}

type Channel = {
  id: string
  name: string
}

// 关键词搜索提示响应数据
type Suggestion = {
  options: string[]
}

// 搜索结果
export type SearchResult = {
  page: number
  per_page: number
  total_count: number
  results: Results
}

// 文章详情响应数据类型
export type ArticleContent = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  attitude: number
  content: string
  is_collected: boolean
  // 接口中缺失
  comm_count: number
  like_count: number
  read_count: number
}
// 评论项的类型
export type ArtComment = {
  com_id: string
  aut_id: string
  aut_name: string
  aut_photo: string
  like_count: number
  reply_count: number
  pubdate: string
  content: string
  is_liking: boolean
  is_followed?: boolean
  is_top?: number
}
// 文章评论的类型
export type ArticleComment = {
  total_count: number
  end_id: string | null
  last_id: string | null
  results: ArtComment[]
}
// 对文章或评论进行评论的请求类型
export type addComment = {
  target: string
  content: string
  art_id?: string | null
}
// 文章的评论对应的响应类型
type AddArticleComment = {
  // 文章id
  art_id: null
  // 新建评论的 id
  com_id: string
  // 对谁进行了评论，如果是对文章进行评论，那么就是文章的id
  target: string
  // 文章id
  new_obj: ArtComment
}

// 对评论就行回复
type AddCommentReply = Qmit<AddArticleComment, 'art_id'>

export type AddCommentReplyResponse = ApiResponse<AddCommentReply>
