import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import CreatePost from '../pages/CreatePost';

const router = createBrowserRouter([
  {
    path: '/sign',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: '/post', element: <CreatePost /> },
]);

export default router;
