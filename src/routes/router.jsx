import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CreatePost from '../pages/CreatePost';
import HomeLayout from '../components/HomeLayout';
import PostList from '../components/PostList';
import PostDetailPage from '../pages/PostDetailPage';
import ProfilePage from '../pages/ProfilePage';
const router = createBrowserRouter([
  {
    path: '/sign',
    element: <SignInPage />,
  },
  {
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
