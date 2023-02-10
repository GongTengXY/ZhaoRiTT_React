import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Profile from '@/pages/Profile'
import Video from '@/pages/Video'

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
        element: <Question />,
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
])

export default router
