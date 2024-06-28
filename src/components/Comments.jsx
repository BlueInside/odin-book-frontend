import PropTypes from 'prop-types';

export default function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            {comment.author.firstName}: {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};
