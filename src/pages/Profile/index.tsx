import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ThunkUserInfo } from '@/store/actions/user'
import Icon from '@/components/Icon'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ThunkUserInfo())
  }, [dispatch])
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={''} alt="" />
          </div>
          <div className="user-name">{'xxxxxxxx'}</div>
          <Link to="/profile/edit">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{0}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{0}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{0}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{0}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item" onClick={() => {}}>
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div className="service-item" onClick={() => {}}>
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
