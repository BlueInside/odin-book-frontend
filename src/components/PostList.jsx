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
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    setDisplayedPosts(posts);
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const deletePost = (postId) => {
    const newPosts = posts.filter((post) => post._id !== postId);
    setDisplayedPosts(newPosts);
  };

  const handleDeletePost = async (postId) => {
    setDeletePostError(null);
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (response.status === 400) throw new Error('Incorrect post id');
      if (!response.ok) throw new Error('Failed to delete post');
      const data = await response.json();
      if (data) {
        deletePost(postId);
      }
    } catch (error) {
      setDeletePostError(error.message);
    }
  };
  return (
    <ListWrapper>
      {deletePostError && <ErrorMessageBox>{deletePostError}</ErrorMessageBox>}

      {displayedPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          userId={user.id}
          deletePost={handleDeletePost}
        />
      ))}
    </ListWrapper>
  );
}
