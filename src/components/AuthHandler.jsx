import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from './Spinner';

export default function AuthHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = searchParams.get('token');

    console.log(token);
    if (token) {
      localStorage.setItem('jwtToken', token);
      navigate('/');
    } else {
      navigate('/sign', {
        replace: true,
        state: { error: `Authentication failed. No token provided.` },
      });
    }
  }, [searchParams, navigate]);

  return <LoadingSpinner />;
}
