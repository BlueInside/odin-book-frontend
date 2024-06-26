import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CreatePost from '../pages/CreatePost';
import HomeLayout from '../components/HomeLayout';
import PostList from '../components/PostList';
import PostDetail from '../pages/PostDetail';

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
        element: <CreatePost />,
      },
      {
        path: 'post/:postId',
        element: <PostDetail />,
      },
    ],
  },
]);

export default router;
