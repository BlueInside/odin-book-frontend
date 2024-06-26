import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function CreatePost() {
  const { user, isLoading } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (content.trim() === '') {
        throw new Error('Post content cannot be empty!');
      }

      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });
      console.log('Content:', JSON.stringify({ content }));
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const data = await response.json();
      console.log('Successful request', data.post);
      setContent('');
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user && !isLoading) {
    return (
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div>
            <button type="submit" disabled={isSubmitting}>
              Create post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
