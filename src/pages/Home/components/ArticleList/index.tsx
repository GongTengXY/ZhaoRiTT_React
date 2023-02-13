import styles from './index.module.scss'
import { ThunkGArticleList, ThunkNewArticleList } from '@/store/actions/acticle'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import ArticleItem from '@/components/ArticleItem'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'

type Props = {
  channel_id: number
}

const ArticleList = ({ channel_id }: Props) => {
  const dispatch = useDispatch()
  // 获取当前频道的文章列表数据
  const { articles } = useSelector((state: RootState) => state.article)
  // 此处的 频道对应的 文章列表数据，可能是不存在的，所以，此处设置默认值
  const currentChannelArticle = articles[channel_id] ?? {
    pre_timestamp: Date.now() + '',
    results: [],
  }
  // pre_timestamp 时间戳
  // results 该频道的文章列表数据
  const { results, pre_timestamp } = currentChannelArticle

  // 加载更多数据的函数
  const loadMore = async () => {
    await dispatch(ThunkGArticleList({ channel_id, timestamp: pre_timestamp }))
  }
  // 下拉刷新更多数据
  const onRefresh = async () => {
    await dispatch(
      ThunkNewArticleList({ channel_id, timestamp: Date.now() + '' })
    )
  }

  // 是否加载更多数据的条件：
  // 如果 pre_timestamp 值为 null 说明没有更多数据了
  // 此时， hasMore 值为 false，那么，InfiniteScroll 组件就不会再次获取数据了
  const hasMore = pre_timestamp !== null

  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        {results.map((item, index) => (
          <div key={index} className="article-item">
            <ArticleItem article={item} />
          </div>
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}
export default ArticleList
