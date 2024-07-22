import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/Spinner';
import {
  Container,
  Form,
  Label,
  Input,
  ErrorMsg,
  SubmitButton,
} from '../styles/CreatePostStyles.styled';
import { useNavigate } from 'react-router-dom';
export default function CreatePost() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [postFile, setPostFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.name === 'postImage') {
      setPostFile(e.target.files[0]);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('content', content);
    if (postFile) {
      formData.append('postImage', postFile);
    }

    try {
      if (content.trim() === '') {
        throw new Error('Post content cannot be empty!');
      }

      const response = await fetch(
        'https://odin-book-backend-production.up.railway.app/posts',
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        }
      );

      if (!response.ok) {
        if (response.status >= 400) {
          const responseError = await response.json();
          const errorMessage =
            responseError.error ||
            responseError?.errors[0]?.msg ||
            'Undefined error occurred. Please try again later.';
          throw new Error(errorMessage);
        }
      }
      setContent('');
      setPostFile(null);
      setError('');
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user && !isLoading) {
    return (
      <>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Container>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <input
              onChange={handleFileChange}
              type="file"
              name="postImage"
              accept="image/*"
            />
            <SubmitButton type="submit" disabled={isSubmitting}>
              Create post
            </SubmitButton>
          </Form>
        </Container>
      </>
    );
  }
}
