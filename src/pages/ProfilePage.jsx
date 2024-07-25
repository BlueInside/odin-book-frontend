import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import LoadingSpinner from '../components/Spinner';
import ErrorPage from '../components/ErrorPage';
import { authFetch } from '../utilities/authFetch';

export default function ProfilePage() {
  const { user } = useAuth();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    authFetch(`http://localhost:3000/users/${userId}`, {
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  if (!userData) return <div>No user data available</div>;

  return (
    <div>
      <ProfileInfo
        userDetails={userData}
        currentUserId={user.id}
        setUserDetails={setUserData}
      />
    </div>
  );
}
