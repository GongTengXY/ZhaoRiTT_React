import { Input, NavBar, TextArea } from 'antd-mobile'
import { useState, useEffect } from 'react'
import { InputPopup } from '../../index'
import styles from './index.module.scss'
type Props = {
  onClose: () => void
  value: string
  onUpdateName: (type: InputPopup['type'], value: InputPopup['value']) => void
  type: '' | 'name' | 'intro'
}
const EditInput = ({ onClose, value, onUpdateName, type }: Props) => {
  const [inputValue, setInputValue] = useState(value)
  const submitValue = () => {
    if (type !== '') {
      onUpdateName(type, inputValue)
    }
  }
  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])
  const isName = type === 'name'

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={onClose}
        right={
          <span
            style={{ color: 'var(--adm-color-primary)' }}
            onClick={submitValue}
          >
            提交
          </span>
        }
      >
        编辑{isName ? '昵称' : '简介'}
      </NavBar>
      <div className="edit-input-content">
        <h3>{isName ? '昵称' : '简介'}</h3>
        {isName ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={inputValue}
              onChange={(value) => setInputValue(value)}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入"
            // 展示：右下角的字数统计
            showCount
            // 指定内容最大长度
            maxLength={100}
            // 指定 文本域 展示内容的行数（文本域高度）
            rows={4}
            value={inputValue}
            onChange={(value) => setInputValue(value)}
          />
        )}
      </div>
    </div>
  )
}
export default EditInput
