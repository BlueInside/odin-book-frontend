import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Container,
  Form,
  Label,
  Input,
  ErrorMsg,
  SubmitButton,
} from '../styles/CreatePostStyles.styles';
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
      <Container>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="content">Content</Label>
          <Input
            type="text"
            id="content"
            name="content"
            rows={8}
            cols={25}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            Create post
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
