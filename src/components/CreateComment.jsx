import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import {
  FormContainer,
  StyledForm,
  StyledLabel,
  StyledTextArea,
  SubmitButton,
  ErrorMessage,
  CharacterCounter,
} from '../styles/CreateComment.styled';

export default function CreateComment({ postId, addComment }) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const maxChars = 500;
  const charactersRemaining = maxChars - content.length;

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (content.trim() === '') {
        throw new Error('Post content cannot be empty!');
      }

      if (content.length > maxChars) {
        setError('Comment exceeds maximum length of 500 characters');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        'https://odin-book-backend-production.up.railway.app/comments',
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ content, postId: postId }),
        }
      );
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
    <FormContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StyledForm onSubmit={handleCreateComment}>
        <StyledLabel htmlFor="content">Text:</StyledLabel>
        <StyledTextArea
          id="content"
          name="content"
          value={content}
          placeholder="Write a comment..."
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxChars}
        />
        <CharacterCounter $charactersRemaining={charactersRemaining}>
          {charactersRemaining} characters left
        </CharacterCounter>
        <SubmitButton disabled={isSubmitting}>Add comment</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
}

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};
