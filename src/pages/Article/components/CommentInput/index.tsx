import { NavBar, TextArea } from 'antd-mobile'
import styles from './index.module.scss'
import { useRef, useEffect, useState } from 'react'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useAuthSet } from '@/utils/use-initial-state'
type Props = {
  onClose: () => void
  onAddComment: (content: string) => void
  name?: string
}
const CommentInput = ({ onClose, onAddComment, name }: Props) => {
  const isAuth = useAuthSet()
  const [textValue, setTextValue] = useState('')
  const textAreaRef = useRef<TextAreaRef>(null)
  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])
  const onChange = (value: string) => {
    setTextValue(value)
  }
  if (!isAuth) {
    // 如果当前未登录，则组件不渲染，跳回父组件。但跳回父组件也应当为异步操作
    Promise.resolve().then(() => onClose())
    return null
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        right={
          <span className="publish" onClick={() => onAddComment(textValue)}>
            发表
          </span>
        }
        onBack={onClose}
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <TextArea
          rows={3}
          ref={textAreaRef}
          value={textValue}
          placeholder="说点什么~"
          onChange={onChange}
          showCount
          maxLength={100}
        />
      </div>
    </div>
  )
}

export default CommentInput
