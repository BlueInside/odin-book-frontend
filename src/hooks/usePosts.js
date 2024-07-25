import { useState, useEffect } from 'react';
import { authFetch } from '../utilities/authFetch';
import { useNavigate } from 'react-router-dom';

export default function usePosts(apiUrl) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    authFetch(`${apiUrl}?page=${currentPage}`, {
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
        if (error.message === `AUTH_REQUIRED`) {
          navigate('/error', {
            state: {
              errorCode: 401,
              message: `Authentication required`,
              suggestion:
                'Please try to log in or create new user to continue.',
            },
          });
        }
        console.error('Failed to fetch posts', error);
        setError(error);
        setLoading(false);
      });
  }, [apiUrl, currentPage, navigate]);

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
