import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { ArticleDetail } from '@/types/data'
import { Image } from 'antd-mobile'
import dayjs from 'dayjs'
import relactiveTime from 'dayjs/plugin/relativeTime' // 相对时间插件
import 'dayjs/locale/zh-cn'
import { useNavigate } from 'react-router-dom'
dayjs.extend(relactiveTime)
dayjs.locale('zh-cn')

type Props = {
  article: ArticleDetail
  className?: string
}

const ArticleItem = ({ article }: Props) => {
  const navigate = useNavigate()
  const {
    art_id,
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate,
  } = article
  return (
    <div className={styles.root} onClick={() => navigate(`/article/${art_id}`)}>
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Image
                  style={{ width: '110px', height: '78px' }}
                  lazy
                  src={item}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name.indexOf('黑马') === -1 ? aut_name : '朝日小新'}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs().from(dayjs(pubdate))}</span>

        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
