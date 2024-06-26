import NavigationBar from '../components/Navbar';
import PostList from '../components/PostList';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <div>Welcome, {user.firstName}!</div>
      <PostList />
      <NavigationBar />
    </>
  );
}
