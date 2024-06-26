import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CreatePost from '../pages/CreatePost';
import HomeLayout from '../components/HomeLayout';
import PostList from '../components/PostList';

const router = createBrowserRouter([
  {
    path: '/sign',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <HomeLayout />,
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
    ],
  },
]);

export default router;
