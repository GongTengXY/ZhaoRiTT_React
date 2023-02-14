import Icon from '@/components/Icon'
import {
  ThunkArticleContent,
  ThunkAttentAuthor,
  ThunkCollectArt,
  ThunkLikeArticle,
  getArticleComment,
  getMoreArticleComments,
  ThunkddArtComment,
  ThunkDelAddLiking,
} from '@/store/actions/acticle'
import { useInitialState, useResetRedux } from '@/utils/use-initial-state'
import { NavBar, Toast, InfiniteScroll, Popup } from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { useEffect, useState, useRef } from 'react'
import ContentLoader from 'react-content-loader'
import { throttle } from '@/utils/throttle'
import CommentFooter from './components/CommentFooter'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import NoComment from './components/NoComment'
import CommentItem from './components/CommentItem'
import { ArtComment } from '@/types/data'
import CommentInput from './components/CommentInput'
import Reply from './components/Reply'
dayjs.extend(localizedFormat)

const NAV_BAR_HEIGTH = 45
// 评论类型 a： 对文章评论，c： 对评论回复评论
enum CommentType {
  Article = 'a',
  Comment = 'c',
}
// 评论回复的弹出层需要的数据类型
type CommentReply = {
  /**
   * 弹出层的展示或隐藏
   */
  visible: boolean
  /**
   * 评论项内容
   */
  commentItem: ArtComment
}

