import { useState, useEffect } from 'react';

export default function usePosts(apiUrl) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch posts', error);
        setError(error);
        setLoading(false);
      });
  }, [apiUrl]);

  return { posts, loading, error };
}
