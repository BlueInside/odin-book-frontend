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
} from '../styles/SignIn.styled';

export default function SignInPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <>
      <PageLayout>
        <Header />
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
                <StyledButton onClick={handleGitHubSignIn}>
                  Sign in with GitHub
                </StyledButton>
              )}
            </div>
          </ContentContainer>
        </PageContainer>
        <Footer />
      </PageLayout>
    </>
  );
}
