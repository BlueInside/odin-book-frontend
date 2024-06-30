import usePosts from '../hooks/usePosts';
import Post from './Post';
import { ListWrapper } from '../styles/PostListStyles.styled';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { ErrorMessageBox } from '../styles/PostListStyles.styled';

export default function PostList() {
  const { posts, loading, error } = usePosts();
  const { user } = useAuth();
  const [deletePostError, setDeletePostError] = useState(null);
  const [likePostError, setLikePostError] = useState(null);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  useEffect(() => {
    setDisplayedPosts(posts);
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

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
      const response = await fetch(`http://localhost:3000/likes`, {
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
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

      console.log('Like/Unlike: ', response);
      if (response.status === 400) throw new Error('Incorrect post id');
      if (!response.ok) throw new Error('Failed to delete post');
      const data = await response.json();
      console.log('Like/Unlike: ', data);
    } catch (error) {
      setDisplayedPosts(originalPosts); // Rollback
      setDeletePostError(error.message);
    }
  };
  return (
    <ListWrapper>
      {deletePostError && <ErrorMessageBox>{deletePostError}</ErrorMessageBox>}
      {likePostError && <ErrorMessageBox>{likePostError}</ErrorMessageBox>}

      {displayedPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          userId={user.id}
          handleLikeClick={handleLikeClick}
          deletePost={handleDeletePost}
        />
      ))}
    </ListWrapper>
  );
}
