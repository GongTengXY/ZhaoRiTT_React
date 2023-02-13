import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Profile from '@/pages/Profile'
import Video from '@/pages/Video'
import ProfileEdit from '@/pages/Profile/Edit'
import AuthRoute from '@/utils/AuthRoute'
import Article from '@/pages/Article'
import Search from '@/pages/Search'
import SearchResult from '@/pages/Search/Result'

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
        element: <AuthRoute component={<Question />} />,
      },
      {
        path: '/home/profile',
        element: <Profile />,
      },
      {
        path: '/home/video',
        element: <Video />,
      },
    ],
  },
  {
    path: '/profile/edit',
    element: <ProfileEdit />,
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/search/result/:q',
    element: <SearchResult />,
  },
])

export default router
