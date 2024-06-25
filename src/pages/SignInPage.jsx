import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

export default function SignInPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <>
      <Header />

      <div>
        <h2>Sign in to your account</h2>

        <div>
          {user ? (
            <Button
              onClick={() => {
                navigate('/home');
              }}
            >
              Continue as {user.firstName}
            </Button>
          ) : (
            <Button onClick={handleGitHubSignIn}>Sign in with GitHub</Button>
          )}
        </div>
      </div>
    </>
  );
}
