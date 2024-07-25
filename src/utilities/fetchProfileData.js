import { authFetch } from './authFetch';

async function fetchProfileData(userId) {
  const userDetailsUrl = `http://localhost:3000/users/${userId}`;
  const userPostsUrl = `http://localhost:3000/users/${userId}/posts`;

  try {
    const [userDetailsResponse, userPostsResponse] = await Promise.all([
      authFetch(userDetailsUrl, {
        method: 'GET',
        credentials: 'include',
      }),
      authFetch(userPostsUrl, {
        method: 'GET',
        credentials: 'include',
      }),
    ]);

    if (!userDetailsResponse.ok) {
      throw new Error(
        `Failed to fetch user details: ${await userDetailsResponse.text()}`
      );
    }
    if (!userPostsResponse.ok) {
      throw new Error(
        `Failed to fetch user posts: ${await userPostsResponse.text()}`
      );
    }

    const userDetails = await userDetailsResponse.json();
    const userPosts = await userPostsResponse.json();

    return {
      userDetails: userDetails.user,
      posts: userPosts.posts,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default fetchProfileData;
