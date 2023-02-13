import Icon from '@/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { RootState } from '@/types/store'
import { useInitialState } from '@/utils/use-initial-state'
import {
  ThunkAllChannel,
  changeTabs,
  ThunkDelChannel,
  ThunkAddChannel,
} from '@/store/actions/home'
import { useState } from 'react'
import { Channel } from '@/types/data'
import classNames from 'classnames'
type props = {
  onBack: () => void
}

const Channels = ({ onBack }: props) => {
  const dispatch = useDispatch()
  const { UserChannel, ChannelKey } = useSelector(
    (state: RootState) => state.home
  )
  const { AllChannel } = useInitialState(ThunkAllChannel, 'home')
  const [isEdit, setIsEdit] = useState(false)
  const recommendChannel = AllChannel.filter((item) => {
    if (UserChannel.findIndex((v) => v.id === item.id) < 0) {
      return true
    } else {
      return false
    }
  })
  const onChangeClick = (channel: Channel) => {
    if (!isEdit) {
      dispatch(changeTabs(channel.id))
      onBack()
      return
    }
    if (channel.id === '0') return
    if (UserChannel.length <= 4) return
    dispatch(ThunkDelChannel(channel.id))
  }
  const onAddClick = (channel: Channel) => {
    dispatch(ThunkAddChannel(channel))
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onBack} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">{`点击${
              isEdit ? '删除' : '进入'
            }频道`}</span>
            <span
              className="channel-item-edit"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {UserChannel.map((item) => (
              <span
                className={classNames(
                  'channel-list-item',
                  ChannelKey === item.id + '' && 'selected'
                )}
                key={item.id}
                onClick={() => onChangeClick(item)}
              >
                {item.name}
                <Icon type="iconbtn_tag_close" />
              </span>
            ))}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannel.map((item) => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => onAddClick(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
