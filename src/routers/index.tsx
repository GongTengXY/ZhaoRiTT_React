import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ErrorBlock } from 'antd-mobile'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import AuthRoute from '@/utils/AuthRoute'
import NotFound from '@/pages/NotFound'
const Question = lazy(() => import('../pages/Question'))
const Video = lazy(() => import('../pages/Video'))
const Profile = lazy(() => import('../pages/Profile'))
const ProfileEdit = lazy(() => import('../pages/Profile/Edit'))
const Article = lazy(() => import('../pages/Article'))
const Search = lazy(() => import('../pages/Search'))
const Chat = lazy(() => import('../pages/Chat'))
const Feedback = lazy(() => import('../pages/Feedback'))
const SearchResult = lazy(() => import('../pages/Search/Result'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace={true} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Navigate to={'/home/index'} />,
  },
  {
    path: '/home',
    element: <Layout />,
    children: [
      {
        path: '/home/index',
        element: <Home />,
      },
      {
        path: '/home/question',
        element: (
          <Suspense
            fallback={
              <ErrorBlock
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                style={{
                  '--image-height': '150px',
                }}
                description={<span>请稍等一下.....</span>}
              ></ErrorBlock>
            }
          >
            <AuthRoute component={<Question />} />
          </Suspense>
        ),
      },
      {
        path: '/home/profile',
        element: (
          <Suspense
            fallback={
              <ErrorBlock
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                style={{
                  '--image-height': '150px',
                }}
                description={<span>请稍等一下.....</span>}
              ></ErrorBlock>
            }
          >
            <Profile />
          </Suspense>
        ),
      },
      {
        path: '/home/video',
        element: (
          <Suspense
            fallback={
              <ErrorBlock
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                style={{
                  '--image-height': '150px',
                }}
                description={<span>请稍等一下.....</span>}
              ></ErrorBlock>
            }
          >
            <Video />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/profile/edit',
    element: (
      <Suspense
        fallback={
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '150px',
            }}
            description={<span>请稍等一下.....</span>}
          ></ErrorBlock>
        }
      >
        <AuthRoute component={<ProfileEdit />} />
      </Suspense>
    ),
  },
  {
    path: '/article/:id',
    element: (
      <Suspense
        fallback={
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '150px',
            }}
            description={<span>请稍等一下.....</span>}
          ></ErrorBlock>
        }
      >
        <Article />
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense
        fallback={
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '150px',
            }}
            description={<span>请稍等一下.....</span>}
          ></ErrorBlock>
        }
      >
        <Search />
      </Suspense>
    ),
  },
  {
    path: '/search/result/:q',
    element: (
      <Suspense
        fallback={
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '150px',
            }}
            description={<span>请稍等一下.....</span>}
          ></ErrorBlock>
        }
      >
        <SearchResult />
      </Suspense>
    ),
  },
  {
    path: '/chat',
    element: (
      <Suspense
        fallback={
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '150px',
            }}
            description={<span>请稍等一下.....</span>}
          ></ErrorBlock>
        }
      >
        <AuthRoute component={<Chat />} />
      </Suspense>
    ),
  },
  {
    path: '/feedback',
    element: (
      <Suspense
        fallback={
          <ErrorBlock
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              '--image-height': '200px',
            }}
            description={<span>请稍等一下.....</span>}
          ></ErrorBlock>
        }
      >
        <AuthRoute component={<Feedback />} />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
