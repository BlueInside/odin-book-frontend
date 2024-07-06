import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import fetchProfileData from '../utilities/fetchProfileData';
import ProfileInfo from '../components/ProfileInfo';
import DisplayUserPosts from '../components/DisplayUserPosts';

export default function ProfilePage() {
  const { user } = useAuth();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchProfileData(userId)
        .then((data) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message || 'Failed to fetch data');
          setIsLoading(false);
        });
    }
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!userData) return <div>No user data available.</div>;

  return (
    <div>
      <ProfileInfo userDetails={userData.userDetails} currentUserId={user.id} />
      <DisplayUserPosts posts={userData.posts} />
    </div>
  );
}
