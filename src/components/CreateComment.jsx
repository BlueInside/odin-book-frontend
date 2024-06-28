import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

export default function CreateComment({ postId, addComment }) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (content.trim() === '') {
        throw new Error('Post content cannot be empty!');
      }

      const response = await fetch('http://localhost:3000/comments', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ content, postId: postId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const data = await response.json();
      const newComment = { ...data.comment };
      newComment.author = user;
      setContent('');
      setError(null);
      addComment(newComment);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div>
        <form method="POST" onSubmit={handleCreateComment}>
          <label htmlFor="content">Text:</label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <input type="hidden" name="postId" value={postId} />
          <button disabled={isSubmitting}>Add comment</button>
        </form>
      </div>
    </>
  );
}

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};
