import { Outlet } from 'react-router-dom';
import LoadingSpinner from './Spinner';
import {
  HeaderContainer,
  Logo,
  WelcomeMessage,
  LogoutButton,
} from '../styles/HeaderStyles.styled';
import NavigationBar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';

export default function HomeLayout() {
  const { user, isLoading, logout } = useAuth();

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
        <LogoutButton onClick={() => logout()}>
          <FiLogOut size={20} />
        </LogoutButton>
      </HeaderContainer>

      <main style={{ minHeight: '90vh' }}>
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  );
}
