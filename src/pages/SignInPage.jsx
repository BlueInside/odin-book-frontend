import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/Footer';
import {
  PageContainer,
  ContentContainer,
  Title,
  StyledButton,
  Logo,
  PageLayout,
  ErrorMessage,
  OrDivider,
} from '../styles/SignIn.styled';
import { useState } from 'react';

export default function SignInPage() {
  const { user, setUser } = useAuth();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    setError(null);
    window.location.href =
      'http://localhost:3000/auth/github';
  };

  const handleGuestSignIn = async () => {
    try {
      setError(null);
      const response = await fetch(
        'http://localhost:3000/auth/guest',
        {
          method: 'GET',
          credentials: 'include', // Ensure cookies are included
        }
      );
      if (response.ok) {
        const result = await response.json();
        setUser(result.user);
        navigate('/');
      } else {
        throw new Error('Failed to sign in as guest');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error signing in as guest:', error);
    }
  };

  return (
    <>
      <PageLayout>
        <Header />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <PageContainer>
          <ContentContainer>
            <Logo
              src="https://avatars.githubusercontent.com/u/4441966?s=200&v=4"
              alt="Logo"
            />
            <Title>Sign in to your account</Title>
            <div>
              {user ? (
                <StyledButton onClick={() => navigate('/')}>
                  Continue as {user.firstName}
                </StyledButton>
              ) : (
                <>
                  <StyledButton onClick={handleGitHubSignIn}>
                    Sign in with GitHub
                  </StyledButton>
                </>
              )}
              <OrDivider>or</OrDivider>
              <StyledButton onClick={handleGuestSignIn}>
                Generate random user!
              </StyledButton>
            </div>
          </ContentContainer>
        </PageContainer>
        <Footer />
      </PageLayout>
    </>
  );
}
