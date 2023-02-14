import Icon from '@/components/Icon'
import { NavBar, SearchBar } from 'antd-mobile'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import { useDebounceFn } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkSuggestion, clearSuggestion } from '@/store/actions/search'
import { RootState } from '@/types/store'
import { useNavigate } from 'react-router-dom'

const GEEK_SEARCH_KEY = 'geek-89-search-history'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { suggestion } = useSelector((state: RootState) => state.search)
  const [searchText, setSearchText] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const localHistory = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
    ) as string[]
    setSearchHistory(localHistory)
  }, [])
  //   const history = useHistory()
  const { run: debounceGetSuggest } = useDebounceFn(
    (value: string) => {
      dispatch(ThunkSuggestion(value))
    },
    {
      wait: 800,
    }
  )
  // 搜索框提示
  const onSearchChange = (value: string) => {
    setSearchText(value)
    if (value.trim() === '') {
      return dispatch(clearSuggestion())
    }
    debounceGetSuggest(value)
  }

  // 关键词高亮
  const highlightSuggestion = suggestion.map((item) => {
    const lowerCaseItem = item.toLocaleLowerCase()
    const lowerCaseSearchTxt = searchText.toLocaleLowerCase()
    const index = lowerCaseItem.indexOf(lowerCaseSearchTxt)

    const searchTxtLength = searchText.length

    const left = item.slice(0, index)
    const right = item.slice(index + searchTxtLength)
    const search = item.slice(index, index + searchTxtLength)

    return {
      left,
      right,
      search,
    }
  })
  // 搜索结果
  const onSearchResult = () => {
    dispatch(clearSuggestion())
    navigate(`/search/result/${searchText}`)
    saveHistories(searchText)
  }
  // 储存搜索记录
  const saveHistories = (value: string) => {
    // 1. 创建保存历史记录的函数 saveHistories
    // 2. 从本地缓存中获取到历史记录，判断本地缓存中是否有历史记录数据
    let localHistory = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
    ) as string[]
    if (localHistory.length === 0) {
      // 3. 如果没有，直接添加当前搜索内容到历史记录中
      localHistory = [value]
    } else {
      // 4. 如果有，判断是否包含当前搜索内容
      if (localHistory.indexOf(value) > -1) {
        // 6. 如果包含，将其移动到第一个
        localHistory = [value, ...localHistory.filter((item) => item !== value)]
      } else {
        // 5. 如果没有包含，直接添加到历史记录中
        localHistory = [...localHistory, value]
      }
    }
    // 7. 将最新的历史记录存储到本地缓存中
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(localHistory))
  }
  // 删除单个历史记录
  const onDeleteHistory = (value: string) => {
    const localHistory = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
    ) as string[]
    const newHistory = localHistory.filter((item) => item !== value)
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newHistory))

    setSearchHistory(newHistory)
  }
  // 清空所有历史记录
  const onClearAllHistory = () => {
    localStorage.removeItem(GEEK_SEARCH_KEY)
    setSearchHistory([])
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        onBack={() => navigate('/home')}
        className="navbar"
        right={
          <span className="search-text" onClick={onSearchResult}>
            搜索
          </span>
        }
      >
        <SearchBar
          value={searchText}
          placeholder="请输入关键字搜索"
          style={{ '--border-radius': '22px' }}
          onChange={onSearchChange}
        />
      </NavBar>

      {/* 搜索历史 */}
      {suggestion.length <= 0 && (
        <div
          className="history"
          style={{ display: searchHistory.length <= 0 ? 'none' : 'block' }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={onClearAllHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {searchHistory.map((item, index) => (
              <span
                className="history-item"
                key={index}
                onClick={() => onDeleteHistory(item)}
              >
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 搜素建议结果列表 */}
      <div
        className={classnames('search-result', suggestion.length > 0 && 'show')}
      >
        {highlightSuggestion.map((item, index) => (
          <div className="result-item" key={index}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value">
              {item.left}
              <span>{item.search}</span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
