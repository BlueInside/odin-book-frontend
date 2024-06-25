import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';

const router = createBrowserRouter([{ path: '/', element: <SignInPage /> }]);

export default router;
