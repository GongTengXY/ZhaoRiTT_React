import Icon from '@/components/Icon'
import { Input, NavBar } from 'antd-mobile'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { io, Socket } from 'socket.io-client'
import { getToken } from '@/utils/token'
import classNames from 'classnames'

type ChatRecord = {
  message: string
  type: 'user' | 'xz'
}

const Chat = () => {
  // 用于缓存 socket.io 客户端实例
  const [chatList, setChatList] = useState<ChatRecord[]>([])
  const clientRef = useRef<Socket>()
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 建立通讯连接
    // 创建客户端实例
    const client = io('http://toutiao.itheima.net', {
      transports: ['websocket'],
      // 在查询字符串参数中传递 token
      query: {
        token: getToken(),
      },
    })
    // 监听connect 事件
    client.on('connect', () => {
      clientRef.current = client // 在链接成功的时候复制给ref的current属性
      // console.log('连接成功')
      setChatList([
        { type: 'xz', message: '欢迎来到朝日头条' },
        { type: 'xz', message: '有什么问题吗？' },
      ])
    })
    // 收到消息
    client.on('message', (data) => {
      // 这里是不能直接重新赋值，重新赋值会导致闭包拿到的chatList一直为初始值
      setChatList((list) => [...list, { type: 'xz', message: data.msg }])
    })
    return () => {
      client.close()
    }
  }, [])
  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 当回车按下且内容不为空
    if (e.code === 'Enter' && value.trim()) {
      clientRef.current?.emit('message', {
        msg: value.trim(),
        timestamp: Date.now().toString(),
      })
      // 把自己说的话加进到chatList
      setChatList([...chatList, { type: 'user', message: value }])
      //清空输入框
      setValue('')
    }
  }
  const onsend = () => {
    if (value.trim()) {
      clientRef.current?.emit('message', {
        msg: value,
        timestamp: Date.now().toString(),
      })
      setChatList([...chatList, { type: 'user', message: value }])
      setValue('')
    }
  }
  useLayoutEffect(() => {
    // 监听数组变化 当数组变化后页面渲染完毕了
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current?.scrollHeight
    }
  }, [chatList])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => navigate(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {/* 机器人和用户的消息 */}
        {chatList.map((item, index) => (
          <div
            key={index}
            className={classNames(
              'chat-item',
              item.type === 'xz' ? 'xz' : 'user'
            )}
          >
            {item.type === 'xz' ? (
              <Icon type="iconbtn_xiaozhitongxue" />
            ) : (
              <img
                src={'http://toutiao.itheima.net/images/user_head.jpg'}
                alt=""
              />
            )}
            <div className="message">{item.message}</div>
          </div>
        ))}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={value}
          onChange={(val) => setValue(val)}
          onKeyDown={sendMessage}
        />
        <Icon type="iconbianji" />
        <div className="send" onClick={onsend}>
          发送
        </div>
      </div>
    </div>
  )
}

export default Chat
