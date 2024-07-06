import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function DisplayUserPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return <div>No posts to display.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          {/* Add media later! */}
          {/* {post.media && post.media.length > 0 && (
            <div>
              {post.media.map((mediaItem, index) => (
                <img
                  key={index}
                  src={mediaItem.url}
                  alt={`Post media ${index}`}
                />
              ))}
            </div>
          )} */}
          <div>Posted on {format(new Date(post.createdAt), 'PPPp')}</div>
          <div>Likes: {post.likesCount}</div>
          <div>Comments: {post.comments.length}</div>
        </div>
      ))}
    </div>
  );
}

DisplayUserPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      media: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
      likesCount: PropTypes.number,
      comments: PropTypes.array,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};
