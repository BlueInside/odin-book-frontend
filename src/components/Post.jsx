import PropTypes from 'prop-types';
import { FaHeart, FaComments } from 'react-icons/fa';

import {
  PostContainer,
  PostHeader,
  ProfilePic,
  InteractionBar,
  IconText,
  PostContent,
  StyledLink,
} from '../styles/PostStyles.styled';
export default function Post({ post }) {
  return (
    <PostContainer>
      <PostHeader>
        <ProfilePic
          src={post.author.profilePicture}
          alt={`${post.author.firstName}'s avatar`}
        />
        <p>{post.author.firstName}</p>
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
};
