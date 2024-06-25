import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.firstName}!</div>;
}
