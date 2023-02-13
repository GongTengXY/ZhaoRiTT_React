import { ImageUploader, Input, NavBar, TextArea, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { useState } from 'react'

const Feedback = () => {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
    },
  ])
  const mockUpload = async (file: File) => {
    await setTimeout(() => {}, 3000)
    return {
      url: URL.createObjectURL(file),
    }
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => navigate(-1)}>意见反馈</NavBar>

      <div className="wrapper">
        <div className="feedback-item">
          <p className="title">简介</p>
          <div className="textarea-wrap">
            <TextArea
              className="textarea"
              placeholder="请输入"
              showCount
              maxLength={100}
            ></TextArea>
          </div>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
          />
          <p className="image-picker-desc">最多2张，单个图片不超过20M。</p>
        </div>

        <div className="feedback-item">
          <p className="title">联系方式</p>
          <Input placeholder="请输入手机号码便于联系（非必填）" />
        </div>

        {/* <div className="feedback-submit"> */}
        <Button block color="primary" size="large" className="feedback-submit">
          提交反馈
        </Button>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Feedback
