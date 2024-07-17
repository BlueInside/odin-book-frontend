import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import PostList from '../components/PostList';

export default function ProfilePage() {
  const { user } = useAuth();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!userData) return <div>No user data available.</div>;

  return (
    <div>
      <ProfileInfo
        userDetails={userData}
        currentUserId={user.id}
        setUserDetails={setUserData}
      />
      <PostList apiUrl={`http://localhost:3000/users/${userId}/posts`} />
    </div>
  );
}
