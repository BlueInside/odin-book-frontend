import { Outlet } from 'react-router-dom';
import LoadingSpinner from './Spinner';
import {
  HeaderContainer,
  Logo,
  WelcomeMessage,
} from '../styles/HeaderStyles.styled';
import NavigationBar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function HomeLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <HeaderContainer>
        <Link to={'http://localhost:5173/'}>
          <Logo src="/src/assets/logo.svg" alt="Odin-Book Logo" />
        </Link>
        <WelcomeMessage>Welcome, {user.firstName}!</WelcomeMessage>
      </HeaderContainer>

      <main style={{ minHeight: '90vh' }}>
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  );
}
