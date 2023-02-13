import { RootThunkAction } from '@/types/store'
import {
  ArticlesResponse,
  ArticlesRequest,
  Results,
  ArticleContent,
  ArticleDetailResponse,
  ArtComment,
  ArticleComment,
} from '@/types/data'
import {
  getArticleList,
  getArticleDetail,
  attentAuthor,
  unAttentAuthor,
  quitCollect,
  collectArticle,
  quitLiking,
  giveLiking,
  getComments,
  addArtComComment,
  addLiking,
  delAddLiking,
} from '@/api/article'

// Action
// 获取文章列表
export const getArticles = (payload: {
  channel_id: number
  timestamp: string
  list: Results
}) => ({
  type: 'article/getList' as const,
  payload,
})
// 退出登录
export const QuitArticles = () => ({ type: 'article/quit' as const })
// 下拉获取最新文章列表
export const getNewArticles = (payload: {
  channel_id: number
  timestamp: string
  list: Results
}) => ({
  type: 'article/newList' as const,
  payload,
})
// 获取文章详情
export const getArtDetail = (payload: ArticleContent) => ({
  type: 'article/detail' as const,
  payload,
})
type updateAction = {
  // 指定要修改的状态名称
  name: 'is_followed' | 'is_collected' | 'attitude'
  // 指定要修改的值
  value: boolean | number
}
// 点赞文章、关注作者、收藏文章
export const updateArtInfo = (payload: updateAction) => ({
  type: 'article/updateInfo' as const,
  payload,
})
// 对文章发表评论
export const addArtCommment = (payload: ArtComment) => ({
  type: 'article/addArtCom' as const,
  payload,
})
// 获得文章评论
export const getArtComments = (payload: ArticleComment) => ({
  type: 'article/getArticleComments' as const,
  payload,
})
// 点赞或评论
export const addComliking = (payload: string) => ({
  type: 'article/addordelComLike' as const,
  payload,
})
// 页面卸载时
export const emptyArtRedux = (payload: string) => ({
  type: 'article/Reset' as const,
  payload,
})

// Thunk
// 获取文章列表
export const ThunkGArticleList = (
  payload: ArticlesRequest
): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getArticleList(payload)) as ArticlesResponse
    // console.log(data)

    dispatch(
      getArticles({
        channel_id: payload.channel_id,
        timestamp: data.pre_timestamp,
        list: data.results,
      })
    )
  }
}
// 下拉获取最新的数据
export const ThunkNewArticleList = (
  payload: ArticlesRequest
): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getArticleList(payload)) as ArticlesResponse
    console.log(data)

    dispatch(
      getNewArticles({
        channel_id: payload.channel_id,
        timestamp: data.pre_timestamp,
        list: data.results,
      })
    )
  }
}
// 获取文章详情
export const ThunkArticleContent = (payload: string): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getArticleDetail(payload)) as ArticleDetailResponse
    console.log(data)
    dispatch(getArtDetail(data))
  }
}
// 点赞文章
export const ThunkLikeArticle = (
  art_id: string,
  attitude: number
): RootThunkAction => {
  return async (dispatch) => {
    // 1-点赞，0-没点赞
    try {
      if (attitude === 1) {
        await quitLiking(art_id)
      } else {
        await giveLiking(art_id)
      }
      dispatch(
        updateArtInfo({ name: 'attitude', value: attitude === 1 ? 0 : 1 })
      )
    } catch (error) {
      return console.log(error)
    }
  }
}
// 关注作者
export const ThunkAttentAuthor = (
  id: string,
  isFollowed: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isFollowed) {
      // 取关
      await unAttentAuthor(id)
    } else {
      // 关注
      await attentAuthor(id)
    }
    dispatch(updateArtInfo({ name: 'is_followed', value: !isFollowed }))
  }
}
// 收藏文章
export const ThunkCollectArt = (
  art_id: string,
  isCollected: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isCollected) {
      // 取消收藏
      await quitCollect(art_id)
    } else {
      // 收藏文章
      await collectArticle(art_id)
    }
    dispatch(updateArtInfo({ name: 'is_collected', value: !isCollected }))
  }
}
// 获取文章评论
export const getArticleComment = (
  type: string,
  id: string
): RootThunkAction => {
  return async (dispatch) => {
    const { data } = await getComments({ type, source: id })
    console.log(data)
    dispatch(getArtComments(data))
  }
}
// 获取更多文章评论数据 - 追加数据
export const getMoreArticleComments = (
  type: string,
  id: string,
  offset: string | null
): RootThunkAction => {
  return async (dispatch) => {
    const { data } = await getComments({ type, source: id, offset })
    console.log(data)
    dispatch(getArtComments(data))
  }
}
// 对文章发表评论
export const ThunkddArtComment = (
  target: string,
  content: string,
  art_id?: string | null
): RootThunkAction => {
  return async (dispatch) => {
    const { data } = await addArtComComment({ target, content, art_id })
    console.log(data)

    dispatch(addArtCommment(data.new_obj))
  }
}
// 对评论或评论回复进行点赞
export const ThunkAddLiking = (payload: string): RootThunkAction => {
  return async (dispatch) => {
    const { data } = await addLiking(payload)
    dispatch(addComliking(payload))
  }
}
// 取消对评论或评论回复进行点赞
export const ThunkDelAddLiking = (payload: string): RootThunkAction => {
  return async (dispatch) => {
    await delAddLiking(payload)
    dispatch(addComliking(payload))
  }
}

type EmptyArtReduxAction = ReturnType<typeof emptyArtRedux>
type AddArtComLikeAction = ReturnType<typeof addComliking>
type GetArtComAction = ReturnType<typeof getArtComments>
type AddArtComAction = ReturnType<typeof addArtCommment>
type UpdateArtInfoAction = ReturnType<typeof updateArtInfo>
type GetArtDetailAction = ReturnType<typeof getArtDetail>
type GetNewArticleAction = ReturnType<typeof getNewArticles>
type QuitArticleAction = ReturnType<typeof QuitArticles>
type GetArticleAction = ReturnType<typeof getArticles>

export type ActicleAction =
  | GetArticleAction
  | QuitArticleAction
  | GetNewArticleAction
  | GetArtDetailAction
  | UpdateArtInfoAction
  | AddArtComAction
  | GetArtComAction
  | AddArtComLikeAction
  | EmptyArtReduxAction
