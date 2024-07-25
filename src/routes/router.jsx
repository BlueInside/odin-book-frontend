import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CreatePost from '../pages/CreatePost';
import HomeLayout from '../components/HomeLayout';
import PostList from '../components/PostList';
import PostDetailPage from '../pages/PostDetailPage';
import ProfilePage from '../pages/ProfilePage';
import UsersPage from '../pages/UsersPage';
import ErrorPage from '../components/ErrorPage';
import AuthHandler from '../components/AuthHandler';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    path: '/sign',
    element: <SignInPage />,
  },
  {
    errorElement: <ErrorPage />,
    path: '/auth-success',
    element: <AuthHandler />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
  {
    errorElement: <ErrorPage />,
    path: '/',
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <PostList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'post',
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: 'post/:postId',
        element: (
          <ProtectedRoute>
            <PostDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:userId',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