const Article = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isShowNavAuthor, setShowNavAuthor] = useState(false) // 滚动导航显示
  const [commentVisible, setCommentVisible] = useState(false) // 文章评论弹层显示
  const [commentReply, setCommentReply] = useState<CommentReply>({
    // 评论回复展开层状态
    visible: false,
    commentItem: {} as ArtComment,
  })
  const commentRef = useRef<HTMLDivElement>(null)
  const isShowComment = useRef(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const onCommentHide = () => setCommentVisible(false)

  const { articleDetail, comment } = useInitialState(
    () => ThunkArticleContent(id as string),
    'article',
    () => setLoading(false)
  )
  useResetRedux('article')
  // 第一次：获取评论数据
  useEffect(() => {
    dispatch(getArticleComment(CommentType.Article, id as string))
  }, [dispatch, id])
  // 文章评论
  const { end_id, last_id } = comment
  // 是否有更多评论
  const hasMoreComment = end_id !== last_id
  const {
    attitude,
    art_id,
    is_collected,
    aut_id,
    title,
    pubdate,
    aut_name,
    is_followed,
    content,
    aut_photo,
    comm_count,
    like_count,
  } = articleDetail
  // 控制文章评论回复弹出层的展示或隐藏的状态
  // 代码块高亮
  useEffect(() => {
    const dgHtmlDOM = document.querySelector('.dg-html')
    const codes = dgHtmlDOM?.querySelectorAll<HTMLElement>('pre code')
    // console.log(codes)
    if (codes && codes.length > 0) {
      codes.forEach((el) => {
        // 让每个 code 内容实现代码高亮
        hljs.highlightElement(el)
      })
      return
    }

    hljs.configure({
      // 忽略警告
      ignoreUnescapedHTML: true,
    })

    // 直接找到所有的 pre 标签
    const pres = dgHtmlDOM?.querySelectorAll('pre')
    if (pres && pres.length > 0) {
      pres.forEach((el) => {
        hljs.highlightElement(el)
      })
    }
  }, [articleDetail])
  // 滚动导航栏显示
  useEffect(() => {
    if (loading) return

    const wrapperEl = wrapperRef.current!
    const authorEl = authorRef.current!

    // 滚动监听函数
    const onScroll = throttle(() => {
      // 获取 .author 元素的位置信息
      const rect = authorEl.getBoundingClientRect()

      // 如果 .author 元素的顶部移出屏幕外，则显示顶部导航栏上的作者信息
      if (rect.top <= 0) {
        setShowNavAuthor(true)
      }
      // 否则隐藏导航栏上的作者信息
      else {
        isShowNavAuthor && setShowNavAuthor(false)
      }
    }, 200)

    // 注册 .wrapper 元素的 scroll 事件
    wrapperEl.addEventListener('scroll', onScroll)

    return () => {
      // 注销 .wrapper 元素的 scroll 事件
      wrapperEl.removeEventListener('scroll', onScroll)
    }
  }, [loading, isShowNavAuthor])
  // 展示或隐藏评论
  const onShowComment = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const comment = commentRef.current
    if (!comment) return

    const commentTop = comment.getBoundingClientRect().top
    // console.log(commentTop)
    if (!isShowComment.current) {
      // 还没有展示评论信息，此时，就展示评论信息
      wrapper.scrollTo({
        // wrapper.scrollTop 表示已经滚动的距离
        top: commentTop - NAV_BAR_HEIGTH + wrapper.scrollTop,
        // 如果想要滚动时，带有动画效果，可以使用 smooth 即可
        behavior: 'auto',
      })
      isShowComment.current = true
    } else {
      // 已经展示评论信息，此时，需要返回页面顶部
      wrapper.scrollTo(0, 0)
      isShowComment.current = false
    }
  }
  // 关注或者取关作者
  const onFollow = () => {
    dispatch(ThunkAttentAuthor(aut_id, is_followed))
  }
  // 收藏或取消收藏
  const onCollected = async () => {
    await dispatch(ThunkCollectArt(art_id, is_collected))
    Toast.show(is_collected ? '取消收藏' : '已收藏')
  }
  // 点赞或取消点赞
  const onLike = async () => {
    await dispatch(ThunkLikeArticle(art_id, attitude))
    Toast.show(attitude === 1 ? '取消点赞' : '已点赞')
  }
  // 以后每次：InfiniteScroll 加载评论数据
  const loadMoreComments = async () => {
    await dispatch(
      getMoreArticleComments(CommentType.Article, id as string, comment.last_id)
    )
  }
  // 点赞或取消点赞评论
  const onThumbUp = (id: string) => {
    dispatch(ThunkDelAddLiking(id))
  }
  // 打开回复评论弹出层
  const onCommentReplyShow = (commentItem: ArtComment) => {
    setCommentReply({
      visible: true,
      commentItem,
    })
  }
  // 关闭回复评论弹出层
  const onCommentReplyHide = () =>
    setCommentReply({
      ...commentReply,
      visible: false,
    })
  // 渲染评论回复的弹出层
  const renderReply = () => {
    return (
      <Popup
        bodyStyle={{
          width: '100%',
        }}
        className="reply-popup"
        position="right"
        visible={commentReply.visible}
      >
        <div className="comment-popup-wrapper">
          <Reply
            onClose={onCommentReplyHide}
            commentItem={commentReply.commentItem}
            onReplyThumbsUp={onThumbUp}
            articleId={id as string}
          />
        </div>
      </Popup>
    )
  }
  // 渲染文章详情
  const renderArticle = () => {
    return (
      <div className="wrapper" ref={wrapperRef}>
        {/* 文章详情 */}
        <div className="article-wrapper">
          {/* 文章描述信息栏 */}
          <div className="header">
            <h1 className="title">{title}</h1>

            <div className="info">
              <span>{'2020-10-10'}</span>
              <span>{10} 阅读</span>
              <span>{10} 评论</span>
            </div>

            <div className="author" ref={authorRef}>
              <img src={aut_photo} alt="" />
              <span className="name">
                {aut_name.indexOf('黑马') === -1 ? aut_name : '朝日小新'}
              </span>
              <span
                className={classNames('follow', is_followed ? 'followed' : '')}
                onClick={onFollow}
              >
                {is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          {/* 文章正文内容区域 */}
          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content || ''),
              }}
            />
            <div className="date">
              发布文章时间：{dayjs(pubdate).locale('zh-cn').format('LL')}
            </div>
          </div>
        </div>

        {/* 文章评论 */}
        <div className="comment" ref={commentRef}>
          <div className="comment-header">
            <span>全部评论（{comm_count}）</span>
            <span>{like_count} 点赞</span>
          </div>

          {/* 评论列表 */}
          {comment.results.length === 0 ? (
            <NoComment />
          ) : (
            <div className="comment-list">
              {comment.results.map((item, index) => (
                <CommentItem
                  {...item}
                  key={index}
                  onThumbUp={() => onThumbUp(item.com_id)}
                  onReplyShow={() => onCommentReplyShow(item)}
                />
              ))}

              <InfiniteScroll
                hasMore={hasMoreComment}
                loadMore={loadMoreComments}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
  // 对文章或评论进行评论
  const onAddComment = async (content: string) => {
    await dispatch(ThunkddArtComment(art_id, content, null))
    // 关闭评论抽屉
    onCommentHide()
  }

  // 文章评论弹层
  const renderCommentPopup = () => {
    return (
      <Popup
        bodyStyle={{
          height: '100%',
        }}
        className="comment-popup"
        position="bottom"
        visible={commentVisible}
        onMaskClick={onCommentHide}
        destroyOnClose
      >
        <div className="comment-popup-wrapper">
          <CommentInput onClose={onCommentHide} onAddComment={onAddComment} />
        </div>
      </Popup>
    )
  }
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          onBack={() => navigate(-1)}
          right={
            <span style={{ marginRight: '5px' }}>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {isShowNavAuthor ? (
            <div className="nav-author">
              <img
                src={
                  aut_photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                }
                alt=""
              />
              <span className="name">
                {aut_name.indexOf('黑马') === -1 ? aut_name : '朝日小新'}
              </span>
              <span
                className={classNames('follow', is_followed ? 'followed' : '')}
                onClick={onFollow}
              >
                {is_followed ? '已关注' : '关注'}
              </span>
            </div>
          ) : (
            ''
          )}
        </NavBar>
        {/* // 数据加载完成后显示的实际界面 */}
        {loading ? (
          <ContentLoader
            speed={2}
            width={375}
            height={230}
            viewBox="0 0 375 230"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
            <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
            <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
            <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
            <circle cx="33" cy="69" r="17" />
            <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
            <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
            <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
            <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
            <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
            <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
          </ContentLoader>
        ) : (
          renderArticle()
        )}
        <CommentFooter
          placeholder={comm_count === 0 ? '抢沙发' : '去评论'}
          comm_count={comm_count}
          onShowComment={onShowComment}
          is_collected={is_collected}
          onCollected={onCollected}
          attitude={attitude}
          onLike={onLike}
          onShowArticleComment={() => setCommentVisible(true)}
        />
      </div>
      {/* 创建文章评论的弹出层 */}
      {renderCommentPopup()}
      {/* 文章评论、评论回复的弹出层 */}
      {renderReply()}
    </div>
  )
}

export default Article
