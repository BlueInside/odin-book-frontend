import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);

export default router;
