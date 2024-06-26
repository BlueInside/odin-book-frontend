import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';

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
]);

export default router;
