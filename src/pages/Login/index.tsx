import styles from './index.module.scss'
import { Button, Form, Input, InputRef, NavBar, Toast } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { LoginForm } from '@/types/data'
import { useDispatch } from 'react-redux'
import { getCode, userToken } from '@/store/actions/login'
import { useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'

const Login = () => {
  const timeRef = useRef(-1)
  const mobileRef = useRef<InputRef>(null)
  const [form] = Form.useForm()
  const [outTime, setoutTime] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async () => {
    try {
      const values = (await form.validateFields()) as LoginForm
      await dispatch(userToken(values))
      Toast.show({
        content: '登录成功',
        duration: 1000,
        afterClose: () => {
          navigate('/home')
        },
      })
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      Toast.show({
        content: error.response?.data?.message,
        duration: 1000,
      })
    }
  }
  const onGetCode = async () => {
    const mobile = (form.getFieldValue('mobile').trim() ?? '') as string
    const hasError = form.getFieldError('mobile').length > 0
    if (mobile === '' || hasError) {
      return mobileRef.current?.focus()
    }

    dispatch(getCode(mobile))

    setoutTime(10)
    timeRef.current = window.setInterval(() => {
      setoutTime((outTime) => outTime - 1)
    }, 1000)
  }

  useEffect(() => {
    if (outTime === 0) {
      clearTimeout(timeRef.current)
    }
  }, [outTime])

  return (
    <div className={styles.root}>
      <NavBar></NavBar>
      <div className="login-form">
        <p className="title">短信登录</p>
        <Form
          className={styles['adm-form']}
          validateTrigger={['onBlur']}
          onFinish={onFinish}
          form={form}
          initialValues={{ mobile: '13900001111', code: '246810' }}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            className="login-item"
            name="code"
            extra={
              <span
                className="code-extra"
                onClick={outTime === 0 ? onGetCode : undefined}
              >
                {outTime === 0 ? '发送验证码' : `${outTime}s后重新获取`}
              </span>
            }
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入验证码' },
              {
                min: 6,
                max: 6,
                pattern: /^[0-9]{6}$/,
                message: '请输入正确的验证码',
              },
            ]}
          >
            <Input placeholder="请输入验证码" autoComplete="off"></Input>
          </Form.Item>
          <Form.Item noStyle>
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              className="login-submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
