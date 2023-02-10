import { Outlet } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import {
  AppstoreOutline,
  VideoOutline,
  FileOutline,
  UserOutline,
} from 'antd-mobile-icons'
import styles from './index.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

// 导入页面组件，配置路由
// import Home from '../Home'
// import Question from '../Question'
// import Video from '../Video'
// import Profile from '../Profile'

const tabs = [
  {
    path: '/home/index',
    icon: <AppstoreOutline />,
    text: '首页',
  },
  {
    path: '/home/question',
    icon: <FileOutline />,
    text: '问答',
  },
  {
    path: '/home/video',
    icon: <VideoOutline />,
    text: '视频',
  },
  {
    path: '/home/profile',
    icon: <UserOutline />,
    text: '我的',
  },
]

const Layout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const setRouteActive = (value: string) => {
    navigate(value)
  }

  return (
    <div className={styles.root}>
      <Outlet></Outlet>
      <TabBar
        className="tab-bar"
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.path} icon={item.icon} title={item.text} />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
