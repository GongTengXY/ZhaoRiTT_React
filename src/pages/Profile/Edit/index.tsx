import styles from './index.module.scss'
import {
  NavBar,
  List,
  DatePicker,
  Button,
  Popup,
  Toast,
  Dialog,
} from 'antd-mobile'
import { useState, useRef } from 'react'
import {
  ThunkOwnInfo,
  ThunkEditOwnInfo,
  ThunkQuit,
  ThunkPhoto,
} from '@/store/actions/user'
import { QuitToken } from '@/store/actions/login'
import { useNavigate } from 'react-router-dom'
import { useInitialState } from '@/utils/use-initial-state'
import EditInput from './components/EditInput'
import { useDispatch } from 'react-redux'
import EditList from './components/EditList'
import dayjs from 'dayjs'

export type InputPopup = {
  type: '' | 'name' | 'intro'
  value: string
  visible: boolean
}

type ListPopup = {
  type: '' | 'gender' | 'photo'
  visible: boolean
}

const ProfileEdit = () => {
  const [showBirth, setShowBirth] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileRef = useRef<HTMLInputElement>(null)
  // 获取数据
  const { OwnInfo } = useInitialState(ThunkOwnInfo, 'user')
  const { name, photo, gender, birthday, intro } = OwnInfo

  // 统一更新数据
  const onUpdateInfo = async (
    type: InputPopup['type'] | ListPopup['type'] | 'birthday',
    value: string
  ) => {
    if (type === 'photo') {
      return fileRef.current?.click()
    } else if (type === 'name' || type === 'intro') {
      await dispatch(ThunkEditOwnInfo({ [type]: value }))
      onInputHide()
    } else if (type === 'gender') {
      await dispatch(ThunkEditOwnInfo({ [type]: value }))
      onListHide()
    } else {
      await dispatch(ThunkEditOwnInfo({ [type]: value }))
      onBirthdayHide()
    }
    Toast.show({
      content: '更新成功',
      duration: 1000,
    })
  }

  // 修改昵称
  const [inputVisible, setInputVisible] = useState<InputPopup>({
    // type 属性：用于告诉 EditInput 组件，当前修改的是昵称还是简介
    type: '', // 'name' or 'intro'
    value: '',
    // 展示或隐藏状态
    visible: false,
  })
  const onInputShow = (
    type: InputPopup['type'],
    value: InputPopup['value']
  ) => {
    setInputVisible({
      type,
      value,
      visible: true,
    })
  }
  const onInputHide = () => {
    setInputVisible({
      type: '',
      value: '',
      visible: false,
    })
  }

  // 退出登录
  const QuitLogin = () => {
    Dialog.confirm({
      title: '确定要退出登录吗？',
      onConfirm: async () => {
        try {
          await dispatch(ThunkQuit())
          await dispatch(QuitToken())
          navigate('/home')
          Toast.show({
            icon: 'success',
            content: '退出成功',
            position: 'center',
          })
        } catch (error) {
          Toast.show({
            icon: 'fail',
            content: '退出失败，请重试',
            position: 'center',
          })
        }
      },
    })
  }

  // 修改性别
  const [listPopup, setListPopup] = useState<ListPopup>({
    type: '',
    visible: false,
  })
  const onListShow = (type: ListPopup['type']) => {
    setListPopup({ type, visible: true })
  }
  const onListHide = () => {
    setListPopup({
      type: '',
      visible: false,
    })
  }

  // 照片上传
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('photo', file)
    await dispatch(ThunkPhoto(fd))
    onListHide()
    Toast.show({
      content: '更新成功',
      duration: 1000,
    })
  }

  // 修改生日
  const onBirthdayShow = () => {
    setShowBirth(true)
  }
  const onBirthdayHide = () => {
    setShowBirth(false)
  }
  const onUpdateBirthday = (value: Date) => {
    const newBirthday = dayjs(value).format('YYYY-MM-DD')

    onUpdateInfo('birthday', newBirthday)
  }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar onBack={() => navigate(-1)}>个人信息</NavBar>

        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <List.Item
              arrow={true}
              extra={
                <span className="avatar-wrapper">
                  <img
                    src={
                      photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                    }
                    alt=""
                  />
                </span>
              }
              onClick={() => onListShow('photo')}
            >
              头像
            </List.Item>

            <List.Item
              arrow={true}
              extra={`${name}`}
              onClick={() => onInputShow('name', name)}
            >
              昵称
            </List.Item>

            <List.Item
              arrow={true}
              extra={<span className="intro">{'未填写'}</span>}
              onClick={() => onInputShow('intro', intro as string)}
            >
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item
              arrow={true}
              extra={`${gender === '0' ? '男' : '女'}`}
              onClick={() => onListShow('gender')}
            >
              性别
            </List.Item>
            <List.Item
              arrow={true}
              extra={birthday}
              onClick={() => onBirthdayShow()}
            >
              生日
            </List.Item>
            <DatePicker
              visible={showBirth}
              title="选择年月日"
              value={new Date(birthday)}
              min={new Date(1900, 1, 1, 0, 0, 0)}
              max={new Date()}
              onCancel={onBirthdayHide}
              onConfirm={onUpdateBirthday}
            />
          </List>
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <Button className="btn" fill="none" size="large" onClick={QuitLogin}>
            退出登录
          </Button>
        </div>

        {/* 修改昵称 */}
        <Popup visible={inputVisible.visible} position="right">
          <EditInput
            type={inputVisible.type}
            onClose={onInputHide}
            value={inputVisible.value}
            onUpdateName={onUpdateInfo}
          />
        </Popup>

        {/* 修改性别 */}
        <Popup
          visible={listPopup.visible}
          position="bottom"
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <EditList
            type={listPopup.type}
            values={gender}
            onClose={onListHide}
            onUpdateGender={onUpdateInfo}
          />
        </Popup>

        {/* 上传照片 */}
        <input
          ref={fileRef}
          type="file"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>
    </div>
  )
}

export default ProfileEdit
