import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';

import {
  CommentsContainer,
  Comment,
  CommentText,
  AuthorName,
  DeleteButton,
  ErrorMessage,
  StyledLink,
} from '../styles/Comments.styled';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { authFetch } from '../utilities/authFetch';

export default function Comments({ comments, postId, deleteComment }) {
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const handleCommentDelete = async (postId, commentId) => {
    try {
      setError(null);

      const response = await authFetch('https://odin-book-backend-production.up.railway.app/comments', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ postId: postId, commentId: commentId }),
      });
      if (!response.ok) throw new Error(`Couldn't delete comment`);
      deleteComment(commentId);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <CommentsContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {comments.map((comment) => (
        <Comment key={comment._id}>
          <CommentText>
            <StyledLink to={`/profile/${comment.author._id}`}>
              <AuthorName>{comment.author.firstName}</AuthorName>
            </StyledLink>
            {comment.content}
          </CommentText>
          {(user.id === comment.author.id || user.role === 'admin') && (
            <DeleteButton
              onClick={() => {
                handleCommentDelete(postId, comment._id);
              }}
            >
              <MdDelete title="Delete comment" />
            </DeleteButton>
          )}
        </Comment>
      ))}
    </CommentsContainer>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
