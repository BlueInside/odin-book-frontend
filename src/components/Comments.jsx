import PropTypes from 'prop-types';
import {
  CommentsContainer,
  Comment,
  CommentText,
  AuthorName,
} from '../styles/Comments.styled';
export default function Comments({ comments }) {
  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <Comment key={comment._id}>
          <CommentText>
            <AuthorName>{comment.author.firstName}</AuthorName>
            {comment.content}
          </CommentText>
        </Comment>
      ))}
    </CommentsContainer>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};
