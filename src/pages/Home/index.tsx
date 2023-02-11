import styles from './index.module.scss'
import Icon from '@/components/Icon'

const Home = () => {
  return (
    <div className={styles.root}>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
