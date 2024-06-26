import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${postId}/comments`,
          {
            credentials: 'include',
            method: 'GET',
          }
        );
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.comments);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (comments.length === 0) return <div>No comments yet.</div>;

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            {comment.author.firstName}: {comment.text}
          </p>
        </div>
      ))}
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
};
