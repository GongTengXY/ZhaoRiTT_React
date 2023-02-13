import ArticleItem from '@/components/ArticleItem'
import { NavBar } from 'antd-mobile'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useInitialState } from '@/utils/use-initial-state'
import { ThunkSearchResult } from '@/store/actions/search'

const SearchResult = () => {
  const { q } = useParams()
  const navigate = useNavigate()
  const { searchResults } = useInitialState(
    () => ThunkSearchResult(q as string),
    'search'
  )

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar onBack={() => navigate('/search')}>搜索结果</NavBar>

      <div className="article-list">
        {searchResults.results.map((item, index) => (
          <div key={index}>
            <ArticleItem article={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResult
