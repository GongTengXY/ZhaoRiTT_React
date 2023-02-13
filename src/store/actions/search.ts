import { RootThunkAction } from '@/types/store'
import {
  SuggestionResponse,
  SearchResultResponse,
  SearchResult,
} from '@/types/data'
import { getImpWord, getSearchResult } from '@/api/article'
// 获取关键词提示
export const getSuggestion = (payload: string[]) => ({
  type: 'artcile/searchWord' as const,
  payload,
})
// 清空关键词
export const clearSuggestion = () => ({ type: 'article/clearWord' as const })
// 搜索结果
export const SearchResults = (payload: SearchResult) => ({
  type: 'article/searchResult' as const,
  payload,
})

// 获取关键词提示
export const ThunkSuggestion = (payload: string): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getImpWord(payload)) as SuggestionResponse
    console.log(data.options)
    dispatch(getSuggestion(data.options))
  }
}
// 搜索结果
export const ThunkSearchResult = (payload: string): RootThunkAction => {
  return async (dispatch) => {
    const { data } = (await getSearchResult(payload)) as SearchResultResponse
    dispatch(SearchResults(data))
  }
}

type SearchResultAction = ReturnType<typeof SearchResults>
type ClearSuggestAction = ReturnType<typeof clearSuggestion>
type GetSuggestAction = ReturnType<typeof getSuggestion>

export type SearchAction =
  | GetSuggestAction
  | ClearSuggestAction
  | SearchResultAction
