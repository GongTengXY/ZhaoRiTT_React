import Icon from '@/components/Icon'
import { NavBar, SearchBar } from 'antd-mobile'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useState } from 'react'
import { useDebounceFn } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkSuggestion, clearSuggestion } from '@/store/actions/search'
import { RootState } from '@/types/store'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { suggestion } = useSelector((state: RootState) => state.search)
  const [searchText, setSearchText] = useState('')
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
      {/* <div className="history" style={{ display: 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          <span className="history-item">
            Python生成九宫格图片<span className="divider"></span>
          </span>
          <span className="history-item">
            Python<span className="divider"></span>
          </span>
          <span className="history-item">
            CSS<span className="divider"></span>
          </span>
          <span className="history-item">
            数据分析<span className="divider"></span>
          </span>
        </div>
      </div> */}

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
