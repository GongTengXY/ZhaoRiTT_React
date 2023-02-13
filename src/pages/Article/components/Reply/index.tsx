import CommentItem from '../CommentItem'
import NoComment from '../NoComment'
import CommentFooter from '../CommentFooter'
import { NavBar, Popup } from 'antd-mobile'
import styles from './index.module.scss'
import CommentInput from '../CommentInput'
import {
  ArtComment,
  ArticleComment,
  ArticleCommentResponse,
  AddCommentReplyResponse,
} from '@/types/data'
import { useState, useEffect } from 'react'
import { getArticleComment } from '@/store/actions/acticle'
import { useDispatch } from 'react-redux'
import request from '@/utils/request'

type Props = {
  onClose: () => void
  commentItem: ArtComment
  onReplyThumbsUp: (id: string, is_liking: boolean) => void
  // 文章id
  articleId: string
}

const Reply = ({ onClose, commentItem, onReplyThumbsUp, articleId }: Props) => {
  // 原始评论项的状态
  const [originComment, setOriginComment] = useState(commentItem)
  // 控制回复文本框弹出层的展示和隐藏
  const [showPopup, setShowPopup] = useState(false)
  // 评论项的回复列表状态
  const [commentReply, setCommentReply] = useState({} as ArticleComment)
  // 评论的回复列表数据
  const [reply, setReply] = useState<ArticleComment>({
    // 注意：为了防止第一次进入时，访问 reply.results.length 不报错，需要在此处给它设置默认值为：[]
    results: [] as ArtComment[],
    last_id: null,
    end_id: null,
    total_count: 0,
  })
  useEffect(() => {
    const loadDdata = async () => {
      const { data } = await request.get<ArticleCommentResponse>('/comments', {
        params: {
          type: 'c',
          source: originComment.com_id,
        },
      })
      setCommentReply(data.data)
    }
    loadDdata()
  }, [originComment.com_id])
  // 对评论进行点赞
  const onThumbUp = async () => {
    if (originComment.is_liking) {
      // 说明：当前是点赞的，此时，要取消点赞
      await request.delete(`/comment/likings/${originComment.com_id}`)
    } else {
      // 说明：当前是未点赞，此时，要点赞
      await request.post('/comment/likings', {
        target: originComment.com_id,
      })
    }

    setOriginComment({
      ...originComment,
      is_liking: !originComment.is_liking,
      like_count: originComment.is_liking
        ? originComment.like_count - 1
        : originComment.like_count + 1,
    })

    // 将修改后的评论数据，传递给父组件，然后，由父组件来修改该数据
    onReplyThumbsUp(originComment.com_id, originComment.is_liking)
  }
  // 对评论进行回复
  const onAddComment = async (value: string) => {
    const res = await request.post<AddCommentReplyResponse>('/comments', {
      target: originComment.com_id,

      content: value,
      art_id: articleId,
    })
  }
  const onReplyPopupHide = () => setShowPopup(false)
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onBack={onClose}>
          {reply.results.length} 条回复
        </NavBar>

        {/* 要回复的评论 */}
        <div className="origin-comment">
          <CommentItem type="origin" {...originComment} onThumbUp={onThumbUp} />
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {reply.results.length > 0 ? (
            reply.results.map((item) => (
              <CommentItem key={item.com_id} type="reply" {...item} />
            ))
          ) : (
            <NoComment />
          )}
        </div>

        <CommentFooter
          placeholder="去评论"
          type="reply"
          onShowArticleComment={() => setShowPopup(true)}
        />
      </div>

      {/* 回复文本框对应的抽屉 */}

      <Popup className="reply-popup" position="bottom" visible={showPopup}>
        <CommentInput
          name={originComment.aut_name}
          onAddComment={onAddComment}
          onClose={onReplyPopupHide}
        />
      </Popup>
    </div>
  )
}

export default Reply
