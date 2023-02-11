import { Outlet } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import styles from './index.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '@/components/Icon'

const tabs = [
  { title: '首页', path: '/home/index', icon: 'iconbtn_home' },
  { title: '问答', path: '/home/question', icon: 'iconbtn_qa' },
  { title: '视频', path: '/home/video', icon: 'iconbtn_video' },
  { title: '我的', path: '/home/profile', icon: 'iconbtn_mine' },
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
          <TabBar.Item
            key={item.path}
            icon={(active) => {
              return <Icon type={active ? `${item.icon}_sel` : item.icon} />
            }}
            title={item.title}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
