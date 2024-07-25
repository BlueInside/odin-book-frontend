import usePosts from '../hooks/usePosts';
import Post from './Post';
import { ListWrapper } from '../styles/PostListStyles.styled';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { ErrorMessageBox } from '../styles/PostListStyles.styled';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ErrorPage from './ErrorPage';
import PaginationControls from './PaginationControls';
import { authFetch } from '../utilities/authFetch';

const NoPostsMessage = styled.div`
  color: #606770;
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-around;
  margin: auto;
  max-width: 800px;
`;

export default function PostList({ apiUrl = 'http://localhost:3000/posts' }) {
  const { user } = useAuth();
  const [deletePostError, setDeletePostError] = useState(null);
  const [likePostError, setLikePostError] = useState(null);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  const {
    posts,
    loading,
    error,
    currentPage,
    hasNextPage,
    totalPages,
    setCurrentPage,
  } = usePosts(apiUrl);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setDisplayedPosts(posts);
  }, [posts]);

  if (loading) return null;
  if (error) return <ErrorPage />;
  if (!posts.length)
    return <NoPostsMessage>So empty, create a post!</NoPostsMessage>;

  const handleLikeClick = async (postId, likedByUser) => {
    setLikePostError(null);
    const originalPosts = [...displayedPosts];
    const updatedPosts = displayedPosts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          likesCount: likedByUser ? post.likesCount - 1 : post.likesCount + 1,
          likedByUser: !likedByUser,
        };
      }
      return post;
    });
    setDisplayedPosts(updatedPosts);

    try {
      const response = await authFetch(`http://localhost:3000/likes`, {
        credentials: 'include',
        method: likedByUser ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: postId }),
      });

      if (!response.ok) throw new Error('Failed to update like status');
    } catch (error) {
      setLikePostError(error.message);
      setDisplayedPosts(originalPosts);
    }
  };

  const handleDeletePost = async (postId) => {
    const originalPosts = [...displayedPosts];
    const newPosts = displayedPosts.filter((post) => post._id !== postId);
    setDisplayedPosts(newPosts); // Optimistic update

    setDeletePostError(null);
    try {
      const response = await authFetch(
        `http://localhost:3000/posts/${postId}`,
        {
          credentials: 'include',
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (response.status === 400) throw new Error('Incorrect post id');
      if (!response.ok) throw new Error('Failed to delete post');
    } catch (error) {
      setDisplayedPosts(originalPosts); // Rollback
      setDeletePostError(error.message);
    }
  };
  return (
    <div>
      <ListWrapper>
        {deletePostError && (
          <ErrorMessageBox>{deletePostError}</ErrorMessageBox>
        )}
        {likePostError && <ErrorMessageBox>{likePostError}</ErrorMessageBox>}

        {displayedPosts.map((post) => (
          <Post
            key={post._id}
            post={post}
            userId={user.id}
            isAdmin={user.role === 'user' ? false : true}
            handleLikeClick={handleLikeClick}
            deletePost={handleDeletePost}
          />
        ))}
      </ListWrapper>
      <PaginationControls
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

PostList.propTypes = {
  apiUrl: PropTypes.string,
};
