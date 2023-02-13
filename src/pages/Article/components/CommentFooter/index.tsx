import Icon from '@/components/Icon'
import styles from './index.module.scss'
type Props = {
  onShowComment?: () => void
  type?: 'normal' | 'reply'
  onCollected?: () => void
  is_collected?: boolean
  onLike?: () => void
  attitude?: number
  onShowArticleComment?: () => void
  placeholder?: string
  comm_count?: number
}
const CommendFooter = ({
  comm_count,
  type = 'normal',
  placeholder = '抢沙发',
  onShowComment,
  onCollected,
  is_collected,
  onLike,
  attitude,
  onShowArticleComment,
}: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onShowArticleComment}>
        <Icon type="iconbianji" />
        <span>{placeholder}</span>
      </div>
      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onShowComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {comm_count !== 0 && <span className="bage">{comm_count}</span>}
          </div>
          <div className="action-item">
            <Icon
              onClick={onLike}
              type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like'}
            />
            <p>点赞</p>
          </div>
        </>
      )}

      <div className="action-item">
        <Icon
          onClick={onCollected}
          type={is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
        />
        <p>收藏</p>
      </div>
      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommendFooter
