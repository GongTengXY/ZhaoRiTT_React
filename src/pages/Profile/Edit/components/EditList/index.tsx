import styles from './index.module.scss'

// 性别和头像数据
const genderList = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
]
const photoList = [
  { text: '拍照', value: 'picture' },
  { text: '本地选择', value: 'local' },
]

type props = {
  type: '' | 'gender' | 'photo'
  onClose: () => void
  onUpdateGender: (type: '' | 'gender' | 'photo', value: string) => void
  values?: string
}

const EditList = ({ type, onClose, onUpdateGender, values }: props) => {
  const list = type === 'gender' ? genderList : photoList
  const onItemClick = (value: string) => {
    if (values !== value) {
      onUpdateGender(type, value)
    }
  }
  return (
    <div className={styles.root}>
      {list.map((item, index) => (
        <div
          className="list-item"
          key={index}
          onClick={() => onItemClick(item.value as string)}
        >
          {item.text}
        </div>
      ))}
      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}

export default EditList
