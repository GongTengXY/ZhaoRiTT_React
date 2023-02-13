import { SearchResult } from '@/types/data'
import { SearchAction } from '../actions/search'
type searchState = {
  suggestion: string[]
  searchResults: SearchResult
}

const initValue: searchState = {
  suggestion: [],
  searchResults: {
    page: 1,
    per_page: 10,
    total_count: 0,
    results: [],
  },
}

export const search = (
  state = initValue,
  action: SearchAction
): searchState => {
  switch (action.type) {
    case 'artcile/searchWord':
      return {
        ...state,
        suggestion: [...action.payload],
      }
    case 'article/clearWord':
      return {
        ...state,
        suggestion: initValue.suggestion,
      }
    case 'article/searchResult':
      return { ...state, searchResults: action.payload }
    default:
      return state
  }
}
