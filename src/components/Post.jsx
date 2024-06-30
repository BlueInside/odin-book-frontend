import PropTypes from 'prop-types';
import { FaHeart, FaComments } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DeleteButton } from '../styles/PostListStyles.styled';

import {
  PostContainer,
  PostHeader,
  ProfilePic,
  InteractionBar,
  IconText,
  PostContent,
  StyledLink,
} from '../styles/PostStyles.styled';
export default function Post({ post, userId, deletePost }) {
  const isPostAuthor = userId === post.author._id;

  return (
    <PostContainer>
      <PostHeader>
        <ProfilePic
          src={post.author.profilePicture}
          alt={`${post.author.firstName}'s avatar`}
        />
        <p>{post.author.firstName}</p>
        {isPostAuthor && (
          <DeleteButton onClick={() => deletePost(post._id)}>
            <MdDelete title="Delete post" />
          </DeleteButton>
        )}
      </PostHeader>
      <StyledLink to={`/post/${post._id}`}>
        <PostContent>
          <p>{post.content}</p>
        </PostContent>
      </StyledLink>

      <InteractionBar>
        <IconText $icon="heart">
          <FaHeart size={20} /> {post.likesCount}
        </IconText>
        <IconText>
          <FaComments size={20} /> {post.comments.length}
        </IconText>
      </InteractionBar>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  userId: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
};
