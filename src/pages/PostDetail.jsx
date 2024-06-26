import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          credentials: 'include',
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (post) {
    return (
      <div>
        <div>
          <img
            src={post.author.profilePicture}
            alt={`${post.author.firstName}'s avatar`}
          />
          <p>{post.author.firstName}</p>
        </div>
        <div>
          <p>{post?.content}</p>
        </div>
        <div>
          <p>{post.likesCount}</p>
          <p>{post.comments.length}</p>
        </div>
        {post.comments.length > 0 && <Comments postId={postId} />}
      </div>
    );
  }
}
