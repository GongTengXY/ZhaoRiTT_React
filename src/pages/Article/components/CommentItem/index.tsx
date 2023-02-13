import styles from './index.module.scss'
import Icon from '@/components/Icon'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { ArtComment } from '@/types/data'
type Props = Partial<ArtComment> & {
  // normal 普通
  // origin 回复评论的原始评论
  // reply 回复评论
  type?: 'normal' | 'reply' | 'origin'
  // 点赞或取消点赞
  onThumbUp?: () => void
  // 展示评论回复弹出层的回调
  onReplyShow?: () => void
}
const CommentItem = ({
  type = 'normal',
  aut_photo,
  aut_name,
  like_count,
  is_followed,
  is_liking,
  content,
  reply_count,
  pubdate,
  onThumbUp,
  onReplyShow,
}: Props) => {
  const replyJSX =
    type === 'normal' ? (
      <span className="replay" onClick={onReplyShow}>
        {reply_count !== 0 && reply_count} 回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null
  return (
    <div className={styles.root}>
      <div className="avatar">
        <img
          src={aut_photo || 'http://geek.itheima.net/images/user_head.jpg'}
          alt=""
        />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">{aut_name}</span>
          {/* {thumbsUp} */}
          {/* 文章评论、评论的回复 */}
          {(type === 'normal' || type === 'reply') && (
            <span className="thumbs-up" onClick={onThumbUp}>
              {like_count}
              <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like'} />
            </span>
          )}
          {/* 要回复的评论 */}
          {type === 'origin' && (
            <span
              className={classnames('follow', is_followed ? 'followed' : '')}
            >
              {is_followed ? '已关注' : '关注'}
            </span>
          )}
        </div>
        <div className="comment-content">{content}</div>
        <div className="comment-footer">
          {replyJSX}
          <span className="comment-time">{dayjs().from(pubdate)}</span>
          {/* 未提供举报评论接口 */}
          <Icon className="close" type="iconbtn_essay_close" />
        </div>
      </div>
    </div>
  )
}

export default CommentItem
