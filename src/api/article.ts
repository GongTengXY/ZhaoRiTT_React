import request from '@/utils/request'
import { ArticlesRequest, addComment } from '@/types/data'

// 获取文章列表
export const getArticleList = (params: ArticlesRequest): unknown =>
  request({
    method: 'get',
    url: '/articles',
    params,
  })

// 关键词搜索
export const getImpWord = (q: string): unknown =>
  request({
    method: 'get',
    url: '/suggestion',
    params: {
      q,
    },
  })

// 搜索结果
export const getSearchResult = (q: string): unknown =>
  request({
    method: 'get',
    url: '/search',
    params: {
      q,
    },
  })

// 获取文章详情
export const getArticleDetail = (id: string): unknown =>
  request({
    method: 'get',
    url: `/articles/${id}`,
  })

// 关注作者
export const attentAuthor = (target: string) =>
  request({
    method: 'post',
    url: '/user/followings',
    data: { target },
  })

// 文章点赞
export const giveLiking = (target: string) =>
  request({
    method: 'post',
    url: '/article/likings',
    data: { target },
  })

// 收藏文章
export const collectArticle = (target: string) =>
  request({
    method: 'post',
    url: '/article/collections',
    data: { target },
  })

// 取关
export const unAttentAuthor = (target: string) =>
  request({
    method: 'delete',
    url: `/user/followings/${target}`,
  })

// 取消点赞
export const quitLiking = (target: string) =>
  request({
    method: 'delete',
    url: `/article/likings/${target}`,
  })

// 取消收藏
export const quitCollect = (target: string) =>
  request({
    method: 'delete',
    url: `/article/likings/${target}`,
  })

type comment = {
  type: string
  source: string
  offset?: string | null
}
// 获取评论
export const getComments = (params: comment) =>
  request({
    method: 'get',
    url: '/comments',
    params,
  })
// 对文章或评论进行评论
export const addArtComComment = (data: addComment) =>
  request({
    method: 'post',
    url: '/comments',
    data,
  })

// 对评论或评论回复进行点赞
export const addLiking = (target: string) =>
  request({
    method: 'post',
    url: '/comment/likings',
    data: { target },
  })

// 取消对评论或评论回复进行点赞
export const delAddLiking = (target: string) =>
  request({
    method: 'delete',
    url: `/comment/likings/${target}`,
  })
