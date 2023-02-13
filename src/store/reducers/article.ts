import {
  Articles,
  ArticleContent,
  ArticleComment,
  ArtComment,
} from '@/types/data'
import { ActicleAction } from '../actions/acticle'

type articleState = {
  articles: {
    [key: number]: Articles
  }
  articleDetail: ArticleContent
  comment: ArticleComment
}

const initValue: articleState = {
  articles: {},
  articleDetail: {} as ArticleContent,
  comment: {
    end_id: null,
    last_id: null,
    total_count: 0,
    results: [] as ArticleComment['results'],
  },
}

export const article = (
  state = initValue,
  action: ActicleAction
): articleState => {
  switch (action.type) {
    case 'article/getList':
      const curArticles = state.articles[action.payload.channel_id] ?? {
        pre_timestamp: null,
        results: [],
      }
      return {
        ...state,
        articles: {
          // 修改当前频道对应的文章列表数据
          [action.payload.channel_id]: {
            results: [...curArticles.results, ...action.payload.list], // 追加文章列表数据
            pre_timestamp: action.payload.timestamp,
          },
        },
      }
    case 'article/newList':
      return {
        ...state,
        articles: {
          [action.payload.channel_id]: {
            results: [
              ...action.payload.list,
              ...state.articles[action.payload.channel_id].results,
            ],
            pre_timestamp: action.payload.timestamp,
          },
        },
      }
    case 'article/detail':
      return { ...state, articleDetail: action.payload }
    case 'article/getArticleComments':
      return {
        ...state,
        comment: {
          ...action.payload,
          results: [...state.comment.results, ...action.payload.results],
        },
      }
    case 'article/updateInfo':
      return {
        ...state,
        articleDetail: {
          ...state.articleDetail,
          [action.payload.name]: action.payload.value,
          [action.payload.name === 'attitude' ? 'like_count' : '']: [
            action.payload.value === 1
              ? ++state.articleDetail.like_count
              : state.articleDetail.like_count === 0 ||
                --state.articleDetail.like_count,
          ],
        },
      }
    case 'article/addArtCom':
      return {
        ...state,
        articleDetail: {
          ...state.articleDetail,
          comm_count: state.articleDetail.comm_count + 1,
        },
        comment: {
          ...state.comment,
          total_count: state.comment.total_count + 1,
          results: [action.payload, ...state.comment.results],
        },
      }
    case 'article/addordelComLike':
      const newResults = state.comment.results.map((item) => {
        if (item.com_id === action.payload) {
          item.is_liking = !item.is_liking
          item.is_liking ? item.like_count++ : item.like_count--
          return item
        }
        return item
      })
      return {
        ...state,
        comment: { ...state.comment, results: [...newResults] },
      }
    case 'article/quit':
      return { ...initValue }
    case 'article/Reset':
      if (action.payload === 'article') {
        return { ...state, articleDetail: initValue.articleDetail }
      }
      return state
    default:
      return state
  }
}
