import { useState, useEffect } from 'react';

export default function usePosts(apiUrl) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}?page=${currentPage}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts || []);
        setTotalPages(data.totalPages);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch posts', error);
        setError(error);
        setLoading(false);
      });
  }, [apiUrl, currentPage]);

  return {
    posts,
    loading,
    error,
    currentPage,
    hasNextPage,
    totalPages,
    setCurrentPage,
  };
}
