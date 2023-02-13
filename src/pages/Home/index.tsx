import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { Tabs, Popup } from 'antd-mobile'
import { useInitialState } from '@/utils/use-initial-state'
import { ThunkChannel, changeTabs } from '@/store/actions/home'
import Channels from './components/Channels'
import { RootState } from '@/types/store'
import { useDispatch, useSelector } from 'react-redux'
import ArticleList from './components/ArticleList'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const { ChannelKey } = useSelector((state: RootState) => state.home)
  const { UserChannel } = useInitialState(ThunkChannel, 'home')
  const [channelShow, setChannelShow] = useState(false)
  const dispatch = useDispatch()
  // 点击频道弹出层
  const onChannelHide = () => {
    setChannelShow(!channelShow)
  }
  // 切换频道
  const onChangeChannel = (key: string) => {
    dispatch(changeTabs(key))
  }
  // 点击搜索
  const onSearchHide = () => {
    navigate('/search')
  }

  return (
    <div className={styles.root}>
      {UserChannel.length > 0 && (
        <Tabs
          className="tabs"
          activeLineMode="fixed"
          activeKey={ChannelKey}
          onChange={onChangeChannel}
        >
          {UserChannel.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {/* 传递频道id：channel_id */}
              <ArticleList channel_id={parseInt(item.id)} />
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={onSearchHide} />
        <Icon type="iconbtn_channel" onClick={onChannelHide} />
      </div>
      <Popup className="channel-popup" visible={channelShow} position={'left'}>
        <Channels onBack={onChannelHide}></Channels>
      </Popup>
    </div>
  )
}

export default Home
