import { authFetch } from './authFetch';

export const followUser = async (userId) => {
  try {
    const response = await authFetch(`http://localhost:3000/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ followedId: userId }),
    });

    if (!response.ok) throw new Error('Failed to follow user.');

    return response.json();
  } catch (error) {
    console.error('Error following user:', error);
    return null;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await authFetch(`http://localhost:3000/unfollow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ followedId: userId }),
    });
    if (!response.ok) throw new Error('Failed to un-follow user.');

    return response.json();
  } catch (error) {
    console.error('Error un-following user:', error);
    return null;
  }
};
