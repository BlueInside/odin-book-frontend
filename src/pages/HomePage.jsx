import NavigationBar from '../components/Navbar';
import PostList from '../components/PostList';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import {
  HeaderContainer,
  Logo,
  WelcomeMessage,
} from '../styles/HeaderStyles.styled';
export default function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <HeaderContainer>
        <Link to={'https://www.theodinproject.com/'}>
          <Logo src="/src/assets/logo.svg" alt="Odin-Book Logo" />
        </Link>
        <WelcomeMessage>Welcome, {user.firstName}!</WelcomeMessage>
      </HeaderContainer>
      <PostList />
      <NavigationBar />
    </>
  );
}
