import PropTypes from 'prop-types';
import { FaHeart, FaComments } from 'react-icons/fa';

export default function Post({ post }) {
  return (
    <article>
      <div>
        <img
          src={post.author.profilePicture}
          alt={`${post.author.firstName}'s avatar'`}
        />
        <p>{post.author.firstName}</p>
      </div>
      <div>
        <p>{post.content}</p>
      </div>
      <div>
        <p>
          <FaHeart />
          {post.likesCount}
        </p>
        <p>
          <FaComments />
          {post.comments.length}
        </p>
      </div>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
